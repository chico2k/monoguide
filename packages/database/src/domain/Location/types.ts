import { Prisma, Location } from '@prisma/client';

export interface ILocationMapBox {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties?: {
    wikidata?: string;
    accuracy?: string;
  };
  text: string;
  place_name: string;
  bbox?: number[];
  center: number[];
  geometry: ILocationGeometry;
  context: ILocationContext[];
}

export interface ILocationGeometry {
  type: string;
  coordinates: number[];
}

export interface ILocationContext {
  id: string;
  wikidata?: string;
  short_code?: string;
  text: string;
}

export interface ILocationCustomContext {
  regionId: string | null;
  regionText: string | null;
  regionWikidata: string | null;
  regionShortcode: string | null;
  countryId: string | null;
  countryText: string | null;
  countryWikidata: string | null;
  countryShortcode: string | null;
  postcodeId: string | null;
  postcodeText: string | null;
  placeId: string | null;
  placeWikidata: string | null;
  placeText: string | null;
}

const imageWithLocation = Prisma.validator<Prisma.ImageArgs>()({
  include: { location: true }
});

export type ImageWithLocation = Prisma.ImageGetPayload<
  typeof imageWithLocation
>;

export interface ILocationDatebase {
  createLocation: (
    userId: string,
    location: ILocationMapBox
  ) => Promise<Location>;

  deleteLocation: (locationId: number) => Promise<boolean>;
}
