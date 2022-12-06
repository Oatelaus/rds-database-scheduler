import { getCluster, getDbInstances, startCluster, waitForDatabase } from '../../database';
import { post } from '../../http';

const { CLUSTER_IDENTIFIER, WEBHOOK_START, WEBHOOK_START_STATUS } = process.env;

export async function handler() {
  if (!CLUSTER_IDENTIFIER) {
    throw new Error('Cluster identifier is required.');
  }

  const cluster = await getCluster(CLUSTER_IDENTIFIER);

  // This block handles the possible retry logic from timeout for when RDS takes too long and WEBHOOK_STATUS is set.
  if (cluster?.Status === 'stopped') {
    // Request the cluster be started.
    await startCluster(CLUSTER_IDENTIFIER);

    await post(WEBHOOK_START, {
      cluster: CLUSTER_IDENTIFIER,
      message: `Starting cluster ${CLUSTER_IDENTIFIER}`,
    });
  } else if (cluster?.Status !== 'starting') {
    throw new Error('Cluster is not in an actionable state.');
  }

  // We can try and report on status. It might take more than 15 minutes to go up.
  if (WEBHOOK_START_STATUS) {
    const databaseInstancesResponse = await getDbInstances(CLUSTER_IDENTIFIER!);

    await Promise.allSettled<any>(databaseInstancesResponse.map(async (instance) => {
      // If the instance is already available then this is probably a retry.
      if (instance.DBInstanceStatus === 'Available') {
        return;
      }
      await waitForDatabase(instance.DBInstanceIdentifier!);
      await post(WEBHOOK_START_STATUS, {
        cluster: CLUSTER_IDENTIFIER,
        instance: instance.DBClusterIdentifier!,
        message: `Cluster ${CLUSTER_IDENTIFIER} instance ${instance.DBInstanceIdentifier} available.`,
      });
    }));
  }

  return true;
}