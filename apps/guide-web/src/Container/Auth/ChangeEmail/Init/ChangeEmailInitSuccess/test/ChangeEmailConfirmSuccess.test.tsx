import ChangeEmailConfirmSuccess from '..';
import { shallowWithTheme, customFind } from '../../../../../../lib/jest';

describe('Change Email Confirm Success Component', () => {
  test('should render successfully', () => {
    const tree = <ChangeEmailConfirmSuccess />;
    const wrapper = shallowWithTheme(tree);

    const comp = customFind(
      wrapper,
      'data-test',
      'change-email-confirm-success'
    );
    expect(comp.length).toBe(1);
  });
});
