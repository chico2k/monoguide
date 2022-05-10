import PasswordConfirmComp from '../index';
import { customFind, shallowWithTheme } from '../../../../../../lib/jest';

test('should render Password Confirm Component', () => {
  const token = 'token';
  const tree = <PasswordConfirmComp token={token} />;
  const wrapper = shallowWithTheme(tree);

  const comp = customFind(wrapper, 'data-test', 'reset-password-confirm');
  const form = customFind(wrapper, 'data-test', 'reset-password-confirm-form');

  expect(comp.length).toBe(1);
  expect(form.length).toBe(1);
});
