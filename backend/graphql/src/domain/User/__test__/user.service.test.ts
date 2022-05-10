import { Container } from 'typedi';
import { ContainerInjection } from '../../../lib/ContainerInjection';
import { UserService } from '../service';

describe('User Service Unit Test', () => {
  let userService: UserService;

  beforeAll(() => {
    ContainerInjection.setupContainerInjection({ env: 'TESTING' });
  });

  it('should create the user service', async () => {
    userService = Container.get(UserService);

    expect(!!userService).toBe(true);
  });

  it('should get the user details', async () => {
    const response = await userService.getUserDetailService('user_1', 'user_1');

    expect(response.type).toMatch('UserSuccessDetail');
  });

  it('should failed for unkown user', async () => {
    const response = await userService.getUserDetailService(
      'user_111',
      'user_1'
    );

    expect(response.type).toMatch('UserErrorUnexpected');
  });

  it('should get the user list', async () => {
    const response = await userService.getUserListService();

    expect(response.type).toMatch('UserSuccessList');
  });
});
