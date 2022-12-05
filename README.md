# rds-database-scheduler

Provides an easy way to schedule your RDS clusters to go up and down.

## Example

```
new RdsScheduledRules(this, 'database-scheduler', {
    clusterIdentifier: `db-oatelaus`,
    enableCron: {
        minute: '45',
        hour: '8',
        weekDay: '*',
        month: '*',
        year: '*'
    },
    terminateCron: {
        minute: '15',
        hour: '19',
        weekDay: '*',
        month: '*',
        year: '*'
    },
    webhooks: {
        start: 'https://hooks.slack.com/workflows/webhook-url',
        status: 'https://hooks.slack.com/workflows/webhook-url',
        terminate: 'https://hooks.slack.com/workflows/webhook-url'
    }
})
```