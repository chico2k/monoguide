import React from 'react';
import Label from '..';
import { shallowWithTheme } from '../../../../../lib/jest';

describe('Component: Label: No Error', () => {
  let wrapper: any;

  beforeEach(() => {
    const initialProps = {};

    const tree = <Label {...initialProps} />;

    wrapper = shallowWithTheme(tree);
  });

  test('should render without error', () => {
    const form = wrapper.find(`[data-test="label"]`);
    expect(form.length).toBe(1);
  });
});
