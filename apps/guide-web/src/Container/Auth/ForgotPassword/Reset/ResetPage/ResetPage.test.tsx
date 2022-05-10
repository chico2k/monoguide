import ResetPasswordPage from '../../../../../pages/auth/reset-password';
import { shallowWithTheme } from '../../../../../lib/jest';

test('should render Reset Password Page', () => {
  const tree = <ResetPasswordPage />;
  const wrapper = shallowWithTheme(tree);

  const landingComponent = wrapper.find('PasswordResetComp');

  expect(landingComponent.length).toBe(1);
});
