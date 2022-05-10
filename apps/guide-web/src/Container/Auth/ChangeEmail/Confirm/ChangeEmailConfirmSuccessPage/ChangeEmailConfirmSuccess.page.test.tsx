import EmailChangeSuccessPage from '../../../../../pages/auth/change-email/success';
import { mountWithTheme } from '../../../../../lib/jest';

describe('Email Change Success Page', () => {
  test('should render correctly', () => {
    const tree = <EmailChangeSuccessPage />;
    const wrapper = mountWithTheme(tree);

    const comp = wrapper.find('ChangeEmailConfirmSuccess');

    expect(comp.length).toBe(1);
  });
});
