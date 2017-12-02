# ludus-luderia

## Build Setup

### Dependencies

To run this repository, you will need the Node.js engine and MongoDB database

``` bash
# install dependencies and run server in development
source run

# build web-app for production with minification
cd web-app && npm run build

# run api unit tests 
cd api && npm run test

# run web-app in dev mode
cd web-app && npm run dev

# run api in dev mode
cd api && pm2 start pm2-server.json
```
