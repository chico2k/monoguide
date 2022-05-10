import type { IVerfiySessionSuccess, IContextHelper } from '@sportsguide/auth';

export type IContext = {
  auth: IVerfiySessionSuccess & IContextHelper;
};
