import ActivateUser from '..';
import {
  mountWithTheme,
  waitForComponentToPaint,
} from '../../../../../lib/jest';
import { ConfirmUserDocument } from '../../../../../generated/graphql';

describe('should submit correctly', () => {
  let wrapper: any;
  let mutationCalled: boolean;
  let tree: React.ReactNode;
  const token = 'token';

  beforeEach(() => {
    mutationCalled = false;
    tree = <ActivateUser token={token} />;
  });

  test('should submit without error', async () => {
    const mocks = [
      {
        request: {
          query: ConfirmUserDocument,
          variables: { token },
        },
        result: () => {
          mutationCalled = true;
          return { data: { confirmUser: true } };
        },
      },
    ];

    wrapper = mountWithTheme(tree, mocks);

    await waitForComponentToPaint(wrapper);

    expect(mutationCalled).toBe(true);

    const success = wrapper.find('[data-test="success"]');
    expect(success.length).toBe(1);

    const fail = wrapper.find('[data-test="fail"]');
    expect(fail.length).toBe(0);
  });

  test('should submit with error', async () => {
    const mocks = [
      {
        request: {
          query: ConfirmUserDocument,
          variables: { token },
        },
        error: new Error('Error'),
      },
    ];

    wrapper = mountWithTheme(tree, mocks);

    await waitForComponentToPaint(wrapper);

    const success = wrapper.find('[data-test="success"]');
    expect(success.length).toBe(0);

    const fail = wrapper.find('[data-test="fail"]');
    expect(fail.length).toBe(1);
  });
});
