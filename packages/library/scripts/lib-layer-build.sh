function prepare_externals_lambda_layer() {
    echo "One level up ..."
    cd ..
    
    echo "Cleaning up workspace ..."
    rm -rf lambda-layers-lib
    
    echo "Creating layer ..."
    mkdir -p lambda-layers-lib/nodejs/node14/
    
    echo "Copy package.json ..."
    cp -r package.json lambda-layers-lib/nodejs/node14/
    
    echo "Jump into temp dicrectory ..."
    cd ./lambda-layers-lib/nodejs/node14/
    
    echo "Install externals lambda layer dependencies ..."
    npm install --production
    
    echo "Jump into dicrectory ..."
    cd ..
    cd ..
    cd ..
    echo "Current dictory: ${PWD} ..."
    
    echo "Webpack Bundle..."
    npx webpack
    
    echo "Creating layer ..."
    mkdir -p lambda-layers-lib/nodejs/node14/node_modules/@sportsguide/lib
    
    echo "Copy build ..."
    cp -r dist/** lambda-layers-lib/nodejs/node14/node_modules/@sportsguide/lib
    
    
}

prepare_externals_lambda_layer