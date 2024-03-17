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

code is on branch dbChanges (not merged in master), there's a issue in db server port.
To check db consistency please checkout to "dbChanges"
cannot access DB_PORT from .env file.
db server is running on port 8000, please change it from package.json if you want
