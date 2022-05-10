import { customFind, shallowWithTheme } from '../../../../../lib/jest';
import ActivateResendSuccessComp from '..';

test('should render Activate Resend Success Comp', () => {
  const tree = <ActivateResendSuccessComp />;
  const wrapper = shallowWithTheme(tree);

  const comp = customFind(wrapper, 'data-test', 'activate-resend-success');
  expect(comp.length).toBe(1);
});
