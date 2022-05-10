import { MODAL_COMPONENTS } from '../index';

describe('Should be an object', () => {
  test('correct structure', () => {
    Object.keys(MODAL_COMPONENTS).map((key) => {
      const keys = Object.keys(MODAL_COMPONENTS[key]);
      expect(keys).toContain('component');

      Object.keys(MODAL_COMPONENTS[key]).map((item) => {
        const component = MODAL_COMPONENTS[key][item];
        expect(typeof component).toBe('function');
      });
    });
  });
});
