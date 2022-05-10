import type { Vita } from '@prisma/client';

export interface IVitaDatabase {
  getVitaDetail: (vitaId: number) => Promise<Vita | null>;
  getVitaList: (userId: string) => Promise<Vita[]>;
  deleteVita: (vitaId: number) => Promise<boolean>;

  createVita: ({
    userId,
    title,
    text,
    fromDate,
    toDate,
    isCurrent
  }: IVitaCreateInput) => Promise<Vita>;

  updateVita: ({
    id,
    userId,
    title,
    text,
    fromDate,
    toDate,
    isCurrent
  }: IVitaUpdateInput) => Promise<Vita>;
}

export interface IVitaUpdateInput {
  userId: string;
  title: string;
  text: string;
  fromDate: Date;
  toDate: Date | null;
  isCurrent: boolean;
  id: number;
}
export interface IVitaCreateInput {
  userId: string;
  title: string;
  text: string;
  fromDate: Date;
  toDate: Date | null;
  isCurrent: boolean;
}
