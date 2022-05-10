import ResetComp from '..';
import { customFind, shallowWithTheme } from '../../../../../../lib/jest';

test('should render ResetComp', () => {
  const tree = <ResetComp />;
  const wrapper = shallowWithTheme(tree);

  const comp = customFind(wrapper, 'data-test', 'password-reset');
  const form = customFind(wrapper, 'data-test', 'password-reset-form');

  expect(comp.length).toBe(1);
  expect(form.length).toBe(1);
});
