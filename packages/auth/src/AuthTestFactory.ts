import type {
  IUserAuth,
  IContext,
  ITokenPayload,
  IVerfiySessionSuccess,
  IContextHelper,
  IGetTestContextInput
} from './types';
import faker from 'faker';
import { AuthHelper } from './AuthHelper';

class AuthTestFactory {
  static getTestContext = ({
    userId,
    authenticated
  }: IGetTestContextInput): IContext => {
    const bla = {
      auth: {
        authenticated,
        payload: { userId } as ITokenPayload,
        getUserId: AuthHelper.contextHelper.getUserId
      } as unknown as IContextHelper & IVerfiySessionSuccess
    };
    return bla;
  };

  static generateClerkUser = (): IUserAuth => {
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();

    return {
      birthday: faker.date.past().toString(),
      created_at: 99999999999,
      email_addresses: [
        {
          email_address: faker.internet.email(),
          id: faker.datatype.uuid(),
          linked_to: [],
          object: 'string',
          verification: {
            expire_at: 9999,
            status: 'verified',
            strategy: 'strategy',
            verified_at_client: 'verified_at_client'
          }
        }
      ],
      external_accounts: [],
      external_id: [],
      last_name,
      gender: 'ma',
      id: faker.datatype.uuid(),
      first_name,
      object: 'object',
      password_enabled: true,
      phone_numbers: [],
      primary_email_address_id: 'primary_email_address_id',
      primary_phone_number_id: ' primary_phone_number_id',
      primary_web3_wallet_id: 'primary_web3_wallet_id',
      private_metadata: {},
      profile_image_url: 'profile_image_url',
      public_metadata: {},
      two_factor_enabled: true,
      unsafe_metadata: {},
      updated_at: 99999,
      username: first_name + '-' + last_name,
      web3_wallets: []
    };
  };
}

export { AuthTestFactory };
