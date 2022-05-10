import type { IUserAuth } from '@sportsguide/auth';

export type IWebhookClerk = {
  eventTypes: IEventTypesClark;
};

export type IEventTypesClark = {
  'user.created': 'user.created';
  'user.deleted': 'user.deleted';
  'user.updated': 'user.updated';
  'session.created': 'session.created';
  'session.ended': 'session.ended';
  'session.removed': 'session.removed';
  'session.revoked': 'session.revoked';
};

export type IUserCreated = {
  type: 'user.created';
  data: IUserAuth;
};

export type IUserDelete = {
  data: {
    deleted: true;
    id: string;
    object: 'user';
  };
  type: 'user.deleted';
};

export type IUserUpdated = {
  type: 'user.updated';
  data: IUserAuth;
};

export type SvixPayloadClerk = IUserCreated | IUserUpdated | IUserDelete;

declare module 'http' {
  interface IncomingHttpHeaders {
    'webhook-id': string;
    'webhook-timestamp': string;
    'webhook-signature': string;
  }
}
