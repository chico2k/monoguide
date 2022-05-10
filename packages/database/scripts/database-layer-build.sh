function prepare_externals_lambda_layer() {

    echo "One level up ..."
    cd ..

    echo "Cleaning up workspace ..."
    rm -rf lambda-layers-database

    echo "Creating Layer Folder ..."
    mkdir -p lambda-layers-database/nodejs/node14/prisma

    echo "Copy Prisma"
    cp -r prisma/schema.prisma lambda-layers-database/nodejs/node14/prisma/

    echo "Creating Layer Folder ..."
    mkdir -p lambda-layers-database/nodejs/node14/node_modules

    echo "Copy package.json"
    cp -r package.json lambda-layers-database/nodejs/node14/

    echo "Jump into Directory"
    cd ./lambda-layers-database/nodejs/node14/

    echo "Current dictory: ${PWD}"

    echo "Install lambda layer dependencies ..."
    npm install --production

    echo "Prisma generate  ..."
    npx prisma generate

    echo "Jump into dicrectory"
    cd ..
    cd ..
    cd ..

    echo "Current dictory: ${PWD}"

    echo "Webpack Bundle..."
    npx webpack

    echo "Clean up ..."

    rm -rf lambda-layers-database/nodejs/node14/node_modules/.bin
    rm -rf lambda-layers-database/nodejs/node14/package-lock.json
    rm -rf lambda-layers-database/nodejs/node14/package.json

    rm -rf lambda-layers-database/nodejs/node14/prisma
    rm -rf lambda-layers-database/nodejs/node14/node_modules/.cache
    rm -rf lambda-layers-database/nodejs/node14/node_modules/prisma
    rm -f lambda-layers-database/nodejs/node14/node_modules/prisma/client/engines
    rm -f lambda-layers-database/nodejs/node14/node_modules/@prisma/client/query_engine-windows.dll.node

    rm -r -f lambda-layers-database/nodejs/node14/node_modules/@prisma/engines/node_modules/
    rm -f lambda-layers-database/nodejs/node14/node_modules/@prisma/engines/query_engine-windows.dll.node
    rm -f lambda-layers-database/nodejs/node14/node_modules/@prisma/engines/prisma-fmt-*
    rm -f lambda-layers-database/nodejs/node14/node_modules/@prisma/engines/introspection-engine-*
    rm -f lambda-layers-database/nodejs/node14/node_modules/@prisma/engines/migration-engine-*

    echo "Creating layer ..."
    mkdir -p lambda-layers-lib/nodejs/node14/node_modules/@sportsguide/database

    echo "Copy build ..."
    cp -r dist/** lambda-layers-lib/nodejs/node14/node_modules/@sportsguide/database
}

prepare_externals_lambda_layer
