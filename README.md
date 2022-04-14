## Coding Assignment

This is an assignment written in Typescript and implemented using [Node.js](https://nodejs.org/en/) Express, [Mongodb](https://www.mongodb.com/) using Mongoose as ORM, [Redis](https://redis.io/) for caching.

The requirnment is providing a RESTful services for storing CSV data and have a way to query the data out as JSON format.

## Getting Started for local development

Install latest Node.js and its avaliable on [Nodejs.org](https://nodejs.org/en/)

Install Redis for [Windows](https://redis.io/docs/getting-started/installation/install-redis-on-windows/) / [macOS](https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/) / [Linux](https://redis.io/docs/getting-started/installation/install-redis-on-linux/)

Install MongoDB for [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) / [macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) / [Linux](https://www.mongodb.com/docs/manual/administration/install-on-linux/)

## Local setup

To clone the assignment, please use the following commands:

```
git clone https://github.com/stevekwokdev/nodejs-assignment.git
yarn install
```

## Available Scripts

- `yarn watch` watch mode to automatically re-run if detected changed for Windows machine
- `yarn test:windows` run the test under Windows machine
- `yarn build` build the project

## API routes

The API route prefix is `/` by default

## Docker Deployment

You can simply deploy the service using the following commands:

```
sudo docker-compose up -d
```

To check the running containers

```
docker ps
```

## Project Structure

| Name                |                                                      Description |
| ------------------- | ---------------------------------------------------------------: |
| .vscode/            |       VSCode tasks, launch configuration and some other settings |
| build/              |                        Compiled source files will be placed here |
| .env                |                                       Environment configurations |
| src/                |                                                     source codes |
| src/controllers/    |                                                  API Controllers |
| src/handlers/       |                 The handlers like global error exception handler |
| src/models/         |                                              Mongoose ORM Models |
| src/services/       |                                                    Service layer |
| src/routes/         |                                                  The API routers |
| src/types/\*.d.ts   | Custom type definitions and files that aren't on DefinitelyTyped |
| src/test/\*.test.ts |                                                        Unit Test |
