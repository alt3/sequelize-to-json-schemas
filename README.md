[![NPM Version](https://img.shields.io/npm/v/@alt3/sequelize-to-json-schemas?style=flat-square)](https://www.npmjs.com/package/@alt3/sequelize-to-json-schemas)
[![Build Status](https://img.shields.io/travis/alt3/sequelize-to-json-schemas/master.svg?style=flat-square)](https://travis-ci.org/alt3/sequelize-to-json-schemas)
![Greenkeeper Enabled](https://badges.greenkeeper.io/alt3/sequelize-to-json-schemas.svg?style=flat-square)
![NPM Total Downloads](https://img.shields.io/npm/dt/@alt3/sequelize-to-json-schemas.svg?style=flat-square)
[![Code Coverage](https://img.shields.io/codecov/c/github/alt3/sequelize-to-json-schemas.svg?style=flat-square)](https://codecov.io/gh/alt3/sequelize-to-json-schemas)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/alt3/sequelize-to-json-schemas?style=flat-square)](https://codeclimate.com/github/alt3/sequelize-to-json-schemas)

# sequelize-to-json-schemas

Convert Sequelize models into various JSON Schema variants (using the Strategy Pattern).

## Supported Schemas

- JSON Schema Draft-07
- OpenAPI 3.0

> More welcome, [inspiration found here](https://github.com/alt3/sequelize-to-json-schemas/tree/master/lib/strategies)

## Installation

```bash
npm install @alt3/sequelize-to-json-schemas --save
```

## Usage

<!-- prettier-ignore-start -->
```javascript
const { JsonSchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('@alt3/sequelize-to-json-schemas');
const schemaManager = new JsonSchemaManager();

// now generate a JSON Schema Draft-07 model schema
let schema = schemaManager.generate(userModel, new JsonSchema7Strategy());

// and/or the OpenAPI 3.0 equivalent
schema = schemaManager.generate(userModel, new OpenApi3Strategy());
```
<!-- prettier-ignore-end -->

## Main Goals

- understandable code, highly maintainable
- support for Sequelize versions 4, 5 and beyond
- valid schemas (enforced by the [ajv](https://github.com/epoberezkin/ajv) and [Swagger Parser](https://github.com/APIDevTools/swagger-parser) validators)
- JsonSchemaManager for single (rock solid) core functionality shared between all strategies
- StrategyInterface for simplified implementation of new schema variants

## Configuration Options

To configure global options use the JsonSchemaManager initialization:

```javascript
const schemaManager = new JsonSchemaManager({
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
  include: ['someAttribute'],
  associations: true,
  excludeAssociations: ['someAssociation'],
  includeAssociations: ['someAssociation'],
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
