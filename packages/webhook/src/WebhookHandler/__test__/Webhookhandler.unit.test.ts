import { WebhookHandler } from '..';
import type { Request } from 'express';

const updateRequest = {
  'data': {
    'birthday': '',
    'created_at': 1644520015784,
    'email_addresses': [
      {
        'email_address': 'mariogalla86@gmail.com',
        'id': 'idn_24vnciKPTnR8cNBWS1uJMitAVtk',
        'linked_to': [],
        'object': 'email_address',
        'verification': {
          'expire_at': 1644520608674,
          'status': 'verified',
          'strategy': 'email_link',
          'verified_at_client': 'client_24vnQn7p5oQb61ltLGsBsNd2JCn',
        },
      },
    ],
    'external_accounts': [],
    'external_id': null,
    'first_name': 'Mario',
    'gender': '',
    'id': 'user_24vndV8nmrHf8YMZ3rd8mnQH6yu',
    'last_name': 'Galla',
    'object': 'user',
    'password_enabled': true,
    'phone_numbers': [
      {
        'default_second_factor': false,
        'id': 'idn_24voKiW2buCv4FWEHRGRDb2tRsF',
        'linked_to': [],
        'object': 'phone_number',
        'phone_number': '+491709675488',
        'reserved_for_second_factor': false,
        'verification': {
          'attempts': 1,
          'expire_at': 1644520958634,
          'status': 'verified',
          'strategy': 'phone_code',
        },
      },
    ],
    'primary_email_address_id': 'idn_24vnciKPTnR8cNBWS1uJMitAVtk',
    'primary_phone_number_id': 'idn_24voKiW2buCv4FWEHRGRDb2tRsF',
    'primary_web3_wallet_id': null,
    'private_metadata': {},
    'profile_image_url': 'https://www.gravatar.com/avatar?d=mp',
    'public_metadata': {},
    'two_factor_enabled': false,
    'unsafe_metadata': {},
    'updated_at': 1644520370914,
    'username': null,
    'web3_wallets': [],
  },
  'object': 'event',
  'type': 'user.updated',
};

it('should get the correct orgin', async () => {
  const request = {
    body: updateRequest,
  } as Request;
  const origin = WebhookHandler.getRequestOrigin(request);

  console.log('origin', origin);
});
