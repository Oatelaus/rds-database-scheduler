# rds-database-scheduler

A CDK Construct that scaffolds a basic scheduling concepts that bring your database up and down based on cron scheduling.

Common usecases of this tool would be keeping your development databases down out of hours or even for longer than 7 days.

Something to note when using this is that database instances can take some time to go up and you should accomodate for this when setting up schedules.

The `webhook` property provides a way to get updates about your database instances as they become available.

## Webhook Body

```ts
{
  message: "Thing happened";
}
```

## Examples

### Keep your development database up between 8:45AM and 7:15PM.

```ts
new RdsDatabaseScheduler(this, "database-scheduler", {
  clusterIdentifier: `db-oatelaus`,
  enableCron: {
    minute: "45",
    hour: "8",
    weekDay: "*",
    month: "*",
    year: "*",
  },
  terminateCron: {
    minute: "15",
    hour: "19",
    weekDay: "*",
    month: "*",
    year: "*",
  },
});
```

### Bringing your database up for maintenance hours (4:30/5AM -> 6/6:30AM)

```ts
new RdsDatabaseScheduler(this, "database-scheduler", {
  clusterIdentifier: `db-oatelaus`,
  enableCron: {
    minute: "30",
    hour: "4",
    month: "*",
    year: "*",
    weekDay: "SUN",
  },
  terminateCron: {
    minute: "30",
    hour: "6",
    month: "*",
    year: "*",
    weekDay: "SUN",
  },
});
```
