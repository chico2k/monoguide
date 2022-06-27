import Clerk from '@clerk/clerk-sdk-node/instance';
import type { Request, Response } from 'express';
import jwkToPem from 'jwk-to-pem';
import { Logger } from '@sportsguide/lib';
import { Service } from 'typedi';
import type { User } from '@prisma/client';
import jwt, { GetPublicKeyOrSecret } from 'jsonwebtoken';
import axios from 'axios';
import NodeCache from 'node-cache';
import type { ResolverData, NextFn } from 'type-graphql';
import { AuthenticationError } from 'apollo-server';
import type {
  IAuth,
  IVerfiySessionOuput,
  IContext,
  ITokenPayload,
  IAuthKeys,
  IVerfiySessionSuccess
} from './types';
import Cookies from 'cookies';
import { AuthHelper } from './AuthHelper';


const Cache = new NodeCache();

@Service()
class AuthProvider implements IAuth {
  pems: { [key: string]: string } = {};

  updateUsername = async (user: User) => {
    const username = user.username;
    try {
      const clerk = new Clerk({
        apiKey: process.env.CLERK_API_KEY
      });
      await clerk.users.updateUser(user.id, {
        username
      });
      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  private getJwksFromRemote = async (): Promise<IAuthKeys[] | undefined> => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer test_Afhsua6b2shRLJXXv3qDZLlfsWCCr0bjJn`
        }
      };

      const URL = `https://api.clerk.dev/v1/jwks`;
      const { data } = await axios(URL, config);

      const { keys } = data;
      return keys as IAuthKeys[];
    } catch (error) {
      Logger.error('UNAUTHENTICATED', error);
      return undefined;
    }
  };

  private cachePublicKeys = (keys: IAuthKeys[]): boolean => {
    try {
      for (let i = 0; i < keys.length; i++) {
        const key_id = keys[i].kid;
        const modulus = keys[i].n;
        const exponent = keys[i].e;
        const key_type = keys[i].kty;

        const jwk = { kty: key_type, n: modulus, e: exponent };
        const pem = jwkToPem(jwk);
        this.pems[key_id] = pem;

        Cache.set(key_id, pem, 0);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  private setUp = async (): Promise<void> => {
    const keys = await this.getJwksFromRemote();
    if (!keys) throw new AuthenticationError('AUTH_SERVICE_FAILED');
    this.cachePublicKeys(keys);
  };

  private checkForPublicKey = (kid: string): boolean => {
    const cachedVal = Cache.get(kid);
    if (!cachedVal) return false;
    return true;
  };

  async use({ context }: ResolverData<IContext>, next: NextFn) {
    if (!context.auth.authenticated)
      throw new AuthenticationError('UNAUTHENTICATED');

    return next();
  }


  verifySession = async (
    req: Request,
    res: Response
  ): Promise<IVerfiySessionOuput> => {
    try {
      const cookies = new Cookies(req, res);
      const clientToken = cookies.get('__session');

      if (!req.headers?.authorization && !clientToken)
        return {
          authenticated: false,
        };

      const token = clientToken ? clientToken : req.headers.authorization;

      const decodedJwt = jwt.decode(token!, {
        complete: true
      });

      if (!decodedJwt || !decodedJwt.header.kid)
        return {
          authenticated: false,
        };

      const {
        header: { kid }
      } = decodedJwt;

      const knownPublicKey = this.checkForPublicKey(kid);
      if (!knownPublicKey) await this.setUp();

      const pubblicKeys = Cache.get(kid) as GetPublicKeyOrSecret;

      const payload = jwt.verify(
        token!,
        pubblicKeys
      ) as unknown as ITokenPayload;


      return {
        authenticated: true,
        payload,
        helper: AuthHelper.contextHelper
      };
    } catch (err) {
      return {
        authenticated: false,
      };
    }
  };
}

export { AuthProvider };
