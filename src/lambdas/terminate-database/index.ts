import { stopCluster } from '../../services/rds';
import { post } from '../../services/http';

const { CLUSTER_IDENTIFIER, WEBHOOK } = process.env;

export async function handler() {
  if (!CLUSTER_IDENTIFIER) {
    throw new Error('Cluster identifier is required.');
  }
  await stopCluster(CLUSTER_IDENTIFIER);
  await post(WEBHOOK, {
    cluster: CLUSTER_IDENTIFIER,
    message: `Stopping cluster ${CLUSTER_IDENTIFIER}`,
  });
  return true;
}