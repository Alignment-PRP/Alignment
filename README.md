# Some name for project - blabal


## What is this?

## Documentation

### Build system

This application is using [sbt](http://www.scala-sbt.org) as the build tool.
Read more about the [Play build system](https://www.playframework.com/documentation/2.5.x/BuildOverview).

#### Sbt-Tasks

* jsDoc - Generates documentation with [jsDoc](https://github.com/jsdoc3/jsdoc)
* npmCompile - Bundles npm dependencies with [browserify](http://browserify.org)
* clientCompile - Bundles the react application with [babel](https://babeljs.io) and [browserify](http://browserify.org)

### Install
```bash
$ git clone https://github.com/Risvaag/vitaminbjorner.git

$ cd vitaminbjorner

$ npm install

$ sbt npmCompile
```

### Development
```
$ sbt run

# Application url: http://localhost:9000
```

### Production
```
$ sbt dist
```