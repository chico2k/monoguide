import type { ITagWithTagRef } from '@sportsguide/database';

export type IGetTagListOutput =
  | IGetTagListOutputSuccess
  | IGetTagListOutputFail;

export type IGetTagListOutputSuccess = {
  type: 'GetTagListSucess';
  data: {
    tag: ITagWithTagRef[];
  };
};
export type IGetTagListOutputFail = {
  type: 'GetTagListFail';
};

export type IGetTagCreateOutput =
  | IGetTagCreateOutputSuccess
  | IGetTagCreateOutputFail;

export type IGetTagCreateOutputSuccess = {
  type: 'GetTagCreateSucess';
  data: {
    tag: ITagWithTagRef;
  };
};
export type IGetTagCreateOutputFail = {
  type: 'GetTagCreateFail';
};
