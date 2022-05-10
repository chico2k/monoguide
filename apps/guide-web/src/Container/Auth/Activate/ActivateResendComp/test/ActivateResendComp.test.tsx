import { customFind, shallowWithTheme } from '../../../../../lib/jest';
import ActivateResendComp from '..';

test('should render Cockpit Component', () => {
  const tree = <ActivateResendComp />;
  const wrapper = shallowWithTheme(tree);

  const comp = customFind(wrapper, 'data-test', 'activate-resend');
  expect(comp.length).toBe(1);

  const changeEmail = wrapper.find('ActivateResendForm');
  expect(changeEmail.length).toBe(1);
});
