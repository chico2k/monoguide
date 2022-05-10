/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ResolverData, NextFn } from 'type-graphql';
import type { Request, Response } from 'express';
import type jwkToBuffer from 'jwk-to-pem';

export interface Verification {
  expire_at: number;
  status: string;
  strategy: string;
  verified_at_client: string;
}

export interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  verification: Verification;
}

export interface PrivateMetadata {}

export interface PublicMetadata {}

export interface UnsafeMetadata {}

export interface IUserAuth {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  external_accounts: any[];
  external_id?: any;
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id?: any;
  primary_web3_wallet_id?: any;
  private_metadata: PrivateMetadata;
  profile_image_url: string;
  public_metadata: PublicMetadata;
  two_factor_enabled: boolean;
  unsafe_metadata: UnsafeMetadata;
  updated_at: number;
  username?: any;
  web3_wallets: any[];
}

export type IAuth = {
  use: ({ context }: ResolverData<IContext>, next: NextFn) => Promise<void>;
  verifySession: (req: Request, res: Response) => Promise<IVerfiySessionOuput>;
};

export type IAuthKeys = {
  kid: string;
  alg: string;
  e: string;
  n: string;
  use: string;
  kty: jwkToBuffer.RSA['kty'];
};

export type ITokenPayload = {
  azp: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  userId: string;
  lastName: string;
  firstName: string;
  primaryEmail: string;
  profileImage: string;
  publicMeta: any;
};

export type IVerfiySessionOuput = IVerfiySessionSuccess | IVerfiySessionFail;
export type IVerfiySessionSuccess = {
  authenticated: boolean;
  payload: ITokenPayload;
};
export type IVerfiySessionFail = { authenticated: boolean; payload: undefined };

export type IContext = {
  auth: IVerfiySessionSuccess & IContextHelper;
};

export type IContextHelper = {
  /**
   * Helper to return the User Id
   */
  getUserId: () => string;
};

export type IGetTestContextInput = {
  userId: string;
  authenticated: boolean;
};
