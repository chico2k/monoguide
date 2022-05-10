import { Int, Field, ObjectType } from 'type-graphql';
import Location from '../Location/graph';

/**
 * The Image Class for e.g. profile or review images
 */
@ObjectType('Image')
class Image {
  /**
   * All required methods for interacting with the database
   */

  /**
   * The ID of the Image
   */
  @Field(() => Int)
  id: number;

  /**
   * The URL of the Image
   */
  @Field(() => String, { nullable: true })
  url: string;

  /**
   * The URL of the Image
   */
  @Field(() => String, { nullable: true })
  blurBase64: string;

  /**
   * The FileName of the Imagew
   */
  @Field(() => String, { nullable: true })
  fileName: string;

  /**
   * The caption of the Image
   */
  @Field(() => String, { nullable: true })
  caption: string;

  /**
   * The order number in the gallery
   */
  @Field(() => Int)
  orderNumber: number;

  /**
   * The origin of the image e.g. Gallery or Review
   */
  @Field(() => String)
  origin: string;

  /**
   * The location object of the image
   * @link {Location}
   */
  @Field(() => Location, { nullable: true })
  location?: Location;

  /**
   * Indicates if the image is profile image
   */
  @Field(() => Boolean)
  isProfileImage: boolean;
}

export { Image };
export default Image;
