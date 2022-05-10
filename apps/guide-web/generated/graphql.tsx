import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ActiveUserDetail = {
  __typename?: 'ActiveUserDetail';
  id: Scalars['String'];
  username: Scalars['String'];
};

export type Avatar = {
  __typename?: 'Avatar';
  blurBase64: Scalars['String'];
  url: Scalars['String'];
};

export type CreateVitaInput = {
  fromDate: Scalars['DateTime'];
  isCurrent: Scalars['Boolean'];
  text: Scalars['String'];
  title: Scalars['String'];
  toDate: Scalars['DateTime'];
};

export type Image = {
  __typename?: 'Image';
  blurBase64?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isProfileImage: Scalars['Boolean'];
  location?: Maybe<Location>;
  orderNumber: Scalars['Int'];
  origin: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type ImageElasticResponse = {
  __typename?: 'ImageElasticResponse';
  _shards: ImageShardsResponse;
  hits: ImageHits;
  pageInfo?: Maybe<ImagePageInfo>;
  timed_out: Scalars['Boolean'];
  took: Scalars['Float'];
};

export type ImageHits = {
  __typename?: 'ImageHits';
  hits?: Maybe<Array<ImageHits_Inner>>;
  max_score: Scalars['Float'];
  total: ImageTotal;
};

export type ImageHits_Inner = {
  __typename?: 'ImageHits_Inner';
  _id: Scalars['String'];
  _index: Scalars['String'];
  _score: Scalars['Float'];
  _source: Image;
  _type: Scalars['String'];
  _version: Scalars['Float'];
  matched_queries: Array<Scalars['String']>;
  sort: Array<Scalars['String']>;
};

export type ImagePageInfo = {
  __typename?: 'ImagePageInfo';
  cursor?: Maybe<Scalars['String']>;
  lastPage?: Maybe<Scalars['String']>;
  nextPage?: Maybe<Scalars['Boolean']>;
};

export type ImageShardsResponse = {
  __typename?: 'ImageShardsResponse';
  failed: Scalars['Float'];
  skipped: Scalars['Float'];
  successful: Scalars['Float'];
  total: Scalars['Float'];
};

export type ImageTotal = {
  __typename?: 'ImageTotal';
  relation: Scalars['String'];
  value: Scalars['Float'];
};

export type Location = {
  __typename?: 'Location';
  coordinates: Scalars['String'];
  countryId?: Maybe<Scalars['String']>;
  countryText?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  placeName: Scalars['String'];
  placeType: Scalars['String'];
  regionId?: Maybe<Scalars['String']>;
  regionText?: Maybe<Scalars['String']>;
  text: Scalars['String'];
};

export type LocationContextInput = {
  id: Scalars['String'];
  short_code?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  wikidata?: InputMaybe<Scalars['String']>;
};

export type LocationContextResponse = {
  __typename?: 'LocationContextResponse';
  id: Scalars['String'];
  short_code?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  wikidata?: Maybe<Scalars['String']>;
};

export type LocationGeometryInput = {
  coordinates?: InputMaybe<Array<Scalars['Float']>>;
  type: Scalars['String'];
};

export type LocationGeometryResponse = {
  __typename?: 'LocationGeometryResponse';
  coordinates?: Maybe<Array<Scalars['Float']>>;
  type: Scalars['String'];
};

export type LocationMapBoxInput = {
  bbox?: InputMaybe<Array<Scalars['Float']>>;
  center?: InputMaybe<Array<Scalars['Float']>>;
  context?: InputMaybe<Array<LocationContextInput>>;
  geometry?: InputMaybe<LocationGeometryInput>;
  id: Scalars['String'];
  place_name?: InputMaybe<Scalars['String']>;
  place_type?: InputMaybe<Array<Scalars['String']>>;
  relevance?: InputMaybe<Scalars['Float']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type LocationMapBoxResponse = {
  __typename?: 'LocationMapBoxResponse';
  bbox?: Maybe<Array<Scalars['Float']>>;
  center?: Maybe<Array<Scalars['Float']>>;
  context?: Maybe<Array<LocationContextResponse>>;
  geometry?: Maybe<LocationGeometryResponse>;
  id: Scalars['String'];
  place_name?: Maybe<Scalars['String']>;
  place_type?: Maybe<Array<Scalars['String']>>;
  relevance?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLocation: Location;
  createReview: Review;
  createReviewResponse: ReviewResponse;
  createSport: Sport;
  createTag: Tag;
  createTagRef: TagRef;
  createUploadUrl: UploadResolverResponse;
  createVita: Vita;
  deleteSport: Scalars['Boolean'];
  deleteTag: Scalars['Boolean'];
  deleteVita: Scalars['Boolean'];
  getLocation: Array<LocationMapBoxResponse>;
  getUploadImageDetail: ImageElasticResponse;
  setExistingImageAsAvatar: Avatar;
  updateSport: Sport;
  updateVita: Vita;
};


export type MutationCreateLocationArgs = {
  data: LocationMapBoxInput;
};


export type MutationCreateReviewArgs = {
  data: ReviewInput;
};


export type MutationCreateReviewResponseArgs = {
  data: ReviewResponseInput;
};


export type MutationCreateSportArgs = {
  data: SportInput;
};


export type MutationCreateTagArgs = {
  tagRefId: Scalars['Int'];
};


export type MutationCreateTagRefArgs = {
  text: Scalars['String'];
};


export type MutationCreateUploadUrlArgs = {
  data: UploadResolverInput;
};


export type MutationCreateVitaArgs = {
  data: CreateVitaInput;
};


export type MutationDeleteSportArgs = {
  sportId: Scalars['Int'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['Int'];
};


export type MutationDeleteVitaArgs = {
  id: Scalars['Int'];
};


export type MutationGetLocationArgs = {
  value: Scalars['String'];
};


export type MutationGetUploadImageDetailArgs = {
  id: Scalars['Float'];
};


export type MutationSetExistingImageAsAvatarArgs = {
  imageId: Scalars['Float'];
};


export type MutationUpdateSportArgs = {
  data: SportUpdateInput;
};


export type MutationUpdateVitaArgs = {
  data: UpdateVitaInput;
};

export type Query = {
  __typename?: 'Query';
  activeUserDetail: ActiveUserDetail;
  getCurrentUsername: Scalars['String'];
  getReviewDetail: Review;
  getReviewList: ReviewElasticResponse;
  getSportDetail: Sport;
  getSportRefList?: Maybe<Array<SportRef>>;
  getTagList: Array<TagRef>;
  getUploadImageList: ImageElasticResponse;
  getUserDetail: UserDetailResponse;
  getUserList: UserElasticResponse;
};


export type QueryActiveUserDetailArgs = {
  username: Scalars['String'];
};


export type QueryGetCurrentUsernameArgs = {
  userId: Scalars['String'];
};


export type QueryGetReviewDetailArgs = {
  reviewId: Scalars['Int'];
};


export type QueryGetReviewListArgs = {
  username: Scalars['String'];
};


export type QueryGetSportDetailArgs = {
  sportId: Scalars['Int'];
};


export type QueryGetUploadImageListArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  username: Scalars['String'];
};


export type QueryGetUserDetailArgs = {
  username: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  author: ReviewAuthor;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  rating: Scalars['Int'];
  reviewResponse?: Maybe<ReviewResponse>;
  text: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type ReviewAuthor = {
  __typename?: 'ReviewAuthor';
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
};

export type ReviewElasticResponse = {
  __typename?: 'ReviewElasticResponse';
  _shards: ReviewShardsResponse;
  hits: ReviewHits;
  pageInfo?: Maybe<ReviewPageInfo>;
  timed_out: Scalars['Boolean'];
  took: Scalars['Float'];
};

export type ReviewHits = {
  __typename?: 'ReviewHits';
  hits?: Maybe<Array<ReviewHits_Inner>>;
  max_score: Scalars['Float'];
  total: ReviewTotal;
};

export type ReviewHits_Inner = {
  __typename?: 'ReviewHits_Inner';
  _id: Scalars['String'];
  _index: Scalars['String'];
  _score: Scalars['Float'];
  _source: Review;
  _type: Scalars['String'];
  _version: Scalars['Float'];
  matched_queries: Array<Scalars['String']>;
  sort: Array<Scalars['String']>;
};

export type ReviewInput = {
  rating: Scalars['Int'];
  text: Scalars['String'];
  title: Scalars['String'];
  userId: Scalars['String'];
};

export type ReviewMeta = {
  __typename?: 'ReviewMeta';
  averageRating: Scalars['Float'];
  numberRating: Scalars['Float'];
};

export type ReviewPageInfo = {
  __typename?: 'ReviewPageInfo';
  cursor?: Maybe<Scalars['String']>;
  lastPage?: Maybe<Scalars['String']>;
  nextPage?: Maybe<Scalars['Boolean']>;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  isPublished: Scalars['Boolean'];
  text: Scalars['String'];
};

export type ReviewResponseInput = {
  reviewId: Scalars['Int'];
  text: Scalars['String'];
};

export type ReviewShardsResponse = {
  __typename?: 'ReviewShardsResponse';
  failed: Scalars['Float'];
  skipped: Scalars['Float'];
  successful: Scalars['Float'];
  total: Scalars['Float'];
};

export type ReviewTotal = {
  __typename?: 'ReviewTotal';
  relation: Scalars['String'];
  value: Scalars['Float'];
};

export type Sport = {
  __typename?: 'Sport';
  id: Scalars['Int'];
  level: Scalars['Int'];
  sportRef: SportRef;
};

export type SportInput = {
  level: Scalars['Int'];
  sportRefId: Scalars['Int'];
};

export type SportRef = {
  __typename?: 'SportRef';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type SportUpdateInput = {
  level: Scalars['Int'];
  sportId: Scalars['Int'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int'];
  tagRef: TagRef;
};

export type TagRef = {
  __typename?: 'TagRef';
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type UpdateVitaInput = {
  fromDate: Scalars['DateTime'];
  id: Scalars['Float'];
  isCurrent: Scalars['Boolean'];
  text: Scalars['String'];
  title: Scalars['String'];
  toDate: Scalars['DateTime'];
};

export type UploadResolverInput = {
  caption?: InputMaybe<Scalars['String']>;
  fileName: Scalars['String'];
  isProfileImage: Scalars['Boolean'];
  location?: InputMaybe<LocationMapBoxInput>;
  mimeType: Scalars['String'];
  origin: Scalars['String'];
  uploadType: Scalars['String'];
};

export type UploadResolverResponse = {
  __typename?: 'UploadResolverResponse';
  fileKey: Scalars['String'];
  signedUrl: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Avatar>;
  firstName: Scalars['String'];
  id: Scalars['String'];
  isGuide: Scalars['Boolean'];
  lastName: Scalars['String'];
  location?: Maybe<Location>;
  reviewMeta?: Maybe<ReviewMeta>;
  sport?: Maybe<Array<Sport>>;
  tag?: Maybe<Array<Tag>>;
  username: Scalars['String'];
  vita: Array<Vita>;
};

export type UserDetailResponse = {
  __typename?: 'UserDetailResponse';
  user: User;
  userMeta: UserMeta;
};

export type UserElasticResponse = {
  __typename?: 'UserElasticResponse';
  _shards: UserShardsResponse;
  hits: UserHits;
  pageInfo?: Maybe<UserPageInfo>;
  timed_out: Scalars['Boolean'];
  took: Scalars['Float'];
};

export type UserHits = {
  __typename?: 'UserHits';
  hits?: Maybe<Array<UserHits_Inner>>;
  max_score: Scalars['Float'];
  total: UserTotal;
};

export type UserHits_Inner = {
  __typename?: 'UserHits_Inner';
  _id: Scalars['String'];
  _index: Scalars['String'];
  _score: Scalars['Float'];
  _source: User;
  _type: Scalars['String'];
  _version: Scalars['Float'];
  matched_queries: Array<Scalars['String']>;
  sort: Array<Scalars['String']>;
};

export type UserMeta = {
  __typename?: 'UserMeta';
  hasReviewed: Scalars['Boolean'];
  myUser: Scalars['Boolean'];
};

export type UserPageInfo = {
  __typename?: 'UserPageInfo';
  cursor?: Maybe<Scalars['String']>;
  lastPage?: Maybe<Scalars['String']>;
  nextPage?: Maybe<Scalars['Boolean']>;
};

export type UserShardsResponse = {
  __typename?: 'UserShardsResponse';
  failed: Scalars['Float'];
  skipped: Scalars['Float'];
  successful: Scalars['Float'];
  total: Scalars['Float'];
};

export type UserTotal = {
  __typename?: 'UserTotal';
  relation: Scalars['String'];
  value: Scalars['Float'];
};

export type Vita = {
  __typename?: 'Vita';
  fromDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isCurrent: Scalars['Boolean'];
  isPublished: Scalars['Boolean'];
  text: Scalars['String'];
  title: Scalars['String'];
  toDate: Scalars['DateTime'];
};

export type SetExistingImageAsAvatarMutationVariables = Exact<{
  imageId: Scalars['Float'];
}>;


export type SetExistingImageAsAvatarMutation = { __typename?: 'Mutation', setExistingImageAsAvatar: { __typename?: 'Avatar', blurBase64: string, url: string } };

export type GetUploadImageListQueryVariables = Exact<{
  username: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type GetUploadImageListQuery = { __typename?: 'Query', getUploadImageList: { __typename?: 'ImageElasticResponse', pageInfo?: { __typename?: 'ImagePageInfo', cursor?: string | null, lastPage?: string | null, nextPage?: boolean | null } | null, hits: { __typename?: 'ImageHits', hits?: Array<{ __typename?: 'ImageHits_Inner', _id: string, _source: { __typename?: 'Image', id: number, url?: string | null, blurBase64?: string | null, caption?: string | null, orderNumber: number, fileName?: string | null, origin: string, isProfileImage: boolean, location?: { __typename?: 'Location', placeName: string, text: string } | null } }> | null } } };

export type GetUploadImageDetailMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUploadImageDetailMutation = { __typename?: 'Mutation', getUploadImageDetail: { __typename?: 'ImageElasticResponse', pageInfo?: { __typename?: 'ImagePageInfo', cursor?: string | null } | null, hits: { __typename?: 'ImageHits', hits?: Array<{ __typename?: 'ImageHits_Inner', _id: string, _source: { __typename?: 'Image', id: number, url?: string | null, blurBase64?: string | null, caption?: string | null, orderNumber: number, fileName?: string | null, origin: string, isProfileImage: boolean, location?: { __typename?: 'Location', placeName: string, text: string } | null } }> | null } } };

export type CreateLocationMutationVariables = Exact<{
  data: LocationMapBoxInput;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'Location', id: number, coordinates: string, placeName: string, placeType: string, regionId?: string | null, regionText?: string | null, countryId?: string | null, countryText?: string | null, text: string } };

export type GetLocationMutationVariables = Exact<{
  value: Scalars['String'];
}>;


export type GetLocationMutation = { __typename?: 'Mutation', getLocation: Array<{ __typename?: 'LocationMapBoxResponse', id: string, type?: string | null, place_type?: Array<string> | null, text?: string | null, bbox?: Array<number> | null, place_name?: string | null, geometry?: { __typename?: 'LocationGeometryResponse', type: string, coordinates?: Array<number> | null } | null, context?: Array<{ __typename?: 'LocationContextResponse', id: string, short_code?: string | null, wikidata?: string | null, text: string }> | null }> };

export type CreateReviewMutationVariables = Exact<{
  data: ReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: number, title: string, rating: number, author: { __typename?: 'ReviewAuthor', firstName: string, lastName: string, id: string } } };

export type GetReviewListQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetReviewListQuery = { __typename?: 'Query', getReviewList: { __typename?: 'ReviewElasticResponse', took: number, hits: { __typename?: 'ReviewHits', hits?: Array<{ __typename?: 'ReviewHits_Inner', _source: { __typename?: 'Review', id: number, title: string, text: string, rating: number, createdAt: string, author: { __typename?: 'ReviewAuthor', firstName: string, lastName: string, id: string } } }> | null } } };

export type CreateSportMutationVariables = Exact<{
  level: Scalars['Int'];
  sportRefId: Scalars['Int'];
}>;


export type CreateSportMutation = { __typename?: 'Mutation', createSport: { __typename?: 'Sport', id: number, level: number, sportRef: { __typename?: 'SportRef', title: string, id: number } } };

export type UpdateSportMutationVariables = Exact<{
  level: Scalars['Int'];
  sportId: Scalars['Int'];
}>;


export type UpdateSportMutation = { __typename?: 'Mutation', updateSport: { __typename?: 'Sport', id: number, level: number, sportRef: { __typename?: 'SportRef', id: number, title: string } } };

export type DeleteSportMutationVariables = Exact<{
  sportId: Scalars['Int'];
}>;


export type DeleteSportMutation = { __typename?: 'Mutation', deleteSport: boolean };

export type GetSportRefListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSportRefListQuery = { __typename?: 'Query', getSportRefList?: Array<{ __typename?: 'SportRef', title: string, id: number }> | null };

export type GetSportDetailQueryVariables = Exact<{
  sportId: Scalars['Int'];
}>;


export type GetSportDetailQuery = { __typename?: 'Query', getSportDetail: { __typename?: 'Sport', id: number, level: number, sportRef: { __typename?: 'SportRef', id: number, title: string } } };

export type CreateUploadUrlMutationVariables = Exact<{
  data: UploadResolverInput;
}>;


export type CreateUploadUrlMutation = { __typename?: 'Mutation', createUploadUrl: { __typename?: 'UploadResolverResponse', signedUrl: string, fileKey: string } };

export type UserDetailAvatarFragment = { __typename?: 'Avatar', url: string, blurBase64: string };

export type GetUserDetailQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserDetailQuery = { __typename?: 'Query', getUserDetail: { __typename?: 'UserDetailResponse', userMeta: { __typename?: 'UserMeta', hasReviewed: boolean, myUser: boolean }, user: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, isGuide: boolean, sport?: Array<{ __typename?: 'Sport', level: number, id: number, sportRef: { __typename?: 'SportRef', id: number, title: string } }> | null, location?: { __typename?: 'Location', id: number, placeName: string, text: string, countryText?: string | null, regionText?: string | null } | null, avatar?: { __typename?: 'Avatar', url: string, blurBase64: string } | null } } };

export type UserListLocationFragment = { __typename?: 'Location', id: number, placeName: string, text: string, countryText?: string | null, regionText?: string | null };

export type UserListAvatarFragment = { __typename?: 'Avatar', url: string, blurBase64: string };

export type UserListReviewFragment = { __typename?: 'ReviewMeta', averageRating: number, numberRating: number };

export type GetUserListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserListQuery = { __typename?: 'Query', getUserList: { __typename?: 'UserElasticResponse', took: number, hits: { __typename?: 'UserHits', hits?: Array<{ __typename?: 'UserHits_Inner', _index: string, _source: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, isGuide: boolean, reviewMeta?: { __typename?: 'ReviewMeta', averageRating: number, numberRating: number } | null, location?: { __typename?: 'Location', id: number, placeName: string, text: string, countryText?: string | null, regionText?: string | null } | null, avatar?: { __typename?: 'Avatar', url: string, blurBase64: string } | null } }> | null } } };

export type GetCurrentUsernameQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCurrentUsernameQuery = { __typename?: 'Query', getCurrentUsername: string };

export const UserDetailAvatarFragmentDoc = gql`
    fragment UserDetailAvatar on Avatar {
  url
  blurBase64
}
    `;
export const UserListLocationFragmentDoc = gql`
    fragment UserListLocation on Location {
  id
  id
  placeName
  text
  countryText
  regionText
}
    `;
export const UserListAvatarFragmentDoc = gql`
    fragment UserListAvatar on Avatar {
  url
  blurBase64
}
    `;
export const UserListReviewFragmentDoc = gql`
    fragment UserListReview on ReviewMeta {
  averageRating
  numberRating
}
    `;
export const SetExistingImageAsAvatarDocument = gql`
    mutation setExistingImageAsAvatar($imageId: Float!) {
  setExistingImageAsAvatar(imageId: $imageId) {
    blurBase64
    url
  }
}
    `;
export type SetExistingImageAsAvatarMutationFn = ApolloReactCommon.MutationFunction<SetExistingImageAsAvatarMutation, SetExistingImageAsAvatarMutationVariables>;

/**
 * __useSetExistingImageAsAvatarMutation__
 *
 * To run a mutation, you first call `useSetExistingImageAsAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetExistingImageAsAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setExistingImageAsAvatarMutation, { data, loading, error }] = useSetExistingImageAsAvatarMutation({
 *   variables: {
 *      imageId: // value for 'imageId'
 *   },
 * });
 */
export function useSetExistingImageAsAvatarMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetExistingImageAsAvatarMutation, SetExistingImageAsAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetExistingImageAsAvatarMutation, SetExistingImageAsAvatarMutationVariables>(SetExistingImageAsAvatarDocument, options);
      }
export type SetExistingImageAsAvatarMutationHookResult = ReturnType<typeof useSetExistingImageAsAvatarMutation>;
export type SetExistingImageAsAvatarMutationResult = ApolloReactCommon.MutationResult<SetExistingImageAsAvatarMutation>;
export type SetExistingImageAsAvatarMutationOptions = ApolloReactCommon.BaseMutationOptions<SetExistingImageAsAvatarMutation, SetExistingImageAsAvatarMutationVariables>;
export const GetUploadImageListDocument = gql`
    query getUploadImageList($username: String!, $limit: Int!, $cursor: String) {
  getUploadImageList(username: $username, limit: $limit, cursor: $cursor) {
    pageInfo {
      cursor
      lastPage
      nextPage
    }
    hits {
      hits {
        _id
        _source {
          id
          url
          blurBase64
          caption
          orderNumber
          fileName
          origin
          isProfileImage
          location {
            placeName
            text
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetUploadImageListQuery__
 *
 * To run a query within a React component, call `useGetUploadImageListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadImageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadImageListQuery({
 *   variables: {
 *      username: // value for 'username'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetUploadImageListQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUploadImageListQuery, GetUploadImageListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUploadImageListQuery, GetUploadImageListQueryVariables>(GetUploadImageListDocument, options);
      }
export function useGetUploadImageListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUploadImageListQuery, GetUploadImageListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUploadImageListQuery, GetUploadImageListQueryVariables>(GetUploadImageListDocument, options);
        }
export type GetUploadImageListQueryHookResult = ReturnType<typeof useGetUploadImageListQuery>;
export type GetUploadImageListLazyQueryHookResult = ReturnType<typeof useGetUploadImageListLazyQuery>;
export type GetUploadImageListQueryResult = ApolloReactCommon.QueryResult<GetUploadImageListQuery, GetUploadImageListQueryVariables>;
export const GetUploadImageDetailDocument = gql`
    mutation getUploadImageDetail($id: Float!) {
  getUploadImageDetail(id: $id) {
    pageInfo {
      cursor
    }
    hits {
      hits {
        _id
        _source {
          id
          url
          blurBase64
          caption
          orderNumber
          fileName
          origin
          isProfileImage
          location {
            placeName
            text
          }
        }
      }
    }
  }
}
    `;
export type GetUploadImageDetailMutationFn = ApolloReactCommon.MutationFunction<GetUploadImageDetailMutation, GetUploadImageDetailMutationVariables>;

/**
 * __useGetUploadImageDetailMutation__
 *
 * To run a mutation, you first call `useGetUploadImageDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetUploadImageDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getUploadImageDetailMutation, { data, loading, error }] = useGetUploadImageDetailMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUploadImageDetailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetUploadImageDetailMutation, GetUploadImageDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GetUploadImageDetailMutation, GetUploadImageDetailMutationVariables>(GetUploadImageDetailDocument, options);
      }
export type GetUploadImageDetailMutationHookResult = ReturnType<typeof useGetUploadImageDetailMutation>;
export type GetUploadImageDetailMutationResult = ApolloReactCommon.MutationResult<GetUploadImageDetailMutation>;
export type GetUploadImageDetailMutationOptions = ApolloReactCommon.BaseMutationOptions<GetUploadImageDetailMutation, GetUploadImageDetailMutationVariables>;
export const CreateLocationDocument = gql`
    mutation createLocation($data: LocationMapBoxInput!) {
  createLocation(data: $data) {
    id
    coordinates
    placeName
    placeType
    regionId
    regionText
    countryId
    countryText
    text
  }
}
    `;
export type CreateLocationMutationFn = ApolloReactCommon.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = ApolloReactCommon.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const GetLocationDocument = gql`
    mutation getLocation($value: String!) {
  getLocation(value: $value) {
    id
    type
    place_type
    text
    bbox
    place_name
    geometry {
      type
      coordinates
    }
    context {
      id
      short_code
      wikidata
      text
    }
  }
}
    `;
export type GetLocationMutationFn = ApolloReactCommon.MutationFunction<GetLocationMutation, GetLocationMutationVariables>;

/**
 * __useGetLocationMutation__
 *
 * To run a mutation, you first call `useGetLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getLocationMutation, { data, loading, error }] = useGetLocationMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useGetLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetLocationMutation, GetLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GetLocationMutation, GetLocationMutationVariables>(GetLocationDocument, options);
      }
export type GetLocationMutationHookResult = ReturnType<typeof useGetLocationMutation>;
export type GetLocationMutationResult = ApolloReactCommon.MutationResult<GetLocationMutation>;
export type GetLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<GetLocationMutation, GetLocationMutationVariables>;
export const CreateReviewDocument = gql`
    mutation createReview($data: ReviewInput!) {
  createReview(data: $data) {
    id
    title
    rating
    author {
      firstName
      lastName
      id
    }
  }
}
    `;
export type CreateReviewMutationFn = ApolloReactCommon.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = ApolloReactCommon.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetReviewListDocument = gql`
    query getReviewList($username: String!) {
  getReviewList(username: $username) {
    took
    hits {
      hits {
        _source {
          id
          title
          text
          rating
          createdAt
          author {
            firstName
            lastName
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetReviewListQuery__
 *
 * To run a query within a React component, call `useGetReviewListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewListQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetReviewListQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetReviewListQuery, GetReviewListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetReviewListQuery, GetReviewListQueryVariables>(GetReviewListDocument, options);
      }
export function useGetReviewListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetReviewListQuery, GetReviewListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetReviewListQuery, GetReviewListQueryVariables>(GetReviewListDocument, options);
        }
export type GetReviewListQueryHookResult = ReturnType<typeof useGetReviewListQuery>;
export type GetReviewListLazyQueryHookResult = ReturnType<typeof useGetReviewListLazyQuery>;
export type GetReviewListQueryResult = ApolloReactCommon.QueryResult<GetReviewListQuery, GetReviewListQueryVariables>;
export const CreateSportDocument = gql`
    mutation createSport($level: Int!, $sportRefId: Int!) {
  createSport(data: {level: $level, sportRefId: $sportRefId}) {
    id
    level
    sportRef {
      title
      id
    }
  }
}
    `;
export type CreateSportMutationFn = ApolloReactCommon.MutationFunction<CreateSportMutation, CreateSportMutationVariables>;

/**
 * __useCreateSportMutation__
 *
 * To run a mutation, you first call `useCreateSportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSportMutation, { data, loading, error }] = useCreateSportMutation({
 *   variables: {
 *      level: // value for 'level'
 *      sportRefId: // value for 'sportRefId'
 *   },
 * });
 */
export function useCreateSportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSportMutation, CreateSportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSportMutation, CreateSportMutationVariables>(CreateSportDocument, options);
      }
export type CreateSportMutationHookResult = ReturnType<typeof useCreateSportMutation>;
export type CreateSportMutationResult = ApolloReactCommon.MutationResult<CreateSportMutation>;
export type CreateSportMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateSportMutation, CreateSportMutationVariables>;
export const UpdateSportDocument = gql`
    mutation updateSport($level: Int!, $sportId: Int!) {
  updateSport(data: {level: $level, sportId: $sportId}) {
    id
    level
    sportRef {
      id
      title
    }
  }
}
    `;
export type UpdateSportMutationFn = ApolloReactCommon.MutationFunction<UpdateSportMutation, UpdateSportMutationVariables>;

/**
 * __useUpdateSportMutation__
 *
 * To run a mutation, you first call `useUpdateSportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSportMutation, { data, loading, error }] = useUpdateSportMutation({
 *   variables: {
 *      level: // value for 'level'
 *      sportId: // value for 'sportId'
 *   },
 * });
 */
export function useUpdateSportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSportMutation, UpdateSportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSportMutation, UpdateSportMutationVariables>(UpdateSportDocument, options);
      }
export type UpdateSportMutationHookResult = ReturnType<typeof useUpdateSportMutation>;
export type UpdateSportMutationResult = ApolloReactCommon.MutationResult<UpdateSportMutation>;
export type UpdateSportMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateSportMutation, UpdateSportMutationVariables>;
export const DeleteSportDocument = gql`
    mutation deleteSport($sportId: Int!) {
  deleteSport(sportId: $sportId)
}
    `;
export type DeleteSportMutationFn = ApolloReactCommon.MutationFunction<DeleteSportMutation, DeleteSportMutationVariables>;

/**
 * __useDeleteSportMutation__
 *
 * To run a mutation, you first call `useDeleteSportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSportMutation, { data, loading, error }] = useDeleteSportMutation({
 *   variables: {
 *      sportId: // value for 'sportId'
 *   },
 * });
 */
export function useDeleteSportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteSportMutation, DeleteSportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteSportMutation, DeleteSportMutationVariables>(DeleteSportDocument, options);
      }
export type DeleteSportMutationHookResult = ReturnType<typeof useDeleteSportMutation>;
export type DeleteSportMutationResult = ApolloReactCommon.MutationResult<DeleteSportMutation>;
export type DeleteSportMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteSportMutation, DeleteSportMutationVariables>;
export const GetSportRefListDocument = gql`
    query getSportRefList {
  getSportRefList {
    title
    id
  }
}
    `;

/**
 * __useGetSportRefListQuery__
 *
 * To run a query within a React component, call `useGetSportRefListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSportRefListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSportRefListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSportRefListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSportRefListQuery, GetSportRefListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSportRefListQuery, GetSportRefListQueryVariables>(GetSportRefListDocument, options);
      }
export function useGetSportRefListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSportRefListQuery, GetSportRefListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSportRefListQuery, GetSportRefListQueryVariables>(GetSportRefListDocument, options);
        }
export type GetSportRefListQueryHookResult = ReturnType<typeof useGetSportRefListQuery>;
export type GetSportRefListLazyQueryHookResult = ReturnType<typeof useGetSportRefListLazyQuery>;
export type GetSportRefListQueryResult = ApolloReactCommon.QueryResult<GetSportRefListQuery, GetSportRefListQueryVariables>;
export const GetSportDetailDocument = gql`
    query getSportDetail($sportId: Int!) {
  getSportDetail(sportId: $sportId) {
    id
    level
    sportRef {
      id
      title
    }
  }
}
    `;

/**
 * __useGetSportDetailQuery__
 *
 * To run a query within a React component, call `useGetSportDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSportDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSportDetailQuery({
 *   variables: {
 *      sportId: // value for 'sportId'
 *   },
 * });
 */
export function useGetSportDetailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSportDetailQuery, GetSportDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSportDetailQuery, GetSportDetailQueryVariables>(GetSportDetailDocument, options);
      }
export function useGetSportDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSportDetailQuery, GetSportDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSportDetailQuery, GetSportDetailQueryVariables>(GetSportDetailDocument, options);
        }
export type GetSportDetailQueryHookResult = ReturnType<typeof useGetSportDetailQuery>;
export type GetSportDetailLazyQueryHookResult = ReturnType<typeof useGetSportDetailLazyQuery>;
export type GetSportDetailQueryResult = ApolloReactCommon.QueryResult<GetSportDetailQuery, GetSportDetailQueryVariables>;
export const CreateUploadUrlDocument = gql`
    mutation createUploadUrl($data: UploadResolverInput!) {
  createUploadUrl(data: $data) {
    signedUrl
    fileKey
  }
}
    `;
export type CreateUploadUrlMutationFn = ApolloReactCommon.MutationFunction<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>;

/**
 * __useCreateUploadUrlMutation__
 *
 * To run a mutation, you first call `useCreateUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadUrlMutation, { data, loading, error }] = useCreateUploadUrlMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>(CreateUploadUrlDocument, options);
      }
export type CreateUploadUrlMutationHookResult = ReturnType<typeof useCreateUploadUrlMutation>;
export type CreateUploadUrlMutationResult = ApolloReactCommon.MutationResult<CreateUploadUrlMutation>;
export type CreateUploadUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUploadUrlMutation, CreateUploadUrlMutationVariables>;
export const GetUserDetailDocument = gql`
    query getUserDetail($username: String!) {
  getUserDetail(username: $username) {
    userMeta {
      hasReviewed
      myUser
    }
    user {
      id
      firstName
      lastName
      username
      isGuide
      sport {
        level
        id
        sportRef {
          id
          title
        }
      }
      location {
        id
        placeName
        text
        countryText
        regionText
      }
      avatar {
        ...UserDetailAvatar
      }
    }
  }
}
    ${UserDetailAvatarFragmentDoc}`;

/**
 * __useGetUserDetailQuery__
 *
 * To run a query within a React component, call `useGetUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDetailQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserDetailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
      }
export function useGetUserDetailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserDetailQuery, GetUserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserDetailQuery, GetUserDetailQueryVariables>(GetUserDetailDocument, options);
        }
export type GetUserDetailQueryHookResult = ReturnType<typeof useGetUserDetailQuery>;
export type GetUserDetailLazyQueryHookResult = ReturnType<typeof useGetUserDetailLazyQuery>;
export type GetUserDetailQueryResult = ApolloReactCommon.QueryResult<GetUserDetailQuery, GetUserDetailQueryVariables>;
export const GetUserListDocument = gql`
    query getUserList {
  getUserList {
    hits {
      hits {
        _index
        _source {
          id
          firstName
          lastName
          username
          isGuide
          reviewMeta {
            ...UserListReview
          }
          location {
            ...UserListLocation
          }
          avatar {
            ...UserListAvatar
          }
        }
      }
    }
    took
  }
}
    ${UserListReviewFragmentDoc}
${UserListLocationFragmentDoc}
${UserListAvatarFragmentDoc}`;

/**
 * __useGetUserListQuery__
 *
 * To run a query within a React component, call `useGetUserListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserListQuery, GetUserListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
      }
export function useGetUserListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserListQuery, GetUserListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserListQuery, GetUserListQueryVariables>(GetUserListDocument, options);
        }
export type GetUserListQueryHookResult = ReturnType<typeof useGetUserListQuery>;
export type GetUserListLazyQueryHookResult = ReturnType<typeof useGetUserListLazyQuery>;
export type GetUserListQueryResult = ApolloReactCommon.QueryResult<GetUserListQuery, GetUserListQueryVariables>;
export const GetCurrentUsernameDocument = gql`
    query getCurrentUsername($userId: String!) {
  getCurrentUsername(userId: $userId)
}
    `;

/**
 * __useGetCurrentUsernameQuery__
 *
 * To run a query within a React component, call `useGetCurrentUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUsernameQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCurrentUsernameQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetCurrentUsernameQuery, GetCurrentUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCurrentUsernameQuery, GetCurrentUsernameQueryVariables>(GetCurrentUsernameDocument, options);
      }
export function useGetCurrentUsernameLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUsernameQuery, GetCurrentUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCurrentUsernameQuery, GetCurrentUsernameQueryVariables>(GetCurrentUsernameDocument, options);
        }
export type GetCurrentUsernameQueryHookResult = ReturnType<typeof useGetCurrentUsernameQuery>;
export type GetCurrentUsernameLazyQueryHookResult = ReturnType<typeof useGetCurrentUsernameLazyQuery>;
export type GetCurrentUsernameQueryResult = ApolloReactCommon.QueryResult<GetCurrentUsernameQuery, GetCurrentUsernameQueryVariables>;