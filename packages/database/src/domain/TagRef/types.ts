import type { TagRef } from '@prisma/client';

export interface ITagRefDatabase {
  createTag: ({ text }: { text: string }) => Promise<TagRef>;

  getTagList: () => Promise<TagRef[]>;
}
