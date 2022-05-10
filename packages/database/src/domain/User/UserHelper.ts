import slug from 'limax';
import { v4 } from 'uuid';

/**
 * Helper Function for the Database User
 */
class UserHelper {
  /**
   * Generates a initial username based on a provided name
   * @param name
   * @returns a initial username
   */
  static createInitialUsername = (
    firstName: string,
    lastName: string
  ): string => {
    const newUuid = v4();
    const slugName = slug(`${firstName} ${lastName}`);

    return `${slugName}-${newUuid.split('-')[0]}`;
  };
}
export { UserHelper };
