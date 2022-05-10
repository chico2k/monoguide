import { Service } from 'typedi';
import type { Request } from 'express';
import type {
  IEventTypesClark,
  IWebhookClerk,
  SvixPayloadClerk,
} from './types';
import { Webhook as SvixWebhook } from 'svix';

const secretEndpoiintClark = 'whsec_AFzDkbFmQMeRQAnjt/JALKNZTei0NKWE';

@Service()
class WebhookClerk implements IWebhookClerk {
  constructor(private wh = new SvixWebhook(secretEndpoiintClark)) {}

  eventTypes: IEventTypesClark = {
    'user.created': 'user.created',
    'user.deleted': 'user.deleted',
    'user.updated': 'user.updated',
    'session.created': 'session.created',
    'session.ended': 'session.ended',
    'session.removed': 'session.removed',
    'session.revoked': 'session.revoked',
  };

  verify = (request: Request): SvixPayloadClerk => {
    const payload = request.body;
    const headers = request.headers;

    return this.wh.verify(payload, headers) as SvixPayloadClerk;
  };
}

export { WebhookClerk };
