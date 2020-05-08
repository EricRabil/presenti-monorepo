# Presenti
Presenti is a flexible data aggregation service for statuses across platforms. It is designed to be plug-n-play with a Module API allowing you to integrate any platform to fit your needs. It can be used to make a status page for your personal website, or to aggregate the status of your services into one endpoint.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [PostgreSQL](https://www.postgresql.org/)
- [Node](https://nodejs.org/en/download/) >= 12
- [Yarn](https://yarnpkg.com/) - *We use yarn to maintain properly linked packages, making it easier to develop without running `npm link` whenever a package is installed*
- [TypeScript](https://www.typescriptlang.org/) >= 3.8.3 (*for development only*)
- Linux, Windows, or macOS

```bash
# Mac
brew install postgresql
brew services start postgresql
```

### Installing

To prepare for a development environment, run the following commands

```bash
# Install packages
yarn install
# Compile packages
yarn run build
```

To watch the packages, run

```bash
# Watch packages
yarn run watch
```