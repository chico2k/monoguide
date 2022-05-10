import { ReactWrapper } from 'enzyme';
import PasswordConfirmForm from '../index';
import {
  mountWithTheme,
  customFind,
  waitForComponentToPaint,
} from '../../../../../../lib/jest';
import { ForgotPasswordConfirmDocument } from '../../../../../../generated/graphql';
import * as errorHandler from '../../../../../../lib/helpers/errorHandler';

describe('PasswordConfirmForm ', () => {
  let wrapper: ReactWrapper;
  let tree: React.ReactNode;

  test('should render correctly Spinner', () => {
    tree = <PasswordConfirmForm token={'token'} />;
    wrapper = mountWithTheme(tree);

    const form = wrapper.find('form').first();
    const button = wrapper.find('button').first();
    const spinner = wrapper.find('Spinner');

    expect(form.length).toBe(1);
    expect(button.length).toBe(1);
    expect(spinner.length).toBe(0);
  });

  test('should submit correctly', async () => {
    let mutationCalled = false;
    const newPassword = 'NewPassword01!';
    const token = 'token';

    const mocks = [
      {
        request: {
          query: ForgotPasswordConfirmDocument,
          variables: {
            re_password: newPassword,
            password: newPassword,
            token,
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              forgotPasswordConfirm: true,
            },
          };
        },
      },
    ];

    tree = <PasswordConfirmForm token={token} />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const password = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();

    password.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: 'NewPassword01!' },
    });
    password.simulate('blur');

    const re_password = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();

    re_password.simulate('change', {
      persist: () => {},
      target: { name: 're_password', value: 'NewPassword01!' },
    });
    re_password.simulate('blur');

    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 60);

    expect(mutationCalled).toBe(true);
  });

  test('should submit fail', async () => {
    const newPassword = 'NewPassword01!';
    const token = 'token';

    const errorSpy = jest.spyOn(errorHandler, 'errorHandler');

    const mocks = [
      {
        request: {
          query: ForgotPasswordConfirmDocument,
          variables: {
            re_password: newPassword,
            password: newPassword,
            token,
          },
        },
        error: new Error('error!'),
      },
    ];

    tree = <PasswordConfirmForm token={token} />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const password = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();

    password.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: 'NewPassword01!' },
    });
    password.simulate('blur');

    const re_password = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();

    re_password.simulate('change', {
      persist: () => {},
      target: { name: 're_password', value: 'NewPassword01!' },
    });
    re_password.simulate('blur');

    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 60);

    expect(errorSpy).toBeCalled();
  });
});
