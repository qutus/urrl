# URRL API

## Versions
nodejs: v14.15.1 or >

## Initial project setup
- `git clone ...`
- `yarn install`
- `yarn run test`

If tests are all good, your environnement is all set. If not, contact repository owner (qrouault@gmail.com)

## Scripts
- `yarn run test`: Launch tests
- `yarn run test-coverage`: Launch code coverage analysis and generate a command line report
- `yarn run start-dev`: Start api. Will listen on port defined in `src/config.js` file

## Configuration
See `src/config.js` file

## Entry point
See `src/index.js` file

## Available routes

### Generate short URL from an original URL

#### Request
`POST /api/shorturl { originalUrl: <string> }`
#### Response
```
{
    originalUrl: <string>,
    shortUrl: <string>,
    analytics: {
        redirectionCounter: <number>
    }
}
```

### Get redirected from short URL to original URL

#### Request
`GET /api/shorturl/:shortUrlId`
#### Response
302 redirect to originalUrl

### Get global analytics report on generated URLs

#### Request
`GET /api/shorturl/analytics`

#### Response
```
[{
    originalUrl: <string>,
    shortUrl: <string>,
    analytics: {
        redirectionCount: <number>
    }
}, { 
    ...
}]
```

## API Software layers
[@client GET/POST]  => [@API route => handler => business => db]

### routes
Express routes datas(method, path and handler) declaration

### handlers
Express routes handlers, dedicated to 
- manage req and res express handler parameters
- call a single business function from business layer
- manage errors to respond appropriate message and HTTP code to client
- use appropriate utils & services

### business
Dedicated to handle:
- business logic
- process/refactor/aggregate/format data
- communicate with the db layer
- use appropriate utils & services

### db
Db abstraction:
- communicate with nedb
- abstract basic and complexe db calls 
- use appropriate services

## Other software parts

### utils
Standalone simple mutualized functions

### services
Kind of more complex utils. Complex and coherent set of functions who work in // of "API software layers".