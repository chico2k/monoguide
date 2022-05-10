import type { Request } from 'express';
import { WebhookClerk } from '../WebhookClerk';
import { WebhookDatabase } from '../WebhookDatabase';
import type { IRequestOrign } from './types';

class WebhookHandler {
  webhookDatabase = new WebhookDatabase();
  webhookClerk = new WebhookClerk();

  private getEventType = (request: Request): string => {
    const body = JSON.parse(request.body);

    if (!body.type)
      throw new Error(
        `The request does not contain a valid eventType. You have passed ${body.type}`
      );
    return body.type;
  };

  static getRequestOrigin = (request: Request): IRequestOrign => {
    const webhookHandler = new WebhookHandler();

    const type = webhookHandler.getEventType(request);

    const databaseTypes = webhookHandler.webhookDatabase.eventTypes;
    const clerkTypes = webhookHandler.webhookClerk.eventTypes;

    if (Object.keys(databaseTypes).includes(type)) {
      return 'database';
    }

    if (Object.keys(clerkTypes).includes(type)) {
      return 'clerk';
    }

    throw new Error(
      `The request does not contain a valid event origin. You have passed ${type}`
    );
  };
}

export { WebhookHandler };
