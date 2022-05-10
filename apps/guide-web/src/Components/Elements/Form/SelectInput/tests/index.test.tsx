import React from 'react';
import { Formik } from 'formik';
import SelectInput from '..';
import {
  mountWithTheme,
  waitForComponentToPaint,
} from '../../../../../lib/jest';

describe('Component: SelectInput', () => {
  let wrapper: any;
  const options = [
    { value: '1', label: 'option1' },
    { value: '2', label: 'option2' },
  ];

  const initialProps = {
    name: 'fieldName',
    label: 'fieldLabel',
    onChange: jest.fn(),
    options,
  };

  beforeEach(() => {
    const tree = (
      <Formik initialValues={{ fieldName: '' }} onSubmit={jest.fn()}>
        {() => {
          return <SelectInput {...initialProps} />;
        }}
      </Formik>
    );

    wrapper = mountWithTheme(tree, []);
  });

  test('should render successfully', () => {
    const label = wrapper.find(`[data-test="label"]`).first();
    expect(label.text()).toBe(initialProps.label);

    const selectInputField = wrapper
      .find(`[data-test="selectInputField"]`)
      .first();
    expect(selectInputField.length).toBe(1);

    const selectInputError = wrapper
      .find(`[data-test="selectInputError"]`)
      .first();
    expect(selectInputError.length).toBe(1);

    const errorText = wrapper.find(`[data-test="errorText"]`).first();
    expect(errorText.text()).toBe('');
  });

  test('should change value', async () => {
    const selectInputField = wrapper.find('input').first();

    selectInputField.simulate('change', {
      persist: () => {},
      target: { name: 'fieldName', value: options[0].value },
    });
    selectInputField.simulate('keyDown', { keyCode: 9, key: 'Tab' });

    await waitForComponentToPaint(wrapper);
  });
});
