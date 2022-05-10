import { Prisma, Image } from '@prisma/client';
import type { ILocationMapBox } from '../Location/types';

const imageWithLocation = Prisma.validator<Prisma.ImageArgs>()({
  include: { location: true }
});

export type IImageWithLocation = Prisma.ImageGetPayload<
  typeof imageWithLocation
>;

export interface IImageDatabase {
  createImage: ({
    userId,
    origin,
    isProfileImage,
    location,
    caption,
    fileName
  }: IImageCreateInput) => Promise<IImageWithLocation>;

  updateImageWithUrl: ({
    imageId,
    url,
    blurBase64
  }: IUpdateImageWithUrlInput) => Promise<boolean>;

  getImageDetail: (imageId: number) => Promise<IImageWithLocation>;

  setExistingImageAsAvatar: (imageId: number) => Promise<IImageWithLocation>;

  getCurrentAvatarImages: (userId: string) => Promise<Image[]>;

  removeExistingAvatarImages: (
    images: IImageWithLocation[] | Image[]
  ) => Promise<boolean>;
}

export interface IImageCreateInput {
  userId: string;
  origin: string;
  isProfileImage: boolean;
  caption?: string;
  location?: ILocationMapBox;
  fileName: string;
}
export interface IUpdateImageWithUrlInput {
  imageId: number;
  url: string;
  blurBase64: string;
}
