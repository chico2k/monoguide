import React from 'react';
import ErrorMessage from '..';
import { shallowWithTheme } from '../../../../../lib/jest';

describe('Component: Form: No Error', () => {
  let wrapper: any;

  beforeEach(() => {
    const initialProps = {
      errors: {},
      name: 'test_field',
      touched: {},
      status: {},
    };

    const tree = <ErrorMessage {...initialProps} />;

    wrapper = shallowWithTheme(tree);
  });

  test('Component: ErrorMessage: Not ErrorText', () => {
    const errorText = wrapper.find(`[data-test="errorText"]`);
    expect(errorText.length).toBe(1);
    expect(errorText.text()).toBe('');
  });
});

describe('Component: Form: Error from Formik', () => {
  let wrapper: any;

  beforeEach(() => {
    const initialProps = {
      errors: { test_field: 'Error Message', another_field: 'another_message' },
      name: 'test_field',
      touched: { test_field: true, another_field: true },
      status: {},
    };

    const tree = <ErrorMessage {...initialProps} />;

    wrapper = shallowWithTheme(tree);
  });

  test('Component: ErrorMessage: ErrorText', () => {
    const errorText = wrapper.find(`[data-test="errorText"]`);
    expect(errorText.length).toBe(1);
    expect(errorText.text()).toBe('Error Message');
  });
});

describe('Component: Form: Error from Server', () => {
  let wrapper: any;

  beforeEach(() => {
    const initialProps = {
      errors: {},
      name: 'test_field',
      touched: {},
      status: { test_field: 'Server Error Response' },
    };

    const tree = <ErrorMessage {...initialProps} />;

    wrapper = shallowWithTheme(tree);
  });

  test('Component: ErrorMessage: ErrorText', () => {
    const errorText = wrapper.find(`[data-test="errorText"]`);
    expect(errorText.length).toBe(1);
    expect(errorText.text()).toBe('Server Error Response');
  });
});

describe('Component: Form: Error from Server as Array', () => {
  let wrapper: any;

  beforeEach(() => {
    const initialProps = {
      errors: {},
      name: 'test_field',
      touched: {},
      status: {
        test_field: [
          'Server Error Response',
          'Second Server Error Response',
          'Third Server Error Response',
        ],
      },
    };

    const tree = <ErrorMessage {...initialProps} />;

    wrapper = shallowWithTheme(tree);
  });

  test('Component: ErrorMessage: ErrorText', () => {
    const errorText = wrapper.find(`[data-test="errorText"]`);
    expect(errorText.length).toBe(3);

    expect(errorText.at(0).text()).toBe('Server Error Response');
    expect(errorText.at(1).text()).toBe('Second Server Error Response');
    expect(errorText.at(2).text()).toBe('Third Server Error Response');
  });
});
