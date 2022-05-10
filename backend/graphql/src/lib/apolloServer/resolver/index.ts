import { AvatarResolver } from '../../../domain/Avatar/resolver';
import { UploadResolverInput } from '../../../domain/Image/types';
import { ImageResolver } from '../../../domain/Image/resolver';
import { LocationResolver } from '../../../domain/Location/resolver';
import { TagResolver } from '../../../domain/Tag/resolver';
import { TagRefResolver } from '../../../domain/TagRef/resolver';
import { ReviewResolver } from '../../../domain/Review/resolver';
import { ReviewResponseResolver } from '../../../domain/ReviewResponse/resolver';
import { SportRefResolver } from '../../../domain/SportRef/resolver';
import { SportResolver } from '../../../domain/Sport/resolver';
import { UserResolver } from '../../../domain/User/resolver';
import { VitaResolver } from '../../../domain/Vita/resolver';

export const resolver = [
  UserResolver,
  SportResolver,
  SportRefResolver,
  ReviewResponseResolver,
  ReviewResolver,
  TagRefResolver,
  TagResolver,
  VitaResolver,
  LocationResolver,
  ImageResolver,
  UploadResolverInput,
  AvatarResolver
];
