import RegisterSuccess from '..';
import { customFind, shallowWithTheme } from '../../../../../lib/jest';

test('should render RegisterSuccess', () => {
  const tree = <RegisterSuccess />;
  const wrapper = shallowWithTheme(tree);

  const landingComponent = customFind(wrapper, 'data-test', 'register-success');

  expect(landingComponent.length).toBe(1);
});
