import { join } from 'path';
import { Arn, ArnFormat, Duration, Stack } from 'aws-cdk-lib';
import { CronOptions, Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { CfnEventSubscription } from 'aws-cdk-lib/aws-rds';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';

export enum RDSCronType {
  ENABLE = 'enable',
  TERMINATE = 'terminate',
}

export interface IRdsCronSchedule {
  /** Action name, used to unsure unique IDs for each rule. */
  id: string;
  /** Whether to enable or terminate the database. */
  type: RDSCronType;
  /** The schedule to carry out the this task. */
  schedule: CronOptions;
}

export interface IRdsDatabaseSchedulerProps {
  /** Identifier from AWS that represents the cluster to be controlled. */
  clusterIdentifier: string;
  /** A list of schedules as to when to enable/terminate crons. */
  cronSchedules: IRdsCronSchedule[];
  /** A collection of webhooks that report status on database actions. */
  webhook?: string;
}

const isStack = (c: Construct): c is Stack => {
  return 'region' in c;
};

/**
 * Provides an easy way to schedule the time of which your RDS clusters go up and down.
 * The primary functionality is offered by two lambdas and two cron-based event rules.
 *
 *  `enableDatabaseRule` -> `enableDatabaseFunction`
 *
 *  `terminateDatabaseRule` -> `terminateDatabaseFunction`
 *
 * Both of these rules take a CronOptions object which describes when they will fire. Otherwise you can trigger these
 * functions manually.
 *
 * `eventTopic` -> `eventSubscription` -> `eventFunction`
 *
 * When providing a webhook property it will also add a RDS-Event Subscription which will
 * trigger webhook messages about the cluster being requested to start, instances going up and when the
 * cluster is requested to go down.
 */
export class RdsDatabaseScheduler extends Construct {
  enableDatabaseFunction: NodejsFunction;
  terminateDatabaseFunction: NodejsFunction;
  eventTopic?: Topic;
  eventSubscription?: CfnEventSubscription;
  eventFunction?: NodejsFunction;

  constructor(scope: Construct, id: string, props: IRdsDatabaseSchedulerProps) {
    super(scope, id);

    const environment = {
      CLUSTER_IDENTIFIER: props.clusterIdentifier,
      WEBHOOK: props.webhook || '',
    };

    const databaseArn = Arn.format(
      {
        service: 'rds',
        resource: 'cluster',
        resourceName: props.clusterIdentifier,
        arnFormat: ArnFormat.COLON_RESOURCE_NAME,
      },
      isStack(scope) ? scope : Stack.of(scope)
    );

    this.enableDatabaseFunction = new NodejsFunction(
      this,
      `${id}-enable-database-function`,
      {
        entry: join(__dirname, 'lambdas/enable-database/index.js'),
        runtime: Runtime.NODEJS_14_X,
        environment,
        initialPolicy: [
          new PolicyStatement({
            actions: ['rds:StartDBCluster'],
            resources: [databaseArn],
            effect: Effect.ALLOW,
          }),
        ],
      }
    );

    this.terminateDatabaseFunction = new NodejsFunction(
      this,
      `${id}-terminate-database-function`,
      {
        entry: join(__dirname, 'lambdas/terminate-database/index.js'),
        runtime: Runtime.NODEJS_14_X,
        environment,
        initialPolicy: [
          new PolicyStatement({
            actions: ['rds:StopDBCluster'],
            resources: [databaseArn],
            effect: Effect.ALLOW,
          }),
        ],
      }
    );

    if (props.webhook) {
      this.eventTopic = new Topic(this, `${id}-rds-event-topic`, {
        displayName: `${id} RDS Event Topic`,
      });

      this.eventFunction = new NodejsFunction(this, `${id}-event-function`, {
        entry: join(__dirname, 'lambdas/event/index.js'),
        runtime: Runtime.NODEJS_14_X,
        environment,
        timeout: Duration.minutes(15),
        initialPolicy: [
          new PolicyStatement({
            actions: ['rds:DescribeDBInstances', 'rds:DescribeDBClusters'],
            resources: ['*'],
            effect: Effect.ALLOW,
          }),
        ],
        events: [new SnsEventSource(this.eventTopic)],
      });

      this.eventSubscription = new CfnEventSubscription(
        this,
        `${id}-rds-event-subscription`,
        {
          enabled: true,
          snsTopicArn: this.eventTopic.topicArn,
          sourceType: 'db-instance',
          eventCategories: ['notification'],
        }
      );
    }

    props.cronSchedules.map((cronSchedule) => {
      const cronRule = new Rule(
        this,
        `${cronSchedule.id}-${cronSchedule.type}-database-rule`,
        {
          schedule: Schedule.cron(cronSchedule.schedule),
        }
      );

      cronRule.addTarget(
        new LambdaFunction(
          cronSchedule.type === RDSCronType.ENABLE
            ? this.enableDatabaseFunction
            : this.terminateDatabaseFunction
        )
      );
    });
  }
}
