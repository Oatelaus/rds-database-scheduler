import { stopCluster } from '../../database';
import { post } from '../../http';

const { CLUSTER_IDENTIFIER, WEBHOOK_TERMINATE } = process.env;

export async function handler() {
  if (!CLUSTER_IDENTIFIER) {
    throw new Error('Cluster identifier is required.');
  }
  await stopCluster(CLUSTER_IDENTIFIER);
  await post(WEBHOOK_TERMINATE, {
    cluster: CLUSTER_IDENTIFIER,
    message: `Stopping cluster ${CLUSTER_IDENTIFIER}`,
  });
  return true;
}