/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      COGNITO_POOL: string;
      COGNITO_REGION: string;
      S3_ACCESS_KEY: string;
      S3_BUCKET_ID: string;
      NODE_ENV: string;
    }
  }
}

export {};
