import { post } from '../../services/http';
import { startCluster } from '../../services/rds';

const { CLUSTER_IDENTIFIER, WEBHOOK } = process.env;

export async function handler() {
  if (!CLUSTER_IDENTIFIER) {
    throw new Error('Cluster identifier is required.');
  }

  // Request the cluster be started.
  await startCluster(CLUSTER_IDENTIFIER);

  await post(WEBHOOK, {
    cluster: CLUSTER_IDENTIFIER,
    message: `Starting cluster ${CLUSTER_IDENTIFIER}`,
  });

  return true;
}
