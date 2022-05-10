import ResetSuccessComp from '..';
import { customFind, shallowWithTheme } from '../../../../../../lib/jest';

test('should render ResetSuccessComp', () => {
  const tree = <ResetSuccessComp />;
  const wrapper = shallowWithTheme(tree);

  const comp = customFind(wrapper, 'data-test', 'reset-success');

  expect(comp.length).toBe(1);
});
