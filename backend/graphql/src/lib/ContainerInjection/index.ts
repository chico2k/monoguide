import {
  LocationTestDatabase,
  SportTestDatabase,
  TagRefTestDatabase,
  TagTestDatabase,
  SportRefTestDatabase,
  UserTestDatabase,
  ImageTestDatabase,
  ReviewTestDatabase,
  ReviewMetaTestDatabase,
  ReviewResponseTestDatabase,
  UserDatabase,
  SportDatabase,
  SportRefDatabase,
  LocationDatabase,
  TagDatabase,
  TagRefDatabase,
  ReviewDatabase,
  ReviewResponseDatabase,
  ReviewMetaDatabase
} from '@sportsguide/database';
import { Container } from 'typedi';
import {
  UserElasticMock,
  ReviewElasticMock,
  UserElastic,
  ReviewElastic,
  ImageElastic
} from '@sportsguide/elastic';
import { ImageDatabase } from '@sportsguide/database/src/domain/Image';
import { WebhookDatabase } from '@sportsguide/webhook';

class ContainerInjection {
  static containerNames = {
    AUTH: 'AUTH',
    DB_USER: 'DB_USER',
    DB_IMAGE: 'DB_IMAGE',
    DB_SPORT: 'DB_SPORT',
    DB_SPORTREF: 'DB_SPORTREF',
    DB_LOCATION: 'DB_LOCATION',
    DB_TAG: 'DB_TAG',
    DB_VITA: 'DB_VITA',
    DB_TAGREF: 'DB_TAGREF',
    DB_REVIEW: 'DB_REVIEW',
    DB_REVIEWRESPONSE: 'DB_REVIEWRESPONSE',
    DB_REVIEWMETA: 'DB_REVIEWMETA',
    ES_USER: 'ES_USER',
    ES_REVIEW: 'ES_REVIEW',
    ES_IMAGE: 'ES_IMAGE',

    WEBHOOK_DATABASE: 'WEBHOOK_DATABASE'
  };

  static testContainer = [
    {
      id: ContainerInjection.containerNames.DB_USER,
      value: new UserTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_SPORT,
      value: new SportTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_IMAGE,
      value: new ImageTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_SPORTREF,
      value: new SportRefTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_LOCATION,
      value: new LocationTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_TAG,
      value: new TagTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_TAGREF,
      value: new TagRefTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_REVIEW,
      value: new ReviewTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_REVIEWRESPONSE,
      value: new ReviewResponseTestDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_REVIEWMETA,
      value: new ReviewMetaTestDatabase()
    },

    {
      id: ContainerInjection.containerNames.ES_USER,
      value: new UserElasticMock()
    },
    {
      id: ContainerInjection.containerNames.ES_REVIEW,
      value: new ReviewElasticMock()
    },
    {
      id: ContainerInjection.containerNames.ES_REVIEW,
      value: new ReviewElasticMock()
    }
  ];

  static prismaContainer = [
    {
      id: ContainerInjection.containerNames.DB_USER,
      value: new UserDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_SPORT,
      value: new SportDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_IMAGE,
      value: new ImageDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_SPORTREF,
      value: new SportRefDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_LOCATION,
      value: new LocationDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_TAG,
      value: new TagDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_TAGREF,
      value: new TagRefDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_REVIEW,
      value: new ReviewDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_REVIEWRESPONSE,
      value: new ReviewResponseDatabase()
    },
    {
      id: ContainerInjection.containerNames.DB_REVIEWMETA,
      value: new ReviewMetaDatabase()
    },

    {
      id: ContainerInjection.containerNames.ES_USER,
      value: new UserElastic()
    },
    {
      id: ContainerInjection.containerNames.ES_REVIEW,
      value: new ReviewElastic()
    },
    {
      id: ContainerInjection.containerNames.ES_IMAGE,
      value: new ImageElastic()
    },
    {
      id: ContainerInjection.containerNames.WEBHOOK_DATABASE,
      value: new WebhookDatabase()
    }
  ];

  static setupContainerInjection = ({ env }: { env: 'TESTING' | 'PRISMA' }) => {
    if (env === 'TESTING') {
      return ContainerInjection.testContainer.map((container) =>
        Container.set(container)
      );
    }
    return ContainerInjection.prismaContainer.map((container) =>
      Container.set(container)
    );
  };
}
export { ContainerInjection };
