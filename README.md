# API Documentation

[![npm](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm)
[![nodejs](https://img.shields.io/badge/node-v20.10.0-blue)](https://nodejs.org/en/download/)
[![nestjs](https://img.shields.io/badge/nestjs-10.2.7-red)](https://nestjs.com/)

## Description

This project is building using NestJS and MongoDB

Nest packages:

- [ConfigModule](https://docs.nestjs.com/techniques/configuration)
- [MongooseModule](https://docs.nestjs.com/techniques/mongodb)
- [CqrsModule](https://docs.nestjs.com/recipes/cqrs)
- [SwaggerModule](https://docs.nestjs.com/openapi/introduction)

## Requirements

|Technology |Version|
|:----------|:-----:|
| NodeJS    | 20.X  |
| MongoDB   | 5.0   |

Notes:

- There is a docker-compose.yml with mongodb dependency, just use nvm to switch node version.

## Installation

1. Install dependencies
2. Install husky hooks
3. Launch server

Install dependencies

```shell
yarn install
```

Install and configure husky

```shell
npx husky install
```

## Launch

You can launch some architecture dependencies with Docker using Docker Compose.

Start services

```shell
yarn hello
```

Stop services

```shell
yarn bye
```

| Services |  -   |
|:---------|:----:|
| MongoDB  | 5.0  |

## Documentation

|          |                                                       |
|:---------|:------------------------------------------------------|
| Swagger  | [View](http://localhost:3000/docs)                    |
| Compodoc | [View](https://docs.nestjs.com/recipes/documentation) |

## Testing

Run unit testing band

```shell
yarn test
```

Run end to end testing band

```shell
yarn test:e2e
```

## Examples

Read more about examples [here](/EXAMPLE.md)