import { Logger } from '@sportsguide/lib';
import type { Image } from '@prisma/client';
import prismaClient from '../../lib/prisma';
import { LocationDatabase } from '../Location';
import type { IImageDatabase, IImageWithLocation } from '.';
import type { ILocationMapBox } from '../Location';
import type { IUpdateImageWithUrlInput } from './types';

export class ImageDatabase implements IImageDatabase {
  createImage = async ({
    userId,
    origin,
    isProfileImage,
    location,
    caption,
    fileName
  }: {
    userId: string;
    origin: string;
    isProfileImage: boolean;
    caption?: string;
    location?: ILocationMapBox;
    fileName: string;
  }): Promise<IImageWithLocation> => {
    try {
      if (location) {
        const locationDatabase = new LocationDatabase();
        const newLocation = await locationDatabase.createLocation(
          userId,
          location
        );

        const image = await prismaClient.image.create({
          data: {
            userId,
            orderNumber: 1,
            origin,
            isProfileImage,
            locationId: newLocation.id,
            caption,
            fileName
          },
          include: { location: true }
        });

        return image;
      }
      const image = await prismaClient.image.create({
        data: {
          userId,
          orderNumber: 1,
          origin,
          isProfileImage,
          caption,
          fileName,
          location: undefined
        },
        include: { location: true }
      });
      return image;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  updateImageWithUrl = async ({
    imageId,
    url,
    blurBase64
  }: IUpdateImageWithUrlInput): Promise<boolean> => {
    try {
      await prismaClient.image.update({
        data: { url, blurBase64 },
        where: {
          id: imageId
        }
      });

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };

  getImageDetail = async (imageId: number): Promise<IImageWithLocation> => {
    try {
      const image = await prismaClient.image.findUnique({
        where: { id: imageId },
        include: { location: true }
      });
      if (!image) throw new Error('IMAGE_SERVICE_NOT_FOUND');
      return image;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  setExistingImageAsAvatar = async (
    imageId: number
  ): Promise<IImageWithLocation> => {
    try {
      return await prismaClient.image.update({
        where: {
          id: imageId
        },
        data: {
          isProfileImage: true
        },
        include: {
          location: true
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  getCurrentAvatarImages = async (userId: string): Promise<Image[]> => {
    try {
      return await prismaClient.image.findMany({
        where: {
          userId,
          isProfileImage: true
        }
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  };

  removeExistingAvatarImages = async (
    images: IImageWithLocation[] | Image[]
  ): Promise<boolean> => {
    try {
      await Promise.all(
        images.map((image: IImageWithLocation | Image) =>
          prismaClient.image.update({
            data: {
              isProfileImage: false
            },
            where: {
              id: image.id
            }
          })
        )
      );

      return true;
    } catch (error) {
      Logger.error(error);
      return false;
    }
  };
}
