# Graphql Lambda

## Local Development

1. 'yarn prisma generate'
2. 'yarn dev'

## ENV File

The following env file is needed

```shell
DATABASE_URL
SHADOW_DATABASE_URL
COGNITO_POOL
COGNITO_REGION
S3_ACCESS_KEY
S3_BUCKET_ID
```

## Known Issues

1. Local Development fails when Layers are not available online > Comment out the Layers Section in the serverless yml.

## Lambda Layers

Layers will be available online for the Lambda function (@sportsguide/\*). Dependencies are added as devDependencies in package.json for local development.

1. [@sportsguide/database](https://github.com/chico2k/sg-db-layer)
1. [@sportsguide/elastic](https://github.com/chico2k/sg-es-layer)
1. [@sportsguide/lib](https://github.com/chico2k/sg-lib-layer)
