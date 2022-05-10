import type { SportRef } from '@prisma/client';

export type IGetSportRefListOutput =
  | IGetSportRefListFail
  | IGetSportRefListSuccess;

type IGetSportRefListFail = {
  type: 'GetSportRefFail';
};
type IGetSportRefListSuccess = {
  type: 'GetSportRefSuccess';
  data: {
    sportRef: SportRef[];
  };
};
