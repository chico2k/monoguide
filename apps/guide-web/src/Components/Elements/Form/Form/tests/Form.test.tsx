import React from 'react';
import Form from '..';
import { shallowWithTheme, mountWithTheme } from '../../../../../lib/jest';

describe('Component: Form: No Error', () => {
  let wrapper: any;
  const mockSubmit = jest.fn();

  beforeEach(() => {
    const initialProps = {
      onSubmit: mockSubmit,
      name: 'form',
      status: {},
    };

    const tree = <Form {...initialProps} />;

    wrapper = shallowWithTheme(tree);
  });

  test('Component: Form: renders without error', () => {
    const form = wrapper.find(`[data-test="form"]`);
    expect(form.length).toBe(1);
  });

  test('Component: Form: fires submit function', () => {
    const form = wrapper.find(`[data-test="form"]`);
    form.simulate('submit');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
