import { AliasHandler } from '../../AliasHandler';
import { IndexDeploy } from '../../IndexDeploy';

class CLIHandler {
  aliasHandler: AliasHandler;

  indexHandler: IndexDeploy;

  constructor() {
    this.aliasHandler = new AliasHandler();
    this.indexHandler = new IndexDeploy();
  }

  deleteIndexHandler = async ({
    all = false,
    index
  }: IDeleteHandlerInput): Promise<boolean> => {
    try {
      if (!all && !index) throw new Error('no all no index');

      if (all) {
        const unUsedAlias = await this.aliasHandler.getIndexWihtoutAlias();
        await this.indexHandler.deleteIndexBulk(unUsedAlias);
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };
}

export { CLIHandler };

export interface IDeleteHandlerInput {
  all?: boolean;
  index?: string;
}
