# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RdsDatabaseScheduler <a name="RdsDatabaseScheduler" id="rds-database-scheduler.RdsDatabaseScheduler"></a>

Provides an easy way to schedule the time of which your RDS clusters go up and down.

This is comprised of two rules and two functions.

  `enableDatabaseRule` -> `enableDatabaseFunction`

  `terminateDatabaseRule` -> `terminateDatabaseFunction`

Both of these rules take a CronOptions object which describes when they will fire. Otherwise you can trigger these
functions manually.

The functions within trigger webhooks about various events:
  `WEBHOOK_START` -> when a cluster is started.
```
  {
    message,
    cluster
  }
```
  `WEBHOOK_START_STATUS` -> when an instance within a cluster becomes available. **This will make the lambda long-running**
```
  {
   message,
   cluster,
   instance
  }
```
  `WEBHOOK_TERMINATE` -> when a cluster is terminated.
```
  {
    message,
    cluster
  }
```

#### Initializers <a name="Initializers" id="rds-database-scheduler.RdsDatabaseScheduler.Initializer"></a>

```typescript
import { RdsDatabaseScheduler } from 'rds-database-scheduler'

new RdsDatabaseScheduler(scope: Construct, id: string, props: IRdsDatabaseSchedulerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.props">props</a></code> | <code><a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps">IRdsDatabaseSchedulerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="rds-database-scheduler.RdsDatabaseScheduler.Initializer.parameter.props"></a>

- *Type:* <a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps">IRdsDatabaseSchedulerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="rds-database-scheduler.RdsDatabaseScheduler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="rds-database-scheduler.RdsDatabaseScheduler.isConstruct"></a>

```typescript
import { RdsDatabaseScheduler } from 'rds-database-scheduler'

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

###### `x`<sup>Required</sup> <a name="x" id="rds-database-scheduler.RdsDatabaseScheduler.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.property.enableDatabaseFunction">enableDatabaseFunction</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.property.terminateDatabaseFunction">terminateDatabaseFunction</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.property.enableDatabaseRule">enableDatabaseRule</a></code> | <code>aws-cdk-lib.aws_events.Rule</code> | *No description.* |
| <code><a href="#rds-database-scheduler.RdsDatabaseScheduler.property.terminateDatabaseRule">terminateDatabaseRule</a></code> | <code>aws-cdk-lib.aws_events.Rule</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="rds-database-scheduler.RdsDatabaseScheduler.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `enableDatabaseFunction`<sup>Required</sup> <a name="enableDatabaseFunction" id="rds-database-scheduler.RdsDatabaseScheduler.property.enableDatabaseFunction"></a>

```typescript
public readonly enableDatabaseFunction: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `terminateDatabaseFunction`<sup>Required</sup> <a name="terminateDatabaseFunction" id="rds-database-scheduler.RdsDatabaseScheduler.property.terminateDatabaseFunction"></a>

```typescript
public readonly terminateDatabaseFunction: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `enableDatabaseRule`<sup>Optional</sup> <a name="enableDatabaseRule" id="rds-database-scheduler.RdsDatabaseScheduler.property.enableDatabaseRule"></a>

```typescript
public readonly enableDatabaseRule: Rule;
```

- *Type:* aws-cdk-lib.aws_events.Rule

---

##### `terminateDatabaseRule`<sup>Optional</sup> <a name="terminateDatabaseRule" id="rds-database-scheduler.RdsDatabaseScheduler.property.terminateDatabaseRule"></a>

```typescript
public readonly terminateDatabaseRule: Rule;
```

- *Type:* aws-cdk-lib.aws_events.Rule

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IRdsDatabaseSchedulerProps <a name="IRdsDatabaseSchedulerProps" id="rds-database-scheduler.IRdsDatabaseSchedulerProps"></a>

- *Implemented By:* <a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps">IRdsDatabaseSchedulerProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps.property.clusterIdentifier">clusterIdentifier</a></code> | <code>string</code> | Identifier from AWS that represents the cluster to be controlled. |
| <code><a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps.property.enableCron">enableCron</a></code> | <code>aws-cdk-lib.aws_events.CronOptions</code> | CronOptions that represent when the database will be brought up. |
| <code><a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps.property.terminateCron">terminateCron</a></code> | <code>aws-cdk-lib.aws_events.CronOptions</code> | CronOptions that represent when the database will be terminated. |
| <code><a href="#rds-database-scheduler.IRdsDatabaseSchedulerProps.property.webhooks">webhooks</a></code> | <code><a href="#rds-database-scheduler.IWebhookOptions">IWebhookOptions</a></code> | A collection of webhooks that report status on database actions. |

---

##### `clusterIdentifier`<sup>Required</sup> <a name="clusterIdentifier" id="rds-database-scheduler.IRdsDatabaseSchedulerProps.property.clusterIdentifier"></a>

```typescript
public readonly clusterIdentifier: string;
```

- *Type:* string

Identifier from AWS that represents the cluster to be controlled.

---

##### `enableCron`<sup>Optional</sup> <a name="enableCron" id="rds-database-scheduler.IRdsDatabaseSchedulerProps.property.enableCron"></a>

```typescript
public readonly enableCron: CronOptions;
```

- *Type:* aws-cdk-lib.aws_events.CronOptions

CronOptions that represent when the database will be brought up.

---

##### `terminateCron`<sup>Optional</sup> <a name="terminateCron" id="rds-database-scheduler.IRdsDatabaseSchedulerProps.property.terminateCron"></a>

```typescript
public readonly terminateCron: CronOptions;
```

- *Type:* aws-cdk-lib.aws_events.CronOptions

CronOptions that represent when the database will be terminated.

---

##### `webhooks`<sup>Optional</sup> <a name="webhooks" id="rds-database-scheduler.IRdsDatabaseSchedulerProps.property.webhooks"></a>

```typescript
public readonly webhooks: IWebhookOptions;
```

- *Type:* <a href="#rds-database-scheduler.IWebhookOptions">IWebhookOptions</a>

A collection of webhooks that report status on database actions.

---

### IWebhookOptions <a name="IWebhookOptions" id="rds-database-scheduler.IWebhookOptions"></a>

- *Implemented By:* <a href="#rds-database-scheduler.IWebhookOptions">IWebhookOptions</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#rds-database-scheduler.IWebhookOptions.property.start">start</a></code> | <code>string</code> | Reports when the database is going up. |
| <code><a href="#rds-database-scheduler.IWebhookOptions.property.startStatus">startStatus</a></code> | <code>string</code> | Reports when the database instances go up. |
| <code><a href="#rds-database-scheduler.IWebhookOptions.property.terminate">terminate</a></code> | <code>string</code> | Reports when the database is going down. |

---

##### `start`<sup>Optional</sup> <a name="start" id="rds-database-scheduler.IWebhookOptions.property.start"></a>

```typescript
public readonly start: string;
```

- *Type:* string

Reports when the database is going up.

---

##### `startStatus`<sup>Optional</sup> <a name="startStatus" id="rds-database-scheduler.IWebhookOptions.property.startStatus"></a>

```typescript
public readonly startStatus: string;
```

- *Type:* string

Reports when the database instances go up.

Will make the lambda long-running.

---

##### `terminate`<sup>Optional</sup> <a name="terminate" id="rds-database-scheduler.IWebhookOptions.property.terminate"></a>

```typescript
public readonly terminate: string;
```

- *Type:* string

Reports when the database is going down.

---

