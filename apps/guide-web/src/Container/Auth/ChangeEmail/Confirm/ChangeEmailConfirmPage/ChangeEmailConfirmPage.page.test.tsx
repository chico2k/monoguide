import { shallowWithTheme } from '../../../../../lib/jest';
import ChangeEmailConfirmPage from '../../../../../pages/auth/change-email/confirm/[token]';

test('should render Change Email Confirm Page', () => {
  const query = { token: 'token' };
  const tree = <ChangeEmailConfirmPage query={query} />;
  const wrapper = shallowWithTheme(tree);

  const landingComponent = wrapper.find('ChangeEmailComp');

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

  const props = ChangeEmailConfirmPage.getInitialProps(ctx);
  expect(props).toEqual({
    query: {
      token: 'token',
    },
  });
});
