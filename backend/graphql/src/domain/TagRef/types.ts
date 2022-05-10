import type { TagRef } from '@prisma/client';

export type IGetTagListOutput =
  | IGetTagListOutputSuccess
  | IGetTagListOutputFail;

type IGetTagListOutputSuccess = {
  type: 'GetTagListSuccess';
  data: {
    tagRef: TagRef[];
  };
};

type IGetTagListOutputFail = {
  type: 'GetTagListFail';
};

export type ICreateTagOutput = ICreateTagSuccess | ICreateTagFail;

type ICreateTagSuccess = {
  type: 'CreateTagSuccess';
  data: {
    tagRef: TagRef;
  };
};

type ICreateTagFail = {
  type: 'CreateTagFail';
};
