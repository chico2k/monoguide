import CockpitComp from '..';
import { customFind, shallowWithTheme } from '../../../../../lib/jest';

test('should render Cockpit Component', () => {
  const tree = <CockpitComp />;
  const wrapper = shallowWithTheme(tree);

  const comp = customFind(wrapper, 'data-test', 'cockpit');
  expect(comp.length).toBe(1);

  const changeEmail = customFind(wrapper, 'data-test', 'change-email');
  expect(changeEmail.length).toBe(1);

  const changePassword = customFind(wrapper, 'data-test', 'change-password');
  expect(changePassword.length).toBe(1);
});
