import { Prisma } from '@prisma/client';

export interface ITagDatabase {
  createTag: ({
    userId,
    tagRefId
  }: {
    tagRefId: number;
    userId: string;
  }) => Promise<ITagWithTagRef>;

  checkTagExists: (userId: string, tagRefId: number) => Promise<boolean>;
  getTagDetail: (tagId: number) => Promise<ITagWithTagRef>;
  getTagList: ({ userId }: { userId: string }) => Promise<ITagWithTagRef[]>;
  deleteTag: (tagId: number) => Promise<boolean>;
}

const userTagWithTag = Prisma.validator<Prisma.TagArgs>()({
  include: { tagRef: true }
});
export type ITagWithTagRef = Prisma.TagGetPayload<typeof userTagWithTag>;

export interface ICreateTagInput {
  tagRefId: number;
  userId: string;
}
