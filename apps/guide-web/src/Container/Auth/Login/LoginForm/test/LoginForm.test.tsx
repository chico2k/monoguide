import React from 'react';
import { ReactWrapper } from 'src/Components/Elements/Form/Button/tests/node_modules/enzyme';
import { InMemoryCache } from '@apollo/client';
import LoginForm from '..';
import {
  mountWithTheme,
  customFind,
  waitForComponentToPaint,
} from '../../../../../lib/jest';

import * as errorHandler from '../../../../../lib/helpers/errorHandler';
import * as access from '../../../../../accessToken';

import { LoginDocument, MeDocument } from '../../../../../generated/graphql';
import * as redirect from '../../../../../lib/HOC/redirectHOC';

describe('LoginForm ', () => {
  let wrapper: ReactWrapper;
  let tree: React.ReactNode;

  const query = {};

  test('should render correctly', () => {
    tree = <LoginForm query={query} />;
    wrapper = mountWithTheme(tree);

    const form = wrapper.find('form').first();
    const button = wrapper.find('button').first();
    const spinner = wrapper.find('Spinner');

    expect(form.length).toBe(1);
    expect(button.length).toBe(1);
    expect(spinner.length).toBe(0);
  });

  test('should submit correctly', async () => {
    let loginCalled = false;

    const cache = new InMemoryCache();

    const setAccessTokenSpy = jest.spyOn(access, 'setAccessToken');
    const redirectSpy = jest.spyOn(redirect, 'getRedirectSettings');

    const email = 'doe@domain.com';
    const password = 'NewPassword01!';
    const user = {
      __typename: 'User',
      id: 1,
      email: 'user@domain.com',
      first_name: 'John',
      last_name: 'Die',
      profile: {
        __typename: 'Profile',
        id: 1,
        is_guide: true,
      },
    };
    const accessToken = 'token';
    const authenticated = true;

    const mocks = [
      {
        request: {
          query: LoginDocument,
          variables: {
            email,
            password,
          },
        },
        result: () => {
          loginCalled = true;
          return {
            data: {
              login: {
                __typename: 'login',
                accessToken,
                user,
                authenticated,
              },
            },
          };
        },
      },
    ];

    tree = <LoginForm query={query} />;
    wrapper = mountWithTheme(tree, mocks, cache);

    const form = wrapper.find('form').first();

    const email_input = customFind(
      wrapper.find('Input'),
      'name',
      'email'
    ).first();
    email_input.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: email },
    });
    email_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const password_input = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();
    password_input.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    password_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    const { me } = cache.readQuery({
      query: MeDocument,
    });

    expect(me.user).toStrictEqual(user);
    expect(me.authenticated).toBe(authenticated);

    expect(setAccessTokenSpy).toBeCalled();
    expect(setAccessTokenSpy).toBeCalledWith('token');

    expect(redirectSpy).toBeCalled();
    expect(redirectSpy).toBeCalledWith(query);

    expect(loginCalled).toBe(true);
  });

  test('should submit fail', async () => {
    const errorSpy = jest.spyOn(errorHandler, 'errorHandler');

    const email = 'doe@domain.com';
    const password = 'NewPassword01!';
    const user = {
      __typename: 'User',
      id: 1,
      email: 'user@domain.com',
      first_name: 'John',
      last_name: 'Die',
      profile: {
        __typename: 'Profile',
        id: 1,
        is_guide: true,
      },
    };
    const accessToken = 'token';
    const authenticated = true;

    const mocks = [
      {
        request: {
          query: LoginDocument,
          variables: {
            email,
            password,
          },
        },
        result: () => {
          return {
            data: {
              login: {
                __typename: 'login',
                accessToken,
                user,
                authenticated,
              },
            },
          };
        },
      },
    ];

    tree = <LoginForm query={query} />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const email_input = customFind(
      wrapper.find('Input'),
      'name',
      'email'
    ).first();
    email_input.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: email },
    });
    email_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const password_input = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();
    password_input.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    password_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    expect(errorSpy).toBeCalled();
  });

  test('should fail empty response', async () => {
    const cache = new InMemoryCache();

    const writeQuerySpy = jest.spyOn(cache, 'writeQuery');

    const email = 'doe@domain.com';
    const password = 'NewPassword01!';

    const mocks = [
      {
        request: {
          query: LoginDocument,
          variables: {
            email,
            password,
          },
        },
        result: () => {
          return {
            data: {
              login: null,
            },
          };
        },
      },
    ];

    tree = <LoginForm query={query} />;
    wrapper = mountWithTheme(tree, mocks, cache);

    const form = wrapper.find('form').first();

    const email_input = customFind(
      wrapper.find('Input'),
      'name',
      'email'
    ).first();
    email_input.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: email },
    });
    email_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const password_input = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();
    password_input.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    password_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    expect(writeQuerySpy).toBeCalledTimes(0);
  });
});
