import React from 'react';
import { shallow } from 'src/Container/Auth/Login/LoginForm/test/node_modules/enzyme';
import Button from '..';
import { findByAttr } from '../../../../../lib/jest';

const setup = (p = {}) => {
  const component = <Button {...p} />;
  const wrapper = shallow(component);
  wrapper.setProps(p);
  return wrapper;
};

describe('Button renders correct', () => {
  let wrapper: any;

  const mockSubmit = jest.fn();

  beforeEach(() => {
    const initialProps = {
      type: 'submit',
      onClick: mockSubmit,
    };

    wrapper = setup(initialProps);
  });

  test('Button renders without error', () => {
    const button = findByAttr(wrapper, 'button');
    expect(button.length).toBe(1);
  });

  test('Button fires submit function', () => {
    const button = findByAttr(wrapper, 'button');
    button.simulate('click');
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  test('Button type is submit ', () => {
    const button = findByAttr(wrapper, 'button');
    const props = button.props();
    expect(props.type).toBe('submit');
  });
});
