import type { SportRef } from '@prisma/client';

export interface ISportRefDatabase {
  getSportRefUser: (userId: string) => Promise<SportRef[]>;
}
