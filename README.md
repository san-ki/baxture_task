## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# multi mode
$ npm run start:multi
```

## Test

```bash
# unit tests
$ npm run test

```

## issues

### Db consistency

code is on branch dbChanges (not merged in master), there's a issue in db server port (cannot access DB_PORT from .env file).
To check db consistency please checkout to "dbChanges".
db server is running on port 8000, please change it from package.json if you want

steps:
start db server =>

```bash
# run db
$ npm run start:db

# multi mode
$ npm run start:multi

```
