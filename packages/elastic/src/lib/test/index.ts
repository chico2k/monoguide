/* eslint-disable no-promise-executor-return */
import type { IUserDetailOutput } from '../../types/user';

class TestingHelper {
  /**
   * Wait for some moments to be resolved
   * Mainly useful for tests with elasticsearch for back-to-back requests
   *
   * @param seconds Optional
   * @returns
   */
  static wait = async (seconds?: number) => {
    const waitFor = seconds || 1500;

    return new Promise((r) => setTimeout(r, waitFor));
  };

  static transformDetailResponseToUser = (response: IUserDetailOutput) => {
    if (response.type === 'UserDetailError') throw new Error(response.type);
    if (response.output.hits.hits.length < 1) throw new Error('No User Data');
    if (!response.output.hits.hits[0]._source) throw new Error('No User Data');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return response.output.hits.hits[0]._source!;
  };
}

export { TestingHelper };
