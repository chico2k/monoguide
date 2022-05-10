import type {
  IImageWithLocation,
  ISportWithSportRef,
  ITagWithTagRef
} from '@sportsguide/database';
import type { User, Location, Vita, ReviewMeta } from '@prisma/client';
import type {
  IUserElasticLocation,
  IUserElasticSport,
  IUserElasticUser,
  IUserElasticTag,
  IUserReviewMeta,
  IUserAvatar,
  IUserElasticVita
} from '../types/user';

/**
 * Mapps the User related Models to the Elastic User Index
 */
class UserMapper {
  /**
   * Maps a User Database Object to the User Index
   *
   * @param userDatabase
   * @returns
   *
   */
  static mapUser = (userDatabase: User): IUserElasticUser => ({
    isGuide: userDatabase.isGuide,
    isBlacklisted: userDatabase.isBlacklisted,
    username: userDatabase.username,
    id: userDatabase.id,
    createdAt: userDatabase.createdAt,
    firstName: userDatabase.firstName,
    lastName: userDatabase.lastName
  });

  /**
   * Maps the Sport Database Object to the Index Mapping for Sport
   *
   * @param sport
   * @returns  a valid sport object for IUserElasticSport
   */
  static mapSport = (sport: ISportWithSportRef): IUserElasticSport => ({
    level: sport.level,
    createdAt: sport.createdAt,
    id: sport.id,
    sportRef: {
      id: sport.sportRef.id,
      title: sport.sportRef.title
    }
  });

  /**
   * Maps the Location Database Object to the Index Mapping for Location
   *
   * @param location
   * @returnsa valid Location object for IUserElasticSport
   */
  static mapLocation = (location: Location): IUserElasticLocation => ({
    id: location.id,
    mapboxId: location.mapboxId,
    placeName: location.placeName,
    placeType: location.placeType,
    regionId: location.regionId,
    regionText: location.regionText,
    regionWikidata: location.regionWikidata,
    regionShortcode: location.regionShortcode,
    countryId: location.countryId,
    countryText: location.countryText,
    countryWikidata: location.countryWikidata,
    countryShortcode: location.countryShortcode,
    postcodeId: location.postcodeId,
    postcodeText: location.postcodeText,
    placeId: location.placeId,
    placeWikidata: location.placeWikidata,
    text: location.text,
    coordinates: location.coordinates
  });

  /**
   * Maps the Tag Database Object to the Index Mapping for Tag
   *
   * @param tag
   * @returns valid Tag object for IUserElasticTag
   */
  static mapTag = (tag: ITagWithTagRef): IUserElasticTag => ({
    id: tag.id,
    tagRef: {
      text: tag.tagRef.text,
      id: tag.tagRef.id
    }
  });

  /**
   *  Maps the Image Database Object to the Index Mapping for Avatar
   *
   * @param image
   * @returns valid Tag object for IUserAvatar
   */
  static mapAvatar = (image: IImageWithLocation): IUserAvatar => ({
    url: image.url,
    blurBase64: image.blurBase64
  });

  /**
   * Maps the Review Meta Database Object to the Index Mapping for Review Meta
   *
   * @param reviewMeta
   * @returns valid Review Meta object for IUserReviewMeta
   */
  static mapReviewMeta = (reviewMeta: ReviewMeta): IUserReviewMeta => ({
    averageRating: reviewMeta.averageRating,
    numberRating: reviewMeta.numberRating
  });

  /**
   * Maps the Vita Database Object to the Index Mapping for Vita
   *
   * @param vita
   * @returns valid Vita object for IUserElasticVita
   */
  static mapVita = (vita: Vita): IUserElasticVita => ({
    fromDate: vita.fromDate,
    toDate: vita.toDate,
    isPublished: vita.isPublished,
    id: vita.id,
    title: vita.title,
    text: vita.text,
    isCurrent: vita.isCurrent
  });
}

export { UserMapper };
