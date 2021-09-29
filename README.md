# Nationwide Property App

## Stack

### Server

- apollo-server
- mongodb
- mongoose

### Client

- vite
- apollo-client
- tailwind
- react
- material-ui
- formik

## Requirements

- Docker (or Mongodb installed on local machine)
- Node (ideally v16+)
- NPM v7

## Installation

If you don't have Mongodb installed locally you'll need to run the docker-compose config from the root directory:

```
docker-compose up -d
```

That will create a mongo (and mongo-express for development) instance for the app to connect to.

Next install the npm dependencies from the root directory:

```
npm install
```

## Starting

There are two ways to start the application.
_Note: ports 3000 and 4000 will need to be available_

### Development mode

```
npm run dev
```

### Production mode

```
npm start
```

## Stuff to add:

### General

- commitizen
- husky
- types could be stronger

### Server

- caching
- probably a better schema!
- better error handling/data validation
- eslint-plugin-graphql
- error logging
- debugging
- ...lots more

### Client

- debounce loading indicators
- improve styling by moving tailwind class names into reusable classes
- error logging
- debugging
- optimisation/lazy loading/code splitting etc.

## To do

- client app tests
