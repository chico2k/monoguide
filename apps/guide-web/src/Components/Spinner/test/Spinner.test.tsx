import React from 'react';
import Spinner from '..';
import { shallowWithTheme } from '../../../../lib/jest';

describe('Component: Spinner: No Error', () => {
  let wrapper: any;

  beforeEach(() => {
    const tree = <Spinner />;
    wrapper = shallowWithTheme(tree);
  });

  test('Component: Spinner: renders without error', () => {
    const form = wrapper.find(`[data-test="spinner"]`);
    expect(form.length).toBe(1);
  });
});
