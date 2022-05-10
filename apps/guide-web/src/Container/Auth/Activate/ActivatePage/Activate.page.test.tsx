import { mountWithTheme, waitForComponentToPaint } from '../../../../lib/jest';
import ActivateUserPage from '../../../../pages/auth/activate/confirm/[token]/index';

test('should render Change Email Confirm Page', () => {
  const query = { token: 'token' };
  const tree = <ActivateUserPage query={query} />;
  const wrapper = mountWithTheme(tree);

  const landingComponent = wrapper.find('ActivateUserComp');

  expect(landingComponent.length).toBe(1);

  waitForComponentToPaint(wrapper);
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

  const props = ActivateUserPage.getInitialProps(ctx);
  expect(props).toEqual({
    query: {
      token: 'token',
    },
  });
});
