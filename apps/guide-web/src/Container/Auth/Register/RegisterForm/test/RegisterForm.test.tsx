import { ReactWrapper } from 'src/Components/Elements/Form/Button/tests/node_modules/enzyme';
import React from 'react';
import RegisterFrom from '..';
import {
  mountWithTheme,
  customFind,
  waitForComponentToPaint,
} from '../../../../../lib/jest';

import * as errorHandler from '../../../../../lib/helpers/errorHandler';
import { RegisterDocument } from '../../../../../generated/graphql';

describe('RegisterFrom ', () => {
  let wrapper: ReactWrapper;
  let tree: React.ReactNode;

  test('should render correctly', () => {
    tree = <RegisterFrom />;
    wrapper = mountWithTheme(tree);

    const form = wrapper.find('form').first();
    const button = wrapper.find('button').first();
    const spinner = wrapper.find('Spinner');

    expect(form.length).toBe(1);
    expect(button.length).toBe(1);
    expect(spinner.length).toBe(0);
  });

  test('should submit correctly', async () => {
    let registerCalled = false;

    const first_name = 'John';
    const last_name = 'Doe';
    const email = 'doe@domain.com';
    const password = 'NewPassword01!';

    const mocks = [
      {
        request: {
          query: RegisterDocument,
          variables: {
            data: {
              first_name,
              last_name,
              email,
              password,
            },
          },
        },
        result: () => {
          registerCalled = true;

          return {
            data: {
              register: true,
            },
          };
        },
      },
    ];

    tree = <RegisterFrom />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const first_name_input = customFind(
      wrapper.find('Input'),
      'name',
      'first_name'
    ).first();
    first_name_input.simulate('change', {
      persist: () => {},
      target: { name: 'first_name', value: first_name },
    });
    first_name_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const last_name_input = customFind(
      wrapper.find('Input'),
      'name',
      'last_name'
    ).first();
    last_name_input.simulate('change', {
      persist: () => {},
      target: { name: 'last_name', value: last_name },
    });
    last_name_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const email_input = customFind(
      wrapper.find('Input'),
      'name',
      'email'
    ).first();
    email_input.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: email },
    });
    email_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const password_input = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();
    password_input.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    password_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    expect(registerCalled).toBe(true);
  });

  test('should submit fail', async () => {
    const errorSpy = jest.spyOn(errorHandler, 'errorHandler');
    const first_name = 'John';
    const last_name = 'Doe';
    const email = 'doe@domain.com';
    const password = 'NewPassword01!';

    const mocks = [
      {
        request: {
          query: RegisterDocument,
          variables: {
            data: {
              first_name,
              last_name,
              email,
              password,
            },
          },
        },
        error: new Error('Error'),
      },
    ];

    tree = <RegisterFrom />;
    wrapper = mountWithTheme(tree, mocks);

    const form = wrapper.find('form').first();

    const first_name_input = customFind(
      wrapper.find('Input'),
      'name',
      'first_name'
    ).first();
    first_name_input.simulate('change', {
      persist: () => {},
      target: { name: 'first_name', value: first_name },
    });
    first_name_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const last_name_input = customFind(
      wrapper.find('Input'),
      'name',
      'last_name'
    ).first();
    last_name_input.simulate('change', {
      persist: () => {},
      target: { name: 'last_name', value: last_name },
    });
    last_name_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const email_input = customFind(
      wrapper.find('Input'),
      'name',
      'email'
    ).first();
    email_input.simulate('change', {
      persist: () => {},
      target: { name: 'email', value: email },
    });
    email_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    const password_input = customFind(
      wrapper.find('Input'),
      'name',
      'password'
    ).first();
    password_input.simulate('change', {
      persist: () => {},
      target: { name: 'password', value: password },
    });
    password_input.simulate('blur');
    await waitForComponentToPaint(wrapper, 30);

    form.simulate('submit');
    await waitForComponentToPaint(wrapper, 120);

    expect(errorSpy).toBeCalled();
  });
});
