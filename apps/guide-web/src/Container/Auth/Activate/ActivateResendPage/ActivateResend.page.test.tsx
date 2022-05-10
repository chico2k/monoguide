import { mountWithTheme, waitForComponentToPaint } from '../../../../lib/jest';
import ActivateResendPage from '../../../../pages/auth/activate/resend/index';

test('should render Change Email Confirm Page', () => {
  const tree = <ActivateResendPage />;
  const wrapper = mountWithTheme(tree);

  const landingComponent = wrapper.find('ActivateResendComp');

  expect(landingComponent.length).toBe(1);

  waitForComponentToPaint(wrapper);
});
