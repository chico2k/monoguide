import ResetPasswordSuccessPage from '../../../../../pages/auth/reset-password/success';
import { shallowWithTheme } from '../../../../../lib/jest';

test('should render Reset Password Page', () => {
  const tree = <ResetPasswordSuccessPage />;
  const wrapper = shallowWithTheme(tree);

  const landingComponent = wrapper.find('ResetSuccessComp');

  expect(landingComponent.length).toBe(1);
});
