import { mountWithTheme, waitForComponentToPaint } from '../../../../lib/jest';
import ActivateResendSuccessPage from '../../../../pages/auth/activate/resend/success';

test('should render Change Email Confirm Page', () => {
  const tree = <ActivateResendSuccessPage />;
  const wrapper = mountWithTheme(tree);

  const landingComponent = wrapper.find('ActivateResendSuccessComp');

  expect(landingComponent.length).toBe(1);

  waitForComponentToPaint(wrapper);
});
