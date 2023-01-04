# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RdsDatabaseScheduler <a name="RdsDatabaseScheduler" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler"></a>

Provides an easy way to schedule the time of which your RDS clusters go up and down.

The primary functionality is offered by two lambdas and two cron-based event rules.

  `enableDatabaseRule` -> `enableDatabaseFunction`

  `terminateDatabaseRule` -> `terminateDatabaseFunction`

Both of these rules take a CronOptions object which describes when they will fire. Otherwise you can trigger these
functions manually.

`eventTopic` -> `eventSubscription` -> `eventFunction`

When providing a webhook property it will also add a RDS-Event Subscription which will
trigger webhook messages about the cluster being requested to start, instances going up and when the
cluster is requested to go down.

#### Initializers <a name="Initializers" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer"></a>

```typescript
import { RdsDatabaseScheduler } from '@oatelaus/rds-database-scheduler'

new RdsDatabaseScheduler(scope: Construct, id: string, props: IRdsDatabaseSchedulerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.props">props</a></code> | <code><a href="#@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps">IRdsDatabaseSchedulerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.props"></a>

- *Type:* <a href="#@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps">IRdsDatabaseSchedulerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.isConstruct"></a>

```typescript
import { RdsDatabaseScheduler } from '@oatelaus/rds-database-scheduler'

RdsDatabaseScheduler.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.enableDatabaseFunction">enableDatabaseFunction</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.terminateDatabaseFunction">terminateDatabaseFunction</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.eventFunction">eventFunction</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.eventSubscription">eventSubscription</a></code> | <code>aws-cdk-lib.aws_rds.CfnEventSubscription</code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.eventTopic">eventTopic</a></code> | <code>aws-cdk-lib.aws_sns.Topic</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `enableDatabaseFunction`<sup>Required</sup> <a name="enableDatabaseFunction" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.enableDatabaseFunction"></a>

```typescript
public readonly enableDatabaseFunction: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `terminateDatabaseFunction`<sup>Required</sup> <a name="terminateDatabaseFunction" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.terminateDatabaseFunction"></a>

```typescript
public readonly terminateDatabaseFunction: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `eventFunction`<sup>Optional</sup> <a name="eventFunction" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.eventFunction"></a>

```typescript
public readonly eventFunction: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `eventSubscription`<sup>Optional</sup> <a name="eventSubscription" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.eventSubscription"></a>

```typescript
public readonly eventSubscription: CfnEventSubscription;
```

- *Type:* aws-cdk-lib.aws_rds.CfnEventSubscription

---

##### `eventTopic`<sup>Optional</sup> <a name="eventTopic" id="@oatelaus/rds-database-scheduler.RdsDatabaseScheduler.property.eventTopic"></a>

```typescript
public readonly eventTopic: Topic;
```

- *Type:* aws-cdk-lib.aws_sns.Topic

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IRdsCronSchedule <a name="IRdsCronSchedule" id="@oatelaus/rds-database-scheduler.IRdsCronSchedule"></a>

- *Implemented By:* <a href="#@oatelaus/rds-database-scheduler.IRdsCronSchedule">IRdsCronSchedule</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.IRdsCronSchedule.property.id">id</a></code> | <code>string</code> | Action name, used to unsure unique IDs for each rule. |
| <code><a href="#@oatelaus/rds-database-scheduler.IRdsCronSchedule.property.schedule">schedule</a></code> | <code>aws-cdk-lib.aws_events.CronOptions</code> | The schedule to carry out the this task. |
| <code><a href="#@oatelaus/rds-database-scheduler.IRdsCronSchedule.property.type">type</a></code> | <code><a href="#@oatelaus/rds-database-scheduler.RDSCronType">RDSCronType</a></code> | Whether to enable or terminate the database. |

---

##### `id`<sup>Required</sup> <a name="id" id="@oatelaus/rds-database-scheduler.IRdsCronSchedule.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

Action name, used to unsure unique IDs for each rule.

---

##### `schedule`<sup>Required</sup> <a name="schedule" id="@oatelaus/rds-database-scheduler.IRdsCronSchedule.property.schedule"></a>

```typescript
public readonly schedule: CronOptions;
```

- *Type:* aws-cdk-lib.aws_events.CronOptions

The schedule to carry out the this task.

---

##### `type`<sup>Required</sup> <a name="type" id="@oatelaus/rds-database-scheduler.IRdsCronSchedule.property.type"></a>

```typescript
public readonly type: RDSCronType;
```

- *Type:* <a href="#@oatelaus/rds-database-scheduler.RDSCronType">RDSCronType</a>

Whether to enable or terminate the database.

---

### IRdsDatabaseSchedulerProps <a name="IRdsDatabaseSchedulerProps" id="@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps"></a>

- *Implemented By:* <a href="#@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps">IRdsDatabaseSchedulerProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps.property.clusterIdentifier">clusterIdentifier</a></code> | <code>string</code> | Identifier from AWS that represents the cluster to be controlled. |
| <code><a href="#@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps.property.cronSchedules">cronSchedules</a></code> | <code><a href="#@oatelaus/rds-database-scheduler.IRdsCronSchedule">IRdsCronSchedule</a>[]</code> | A list of schedules as to when to enable/terminate crons. |
| <code><a href="#@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps.property.webhook">webhook</a></code> | <code>string</code> | A collection of webhooks that report status on database actions. |

---

##### `clusterIdentifier`<sup>Required</sup> <a name="clusterIdentifier" id="@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps.property.clusterIdentifier"></a>

```typescript
public readonly clusterIdentifier: string;
```

- *Type:* string

Identifier from AWS that represents the cluster to be controlled.

---

##### `cronSchedules`<sup>Required</sup> <a name="cronSchedules" id="@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps.property.cronSchedules"></a>

```typescript
public readonly cronSchedules: IRdsCronSchedule[];
```

- *Type:* <a href="#@oatelaus/rds-database-scheduler.IRdsCronSchedule">IRdsCronSchedule</a>[]

A list of schedules as to when to enable/terminate crons.

---

##### `webhook`<sup>Optional</sup> <a name="webhook" id="@oatelaus/rds-database-scheduler.IRdsDatabaseSchedulerProps.property.webhook"></a>

```typescript
public readonly webhook: string;
```

- *Type:* string

A collection of webhooks that report status on database actions.

---

## Enums <a name="Enums" id="Enums"></a>

### RDSCronType <a name="RDSCronType" id="@oatelaus/rds-database-scheduler.RDSCronType"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@oatelaus/rds-database-scheduler.RDSCronType.ENABLE">ENABLE</a></code> | *No description.* |
| <code><a href="#@oatelaus/rds-database-scheduler.RDSCronType.TERMINATE">TERMINATE</a></code> | *No description.* |

---

##### `ENABLE` <a name="ENABLE" id="@oatelaus/rds-database-scheduler.RDSCronType.ENABLE"></a>

---


##### `TERMINATE` <a name="TERMINATE" id="@oatelaus/rds-database-scheduler.RDSCronType.TERMINATE"></a>

---

