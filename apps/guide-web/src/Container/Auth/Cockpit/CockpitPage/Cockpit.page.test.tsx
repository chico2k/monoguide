import CockpitPage from '../../../../pages/cockpit';
import { mountWithTheme } from '../../../../lib/jest';

test('should render CockpitPage', () => {
  const tree = <CockpitPage />;
  const wrapper = mountWithTheme(tree);

  const page = wrapper.find('CockpitComp');

  expect(page.length).toBe(1);
});
