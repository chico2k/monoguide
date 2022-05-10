import type { IImageWithLocation } from '@sportsguide/database';
import type { IImageElasticDocument } from '../types/image';

/**
 * The class holds the methods to meet the Index Strict requirement for Elastic Search
 */
export class ImageElasticMapper {
  /**
   * Transform an image from the database schema to the ElasticSearch Index
   *
   * @param imageDatabase
   * @returns An image which can be uploaded to Image Index of ElasticSearch
   */
  static mapImage = (
    imageDatabase: IImageWithLocation
  ): IImageElasticDocument => ({
    id: imageDatabase.id,
    user_id: imageDatabase.userId,
    orderNumber: imageDatabase.orderNumber,
    caption: imageDatabase.caption,
    isProfileImage: imageDatabase.isProfileImage,
    origin: imageDatabase.origin,
    url: imageDatabase.url,
    blurBase64: imageDatabase.blurBase64,
    fileName: imageDatabase.fileName,
    createdAt: imageDatabase.createdAt,

    location: imageDatabase.location
      ? {
          id: imageDatabase.location.id,
          mapboxId: imageDatabase.location.mapboxId,
          placeName: imageDatabase.location.placeName,
          placeType: imageDatabase.location.placeType,
          coordinates: imageDatabase.location.coordinates,
          text: imageDatabase.location.text,
          regionId: imageDatabase.location.regionId,
          regionText: imageDatabase.location.regionText,
          regionWikidata: imageDatabase.location.regionWikidata,
          regionShortcode: imageDatabase.location.regionShortcode,
          countryId: imageDatabase.location.countryId,
          countryText: imageDatabase.location.countryText,
          countryWikidata: imageDatabase.location.countryWikidata,
          countryShortcode: imageDatabase.location.countryShortcode,
          postcodeId: imageDatabase.location.postcodeId,
          postcodeText: imageDatabase.location.postcodeText,
          placeId: imageDatabase.location.placeId,
          placeWikidata: imageDatabase.location.placeWikidata,
          placeText: imageDatabase.location.placeText
        }
      : undefined
  });
}
