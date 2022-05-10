/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-namespace */
import type { NewTypes } from '@elastic/elasticsearch';

export declare global {
  var es: NewTypes;
  namespace NodeJS {
    interface ProcessEnv {
      ELASTIC_HOST: string;
      DATABASE_URL: string;
    }
  }
}

declare let es: NewTypes;
