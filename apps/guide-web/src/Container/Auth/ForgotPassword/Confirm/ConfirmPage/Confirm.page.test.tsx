import { shallowWithTheme } from '../../../../../lib/jest';
import ConfirmPasswordPage from '../../../../../pages/auth/reset-password/confirm/[token]';

test('should render Confirm Password Page', () => {
  const query = { token: 'token' };
  const tree = <ConfirmPasswordPage query={query} />;
  const wrapper = shallowWithTheme(tree);

  const landingComponent = wrapper.find('PasswordConfirmComp');

  expect(landingComponent.length).toBe(1);
});

test('should return Get Initial Props to Page', () => {
  const ctx = {
    NextPageContext: null,
    pathname: null,
    AppTree: null,
    query: {
      token: 'token',
    },
  };

  const props = ConfirmPasswordPage.getInitialProps(ctx);
  expect(props).toEqual({
    query: {
      token: 'token',
    },
  });
});
