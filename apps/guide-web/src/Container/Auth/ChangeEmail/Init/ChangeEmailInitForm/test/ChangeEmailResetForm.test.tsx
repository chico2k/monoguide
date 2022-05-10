import { ReactWrapper } from 'enzyme';
import ChangeEmailForm from '../index';
import {
  mountWithTheme,
  customFind,
  waitForComponentToPaint,
} from '../../../../../../lib/jest';
import {
  ForgotPasswordResetDocument,
  ChangeEmailInitDocument,
  LogoutDocument,
} from '../../../../../../generated/graphql';
import * as errorHandler from '../../../../../../lib/helpers/errorHandler';
import * as accessToken from '../../../../../../accessToken';
import { InMemoryCache } from '@apollo/client';

describe('ChangeEmailForm ', () => {
  let wrapper: ReactWrapper;
  let tree: React.ReactNode;

  test('should render correctly', () => {
    tree = <ChangeEmailForm />;
    wrapper = mountWithTheme(tree);

    const form = wrapper.find('form').first();
    const button = wrapper.find('button').first();
    const spinner = wrapper.find('Spinner');

    expect(form.length).toBe(1);
    expect(button.length).toBe(1);
    expect(spinner.length).toBe(0);
  });

  test('should submit correctly', async () => {
    let changeEmailInitCalled = false;
    let logoutCalled = false;

    const newEmail = 'email@domaian.com';
    const currentPassword = 'email@domaian.com';

    const accessTokenSpy = jest.spyOn(accessToken, 'setAccessToken');

    const mocks = [
      {
        request: {
          query: ChangeEmailInitDocument,
          variables: {
            email: newEmail,
            re_email: newEmail,
            current_password: currentPassword,
          },
        },
        result: () => {
          changeEmailInitCalled = true;

          return {
            data: {
              changeEmailInit: true,
            },
          };
        },
      },
      {
        request: {
          query: LogoutDocument,
        },
        result: () => {
          logoutCalled = true;
          return {
            data: {
              logout: true,
            },
          };
        },
      },
    ];

    tree = <ChangeEmailForm />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const email = customFind(wrapper.find('Input'), 'name', 'email').first();
    email.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newEmail },
    });
    email.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);
    const re_email = customFind(
      wrapper.find('Input'),
      'name',
      're_email'
    ).first();
    re_email.simulate('change', {
      persist: () => {},
      target: { name: 're_email', value: newEmail },
    });
    re_email.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const current_password = customFind(
      wrapper.find('Input'),
      'name',
      'current_password'
    ).first();

    current_password.simulate('change', {
      persist: () => {},
      target: { name: 'current_password', value: currentPassword },
    });
    current_password.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    expect(changeEmailInitCalled).toBe(true);
    expect(logoutCalled).toBe(true);
    expect(accessTokenSpy).toBeCalled();
    expect(accessTokenSpy).toBeCalledWith('');
  });

  test('should submit fail', async () => {
    const errorSpy = jest.spyOn(errorHandler, 'errorHandler');
    const newEmail = 'email@domaian.com';
    const currentPassword = 'email@domaian.com';

    const mocks = [
      {
        request: {
          query: ChangeEmailInitDocument,
          variables: {
            email: newEmail,
            re_email: newEmail,
            current_password: currentPassword,
          },
        },
        error: new Error(''),
      },
    ];

    tree = <ChangeEmailForm />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const email = customFind(wrapper.find('Input'), 'name', 'email').first();
    email.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newEmail },
    });
    email.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);
    const re_email = customFind(
      wrapper.find('Input'),
      'name',
      're_email'
    ).first();
    re_email.simulate('change', {
      persist: () => {},
      target: { name: 're_email', value: newEmail },
    });
    re_email.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const current_password = customFind(
      wrapper.find('Input'),
      'name',
      'current_password'
    ).first();

    current_password.simulate('change', {
      persist: () => {},
      target: { name: 'current_password', value: currentPassword },
    });
    current_password.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    expect(errorSpy).toBeCalled();
  });
});
