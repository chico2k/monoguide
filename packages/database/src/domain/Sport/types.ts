import { Prisma } from '@prisma/client';

export interface ISportDatabase {
  createSport: ({
    level,
    sportRefId,
    userId
  }: {
    level: number;
    sportRefId: number;
    userId: string;
  }) => Promise<ISportWithSportRef>;

  getSportDetail: (sportId: number) => Promise<ISportWithSportRef | null>;

  deleteSport: (sportId: number) => Promise<boolean>;

  checkSportExists: ({
    sportRefId,
    userId
  }: {
    sportRefId: number;
    userId: string;
  }) => Promise<boolean>;

  updateSport: ({
    sportId,
    level
  }: {
    level: number;
    sportId: number;
  }) => Promise<ISportWithSportRef>;
}

const sportWithSportRef = Prisma.validator<Prisma.SportArgs>()({
  include: { sportRef: true }
});
export type ISportWithSportRef = Prisma.SportGetPayload<
  typeof sportWithSportRef
>;
