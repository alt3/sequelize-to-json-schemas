[![NPM Version](https://img.shields.io/npm/v/@alt3/sequelize-to-json-schemas?style=flat-square)](https://www.npmjs.com/package/@alt3/sequelize-to-json-schemas)
[![Build Status](https://img.shields.io/travis/alt3/sequelize-to-json-schemas/master.svg?style=flat-square)](https://travis-ci.org/alt3/sequelize-to-json-schemas)
![Greenkeeper Enabled](https://badges.greenkeeper.io/alt3/sequelize-to-json-schemas.svg?style=flat-square)
![NPM Total Downloads](https://img.shields.io/npm/dt/@alt3/sequelize-to-json-schemas.svg?style=flat-square)
[![Code Coverage](https://img.shields.io/codecov/c/github/alt3/sequelize-to-json-schemas.svg?style=flat-square)](https://codecov.io/gh/alt3/sequelize-to-json-schemas)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/alt3/sequelize-to-json-schemas?style=flat-square)](https://codeclimate.com/github/alt3/sequelize-to-json-schemas)

# sequelize-to-json-schemas

Convert Sequelize models into various JSON Schema variants (using the Strategy Pattern).

## Supported Schemas

- JSON Schema v7
- OpenAPI v3

> More strategies welcome, [inspiration found here](https://github.com/alt3/sequelize-to-json-schemas/tree/master/lib/strategies)

## Installation

```bash
npm install @alt3/sequelize-to-json-schemas --save
```

## Example

<!-- prettier-ignore-start -->
```javascript
const { SchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('@alt3/sequelize-to-json-schemas');
const schemaManager = new SchemaManager();

// generate a JSON Schema Draft-07 model schema
let schema = schemaManager.generate(userModel, new JsonSchema7Strategy());

// and/or the OpenAPI 3.0 equivalent
schema = schemaManager.generate(userModel, new OpenApi3Strategy());
```
<!-- prettier-ignore-end -->

## Additional Information

- understandable code
- compatible with Sequelize v4 and v5
- generates valid schemas (test suite using [ajv](https://github.com/epoberezkin/ajv) and [Swagger Parser](https://github.com/APIDevTools/swagger-parser) validators)
- uses the Strategy Pattern for (rock solid) core functionality while easily implementing new schema variants

## Configuration

To configure global options use the SchemaManager initialization:

```javascript
const schemaManager = new SchemaManager({
  baseUri: '/',
  absolutePaths: true,
});
```

To configure (per) model options use the `generate()` method:

```javascript
const userSchema = schemaManager.generate(userModel, strategy, {
  title: 'MyUser',
  description: 'My Description',
  exclude: ['someAttribute'],
});
```

To enrich your attributes add one or more `jsonSchema` options to your Sequelize attribute definitions:

```javascript
module.exports = sequelize => {
  const Model = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      jsonSchema: {
        description: 'My attribute description',
        examples: ['My example 1', 'My example 2'],
      },
    },
  });

  return Model;
};
```

## License

This project is released under [MIT LICENSE](LICENSE.txt).

## Contributing

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).
