import { join } from 'path';
import { Arn, ArnFormat, Duration, Stack } from 'aws-cdk-lib';
import { CronOptions, Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface IWebhookOptions {
  /** Reports when the database is going up. */
  start?: string;
  /** Reports when the database instances go up. Will make the lambda long-running. */
  startStatus?: string;
  /** Reports when the database is going down. */
  terminate?: string;
}

export interface IRdsDatabaseSchedulerProps {
  /** Identifier from AWS that represents the cluster to be controlled. */
  clusterIdentifier: string;
  /** CronOptions that represent when the database will be brought up. */
  enableCron?: CronOptions;
  /** CronOptions that represent when the database will be terminated. */
  terminateCron?: CronOptions;
  /** A collection of webhooks that report status on database actions. */
  webhooks?: IWebhookOptions;
}

const isStack = (c: Construct): c is Stack => {
  return 'region' in c;
};

/**
 * Provides an easy way to schedule the time of which your RDS clusters go up and down.
 * This is comprised of two rules and two functions.
 *
 *  `enableDatabaseRule` -> `enableDatabaseFunction`
 *
 *  `terminateDatabaseRule` -> `terminateDatabaseFunction`
 *
 * Both of these rules take a CronOptions object which describes when they will fire. Otherwise you can trigger these
 * functions manually.
 *
 * The functions within trigger webhooks about various events:
 *  `WEBHOOK_START` -> when a cluster is started.
 * ```
 *  {
 *    message,
 *    cluster
 *  }
 * ```
 *  `WEBHOOK_START_STATUS` -> when an instance within a cluster becomes available. **This will make the lambda long-running**
 * ```
 *  {
 *   message,
 *   cluster,
 *   instance
 *  }
 * ```
 *  `WEBHOOK_TERMINATE` -> when a cluster is terminated.
 * ```
 *  {
 *    message,
 *    cluster
 *  }
 * ```
 */
export class RdsDatabaseScheduler extends Construct {
  enableDatabaseRule?: Rule;
  enableDatabaseFunction: NodejsFunction;
  terminateDatabaseRule?: Rule;
  terminateDatabaseFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: IRdsDatabaseSchedulerProps) {
    super(scope, id);

    const environment = {
      CLUSTER_IDENTIFIER: props.clusterIdentifier,
      WEBHOOK_START: props.webhooks?.start || '',
      WEBHOOK_START_STATUS: props.webhooks?.startStatus || '',
      WEBHOOK_TERMINATE: props.webhooks?.terminate || '',
    };

    const databaseArn = Arn.format({
      service: 'rds',
      resource: 'cluster',
      resourceName: props.clusterIdentifier,
      arnFormat: ArnFormat.COLON_RESOURCE_NAME,
    }, isStack(scope) ? scope : undefined);

    this.enableDatabaseFunction = new NodejsFunction(this, `${id}-enable-database-function`, {
      entry: join(__dirname, 'lambdas/enable-database/index.js'),
      runtime: Runtime.NODEJS_14_X,
      environment,
      timeout: Duration.minutes(15),
      initialPolicy: [
        new PolicyStatement({
          actions: [
            'rds:StartDBCluster',
          ],
          resources: [
            databaseArn,
          ],
          effect: Effect.ALLOW,
        }),
        new PolicyStatement({
          actions: [
            'rds:DescribeDBInstances',
            'rds:DescribeDBClusters',
          ],
          resources: [
            '*',
          ],
          effect: Effect.ALLOW,
        }),
      ],
    });

    this.terminateDatabaseFunction = new NodejsFunction(this, `${id}-terminate-database-function`, {
      entry: join(__dirname, 'lambdas/terminate-database/index.js'),
      runtime: Runtime.NODEJS_14_X,
      environment,
      timeout: Duration.minutes(15),
      initialPolicy: [
        new PolicyStatement({
          actions: [
            'rds:StopDBCluster',
          ],
          resources: [
            databaseArn,
          ],
          effect: Effect.ALLOW,
        }),
        new PolicyStatement({
          actions: [
            'rds:DescribeDBInstances',
            'rds:DescribeDBClusters',
          ],
          resources: [
            '*',
          ],
          effect: Effect.ALLOW,
        }),
      ],
    });

    if (props.enableCron) {
      this.enableDatabaseRule = new Rule(this, `${id}-enable-database-rule`, {
        schedule: Schedule.cron(props.enableCron),
      });

      this.enableDatabaseRule.addTarget(new LambdaFunction(this.enableDatabaseFunction));
    }

    if (props.terminateCron) {
      this.terminateDatabaseRule = new Rule(this, `${id}-terminate-database-rule`, {
        schedule: Schedule.cron(props.terminateCron),
      });

      this.terminateDatabaseRule.addTarget(new LambdaFunction(this.terminateDatabaseFunction));
    }
  }
}