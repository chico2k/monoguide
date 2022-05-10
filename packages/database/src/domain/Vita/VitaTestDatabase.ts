import { produce } from 'immer';
import { datatype } from 'faker';
import type { Vita } from '@prisma/client';
import type {
  IVitaDatabase,
  IVitaUpdateInput,
  IVitaCreateInput
} from './types';

export class VitaTestDatabase implements IVitaDatabase {
  vita: Vita[] = [];

  getVita = () => this.vita;

  updateVita = async ({
    id,
    userId,
    title,
    text,
    fromDate,
    toDate,
    isCurrent
  }: IVitaUpdateInput): Promise<Vita> => {
    const index = this.vita.findIndex((vita) => vita.id === id);

    console.log('IVitaUpdateInput', userId);

    const vitaInput = {
      id,
      userId,
      title,
      text,
      fromDate,
      toDate,
      isCurrent,
      isPublished: true
    };

    this.vita = produce(this.vita, (draft) => {
      draft[index] = { ...draft[index], ...vitaInput };
    });

    return this.vita[index];
  };

  createVita = async ({
    userId,
    title,
    text,
    fromDate,
    toDate,
    isCurrent
  }: IVitaCreateInput): Promise<Vita> => {
    const vitaInput = {
      id: datatype.number(9999),
      userId,
      title,
      text,
      fromDate,
      toDate,
      isCurrent,
      isPublished: true
    };

    const timeStamps = {
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.vita = produce(this.vita, (draft) => {
      draft.push({ ...vitaInput, ...timeStamps });
    });
    return { ...vitaInput, ...timeStamps };
  };

  getVitaDetail = async (vitaId: number): Promise<Vita | null> =>
    this.vita.filter((vita) => vita.id === vitaId)[0];

  getVitaList = async (userId: string): Promise<Vita[]> =>
    this.vita.filter((vita) => vita.userId === userId);

  deleteVita = async (vitaId: number): Promise<boolean> => {
    const index = this.vita.findIndex((vita) => vita.id === vitaId);
    if (index === -1) return false;

    this.vita = produce(this.vita, (draft) => {
      if (index !== -1) draft.splice(index, 1);
    });

    return true;
  };
}
