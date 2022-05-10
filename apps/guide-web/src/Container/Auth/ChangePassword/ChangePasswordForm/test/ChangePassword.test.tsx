import AuthChangePassword, { InnerForm } from '..';
import {
  shallowWithTheme,
  mountWithTheme,
  waitForComponentToPaint,
  customFind,
} from '../../../../../lib/jest';
import sinon from 'sinon';
import {
  ChangePasswordDocument,
  LogoutDocument,
} from '../../../../../generated/graphql';
import { SinonSandbox } from 'sinon';
import * as errorHandler from '../../../../../lib/helpers/errorHandler';
import * as accessToken from '../../../../../accessToken';

describe('InnerForm should render correctly', () => {
  let wrapper: any;
  const handleSubmit = jest.fn();

  test('should render form', async () => {
    const tree = <InnerForm handleSubmit={handleSubmit} isSubmitting={false} />;
    wrapper = shallowWithTheme(tree);

    await waitForComponentToPaint(wrapper);

    const form = wrapper.find('form');
    const button = wrapper.find('index');
    const spinner = wrapper.find('Spinner');
    const password = customFind(wrapper, 'name', 'password');
    const re_password = customFind(wrapper, 'name', 're_password');
    const current_password = customFind(wrapper, 'name', 'current_password');

    expect(form.length).toBe(1);
    expect(spinner.length).toBe(0);
    expect(password.length).toBe(1);
    expect(re_password.length).toBe(1);
    expect(current_password.length).toBe(1);
    expect(button.length).toBe(1);
  });

  test('should render Spinner', async () => {
    const tree = <InnerForm handleSubmit={handleSubmit} isSubmitting={true} />;
    wrapper = shallowWithTheme(tree);

    await waitForComponentToPaint(wrapper, 30);

    const form = wrapper.find('form');
    const button = wrapper.find('index');
    const spinner = wrapper.find('spinner');
    const password = customFind(wrapper, 'name', 'password');
    const re_password = customFind(wrapper, 'name', 're_password');
    const current_password = customFind(wrapper, 'name', 'current_password');

    expect(form.length).toBe(0);
    expect(spinner.length).toBe(1);
    expect(password.length).toBe(0);
    expect(re_password.length).toBe(0);
    expect(current_password.length).toBe(0);
    expect(button.length).toBe(0);
  });
});

describe('should submit', () => {
  let passwordChangeCalled: boolean;
  var logoutCalled: boolean;
  let tree: React.ReactNode;
  let wrapper: any;
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    passwordChangeCalled = false;
    logoutCalled = false;
  });

  afterEach(() => {
    sandbox.restore();
  });

  test('should submit correctly', async () => {
    const password = 'Password1234!';
    const current_password = 'NewPassword1234!';
    tree = <AuthChangePassword />;

    const mocks = [
      {
        request: {
          query: ChangePasswordDocument,
          variables: {
            password,
            re_password: password,
            current_password,
          },
        },
        result: () => {
          passwordChangeCalled = true;
          return { data: { changePassword: true } };
        },
      },

      {
        request: {
          query: LogoutDocument,
        },
        result: () => {
          logoutCalled = true;

          return { data: { logout: true } };
        },
      },
    ];

    wrapper = mountWithTheme(tree, mocks);

    const accessTokenStub = sandbox.stub(accessToken, 'setAccessToken');

    const passwordInput = customFind(wrapper, 'name', 'password').find('input');
    passwordInput.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    passwordInput.simulate('blur');

    const re_passwordInput = customFind(wrapper, 'name', 're_password').find(
      'input'
    );
    re_passwordInput.simulate('change', {
      persist: () => {},
      target: { name: 're_password', value: password },
    });
    re_passwordInput.simulate('blur');

    const current_passwordInput = customFind(
      wrapper,
      'name',
      'current_password'
    ).find('input');
    current_passwordInput.simulate('change', {
      persist: () => {},
      target: { name: 'current_password', value: current_password },
    });
    current_passwordInput.simulate('blur');

    const form = wrapper.find('form');
    form.first().simulate('submit');

    await waitForComponentToPaint(wrapper, 60);

    // Expects
    sandbox.assert.called(accessTokenStub);
    expect(logoutCalled).toBe(true);
    expect(passwordChangeCalled).toBe(true);
  });

  test('should submit incorrectly ', async () => {
    const password = 'Password1234!';
    const current_password = 'NewPassword1234!';
    tree = <AuthChangePassword />;

    const mocks = [
      {
        request: {
          query: ChangePasswordDocument,
          variables: {
            password,
            re_password: password,
            current_password,
          },
        },
        error: new Error('Error'),
      },
    ];

    wrapper = mountWithTheme(tree, mocks);
    await waitForComponentToPaint(wrapper, 30);

    const errorStub = sandbox.stub(errorHandler, 'errorHandler');

    const passwordInput = customFind(wrapper, 'name', 'password').find('input');
    passwordInput.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    passwordInput.simulate('blur');

    const re_passwordInput = customFind(wrapper, 'name', 're_password').find(
      'input'
    );
    re_passwordInput.simulate('change', {
      persist: () => {},
      target: { name: 're_password', value: password },
    });
    re_passwordInput.simulate('blur');

    const current_passwordInput = customFind(
      wrapper,
      'name',
      'current_password'
    ).find('input');

    current_passwordInput.simulate('change', {
      persist: () => {},
      target: { name: 'current_password', value: current_password },
    });
    current_passwordInput.simulate('blur');

    const form = wrapper.find('form');
    form.first().simulate('submit');

    await waitForComponentToPaint(wrapper, 30);
    sandbox.assert.called(errorStub);
  });
});
