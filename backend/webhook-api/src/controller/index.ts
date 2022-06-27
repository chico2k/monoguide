import {
  WebhookClerk,
  WebhookHandler,
  WebhookDatabase
} from '@sportsguide/webhook';
import type { Request, Response } from 'express';
import Container, { Service } from 'typedi';
import { ClerController } from './clerk';
import { DatabaseController } from './database';

@Service()
class OriginController {
  static responseHandler = (
    responseStatus: boolean,
    response: Response
  ): Response => {
    if (responseStatus) return response.status(200).json();
    return response.status(400).json();
  };


  static execute = async (request: Request, response: Response) => {
    const origin = WebhookHandler.getRequestOrigin(request);

    if (origin === 'clerk') {
      const message = Container.get(WebhookClerk).verify(request);
      const responseStatus = await Container.get(ClerController).execute(
        message
      );
      return OriginController.responseHandler(responseStatus, response);
    }

    if (origin === 'database') {
      const message = Container.get(WebhookDatabase).verify(request);
      const responseStatus = await Container.get(DatabaseController).execute(
        message
      );

      return OriginController.responseHandler(responseStatus, response);
    }
    return undefined;
  };
}

export { OriginController };
