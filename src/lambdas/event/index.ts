import { SNSEvent } from 'aws-lambda';
import { post } from '../../services/http';
import { waitForDatabase } from '../../services/rds';

const { WEBHOOK, CLUSTER_IDENTIFIER } = process.env;

export interface RDSEventMessage {
  'Event Source': 'db-instance';
  'Event Time': string;
  'Identifier Link': string;
  'Source ID': string;
  'Source ARN': string;
  'Event ID': string;
  'Event Message': string;
}

const DATABASE_INSTANCE_START_EVENT = '0088';

export async function handler(event: SNSEvent) {
  const primaryRecord = event.Records[0]!;

  const rdsEventMessage: RDSEventMessage = JSON.parse(primaryRecord.Sns.Message);

  const eventId = rdsEventMessage['Event ID'].split('#RDS-EVENT-')[1];

  if (eventId !== DATABASE_INSTANCE_START_EVENT) {
    return;
  }

  await waitForDatabase(rdsEventMessage['Source ID']);

  await post(WEBHOOK, {
    message: `Instance ${rdsEventMessage['Source ID']} of cluster ${CLUSTER_IDENTIFIER} is available`,
  });

  return true;
}