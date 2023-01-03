import {
  DescribeDBClustersCommand,
  DescribeDBInstancesCommand,
  RDSClient,
  StartDBClusterCommand,
  StopDBClusterCommand,
  waitUntilDBInstanceAvailable,
} from '@aws-sdk/client-rds';

const client = new RDSClient({});

export async function stopCluster(identifier: string) {
  const command = new StopDBClusterCommand({
    DBClusterIdentifier: identifier,
  });

  const response = await client.send(command);

  return response.DBCluster;
}

export async function startCluster(identifier: string) {
  const command = new StartDBClusterCommand({
    DBClusterIdentifier: identifier,
  });

  const response = await client.send(command);

  return response.DBCluster;
}

export async function getCluster(identifier: string) {
  const command = new DescribeDBClustersCommand({
    DBClusterIdentifier: identifier,
  });

  const response = await client.send(command);

  return response.DBClusters?.pop();
}

export async function getDbInstances(identifier: string) {
  const command = new DescribeDBInstancesCommand({
    Filters: [
      {
        Name: 'db-cluster-id',
        Values: [identifier],
      },
    ],
  });

  const response = await client.send(command);

  return response.DBInstances || [];
}

export async function waitForDatabase(identifier: string) {
  return waitUntilDBInstanceAvailable(
    {
      client,
      // Wait a maximum of 15 minutes (should outlive the lambda)
      maxWaitTime: 60 * 15,
    },
    {
      DBInstanceIdentifier: identifier,
    }
  );
}
