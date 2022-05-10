import type { ISportWithSportRef } from '@sportsguide/database';
import { IsInt, Min, Max } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class SportInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(3)
  level: number;

  @Field(() => Int)
  sportRefId: number;
}

@InputType()
export class SportUpdateInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(3)
  level: number;

  @Field(() => Int)
  sportId: number;
}

export type IErrorSportExist = {
  type: 'SportAlreadyExist';
};
export type IErrorSportNotOwner = {
  type: 'SportNotOwner';
};

export type IErrorSportUnexpectedError = {
  type: 'SportUnexpectedError';
};

export type ISportCreateSuccess = {
  type: 'SportCreateSuccess';
  sport: ISportWithSportRef;
};

export type ISportCreate =
  | IErrorSportExist
  | ISportCreateSuccess
  | IErrorSportUnexpectedError;

export type ISportDeleteSuccess = {
  type: 'SportDeleteSuccess';
};

export type ISportDelete =
  | ISportDeleteSuccess
  | IErrorSportNotOwner
  | IErrorSportUnexpectedError;

export type ISportDetailSuccess = {
  type: 'SportDetailSuccess';
  sport: ISportWithSportRef;
};

export type ISportDetail =
  | ISportDetailSuccess
  | IErrorSportUnexpectedError
  | IErrorSportNotOwner;

export type ISportUpdateSuccess = {
  type: 'SportUpdateSuccess';
  sport: ISportWithSportRef;
};

export type ISportUpdate =
  | ISportUpdateSuccess
  | IErrorSportUnexpectedError
  | IErrorSportNotOwner;
