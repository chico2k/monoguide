import { ReactWrapper } from 'enzyme';
import PasswordResetForm from '../index';
import {
  mountWithTheme,
  customFind,
  waitForComponentToPaint,
} from '../../../../../../lib/jest';
import { ForgotPasswordResetDocument } from '../../../../../../generated/graphql';
import * as errorHandler from '../../../../../../lib/helpers/errorHandler';

describe('PasswordResetForm ', () => {
  let wrapper: ReactWrapper;
  let tree: React.ReactNode;

  test('should render correctly', () => {
    tree = <PasswordResetForm />;
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
    const newEmail = 'email@domaian.com';

    const mocks = [
      {
        request: {
          query: ForgotPasswordResetDocument,
          variables: {
            email: newEmail,
          },
        },
        result: () => {
          mutationCalled = true;
          return {
            data: {
              forgotPasswordReset: true,
            },
          };
        },
      },
    ];

    tree = <PasswordResetForm />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const email = customFind(wrapper.find('Input'), 'name', 'email').first();

    email.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newEmail },
    });
    email.simulate('blur');

    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 60);

    expect(mutationCalled).toBe(true);
  });

  test('should submit fail', async () => {
    const errorSpy = jest.spyOn(errorHandler, 'errorHandler');
    const newEmail = 'email@domaian.com';

    const mocks = [
      {
        request: {
          query: ForgotPasswordResetDocument,
          variables: {
            email: newEmail,
          },
        },
        result: () => {
          return {
            data: {
              forgotPasswordReset: false,
            },
          };
        },
      },
    ];

    tree = <PasswordResetForm />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const email = customFind(wrapper.find('Input'), 'name', 'email').first();

    email.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: newEmail },
    });
    email.simulate('blur');

    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 60);

    expect(errorSpy).toBeCalled();
  });
});
