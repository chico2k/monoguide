import type { Image } from '@prisma/client';
import { datatype } from 'faker';
import type { IImageCreateInput } from './types';

class ImageTestFactory {
  getImageDate = ({
    userId,
    origin,
    isProfileImage,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    location,
    caption,
    fileName
  }: IImageCreateInput): Image => {
    const creationDate = new Date();

    return {
      id: datatype.number(9999),
      userId,
      origin,
      isProfileImage,
      locationId: null,
      caption: caption as string,
      orderNumber: null,
      url: null,
      blurBase64: null,
      fileName,
      updatedAt: creationDate,
      createdAt: creationDate,
      isPublished: true
    };
  };
}

export { ImageTestFactory };
