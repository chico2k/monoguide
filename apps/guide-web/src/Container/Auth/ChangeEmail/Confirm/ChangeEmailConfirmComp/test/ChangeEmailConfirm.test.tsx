import ChangeEmail from '..';
import {
  mountWithTheme,
  waitForComponentToPaint,
} from '../../../../../../lib/jest';
import { ChangeEmailConfirmDocument } from '../../../../../../generated/graphql';

describe('should submit correctly', () => {
  let wrapper: any;
  let mutationCalled: boolean;
  let tree: React.ReactNode;
  const token = 'token';

  beforeEach(() => {
    mutationCalled = false;
    tree = <ChangeEmail token={token} />;
  });

  test('should submit without error', async () => {
    const mocks = [
      {
        request: {
          query: ChangeEmailConfirmDocument,
          variables: { token },
        },
        result: () => {
          mutationCalled = true;
          return { data: { changeEmailConfirm: true } };
        },
      },
    ];

    wrapper = mountWithTheme(tree, mocks);
    await waitForComponentToPaint(wrapper);

    expect(mutationCalled).toBe(true);

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('Your Email has been changed successfully');
  });

  test('should submit without error', async () => {
    const mocks = [
      {
        request: {
          query: ChangeEmailConfirmDocument,
          variables: { token },
        },
        error: new Error('Error'),
      },
    ];

    wrapper = mountWithTheme(tree, mocks);
    await waitForComponentToPaint(wrapper);

    const h1 = wrapper.find('h1');
    expect(h1.text()).toBe('Something went wrong');
  });
});
