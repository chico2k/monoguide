import type { IVitaCreateInput, IVitaUpdateInput } from '@sportsguide/database';
import { Length, IsInt } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import type { Vita } from '@prisma/client';

@InputType()
export class CreateVitaInput implements Omit<IVitaCreateInput, 'userId'> {
  @Field()
  @Length(1, 120)
  text: string;

  @Field()
  @Length(1, 4000)
  title: string;

  @Field(() => Date)
  fromDate: Date;

  @Field(() => Date)
  toDate: Date | null;

  @Field()
  isCurrent: boolean;
}

@InputType()
export class UpdateVitaInput implements Omit<IVitaUpdateInput, 'userId'> {
  @Field()
  @IsInt()
  id: number;

  @Field()
  @Length(1, 120)
  text: string;

  @Field()
  @Length(1, 4000)
  title: string;

  @Field(() => Date)
  fromDate: Date;

  @Field(() => Date)
  toDate: Date | null;

  @Field()
  isCurrent: boolean;
}

export type ICreateVitaSuccess = {
  type: 'CreateVitaSuccess';
  data: {
    vita: Vita;
  };
};
export type ICreateVitaFailed = {
  type: 'CreateVitaFailed';
};
export type ICreateVitaOutput = ICreateVitaSuccess | ICreateVitaFailed;

export type IUpdateVitaSuccess = {
  type: 'UpdateVitaSuccess';
  data: {
    vita: Vita;
  };
};

export type IUpdateVitaFailed = {
  type: 'UpdateVitaFailed';
};

export type IUpdateVitaOutput = IUpdateVitaSuccess | IUpdateVitaFailed;
