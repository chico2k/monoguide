import type { Image, Location } from '@prisma/client';
import { produce } from 'immer';
import type { IImageDatabase, IImageWithLocation } from '.';

import { LocationTestDatabase } from '../Location';
import type { IImageCreateInput, IUpdateImageWithUrlInput } from './types';
import { ImageTestFactory } from './ImageTestFactory';

class ImageTestDatabase implements IImageDatabase {
  images: IImageWithLocation[] = [];

  locationDatabase: LocationTestDatabase;

  imageTestFactory = new ImageTestFactory();

  constructor() {
    this.locationDatabase = new LocationTestDatabase();
  }

  getImages = () => this.images;

  createImage = async ({
    userId,
    origin,
    isProfileImage,
    location,
    caption,
    fileName
  }: IImageCreateInput): Promise<IImageWithLocation> => {
    let newLocation: Location | null = null;

    if (location) {
      newLocation = await this.locationDatabase.createLocation(
        userId,
        location
      );
    }

    const newImageData = this.imageTestFactory.getImageDate({
      userId,
      origin,
      isProfileImage,
      location,
      caption,
      fileName
    });

    const locationId = newLocation ? newLocation.id : null;

    const newImage = { ...newImageData, locationId, location: newLocation };

    this.images = produce(this.images, (draft) => {
      draft.push(newImage);
    });

    return newImage;
  };

  updateImageWithUrl = async ({
    imageId,
    url,
    blurBase64
  }: IUpdateImageWithUrlInput): Promise<boolean> => {
    const index = this.images.findIndex((image) => image.id === imageId);
    if (index === -1) return false;

    this.images = produce(this.images, (draft) => {
      draft[index].url = url;
      draft[index].blurBase64 = blurBase64;
    });
    return true;
  };

  getImageDetail = async (imageId: number): Promise<IImageWithLocation> => {
    const index = this.images.findIndex((image) => image.id === imageId);
    return this.images[index];
  };

  setExistingImageAsAvatar = async (
    imageId: number
  ): Promise<IImageWithLocation> => {
    const index = this.images.findIndex((image) => image.id === imageId);
    this.images = produce(this.images, (draft) => {
      draft[index].isProfileImage = true;
    });

    return this.images[index];
  };

  getCurrentAvatarImages = async (userId: string): Promise<Image[]> =>
    this.images.filter(
      (image) => image.userId === userId && image.isProfileImage === true
    );

  removeExistingAvatarImages = async (
    images: IImageWithLocation[] | Image[]
  ): Promise<boolean> => {
    images.map((inputImage) => {
      const index = this.images.findIndex(
        (image) => image.id === inputImage.id
      );
      this.images = produce(this.images, (draft) => {
        draft[index].isProfileImage = false;
      });
      return this.images;
    });
    return true;
  };
}
export { ImageTestDatabase };
