import { SNSEvent } from 'aws-lambda';
import { post } from '../../services/http';
import { waitForDatabase } from '../../services/rds';

const { WEBHOOK, CLUSTER_IDENTIFIER } = process.env;

export interface RDSEventMessage {
  'Event Source': 'db-instance';
  'Event Time': string;
  'Identifier Link': string;
  'Source ID': string; // "db-nathan-2",
  'Source ARN': string; // "arn:aws:rds:eu-west-2:303062881782:db:db-nathan-2",
  'Event ID': string; // "http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.Messages.html#RDS-EVENT-0006",
  'Event Message': string; //"DB instance restarted"
}

const DATA_RECOVER_EVENT = '0088';

export async function handler(event: SNSEvent) {
  const primaryRecord = event.Records[0]!;

  const rdsEventMessage: RDSEventMessage = JSON.parse(primaryRecord.Sns.Message);

  const eventId = rdsEventMessage['Event ID'].split('#RDS-EVENT-')[1];

  if (eventId !== DATA_RECOVER_EVENT) {
    return;
  }

  await waitForDatabase(rdsEventMessage['Source ID']);

  await post(WEBHOOK, {
    message: `Instance ${rdsEventMessage['Source ID']} of cluster ${CLUSTER_IDENTIFIER} is available`,
  });

  return true;
}