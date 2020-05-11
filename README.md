[![NPM Version](https://img.shields.io/npm/v/@alt3/sequelize-to-json-schemas?style=flat-square)](https://www.npmjs.com/package/@alt3/sequelize-to-json-schemas)
[![Build Status](https://img.shields.io/travis/alt3/sequelize-to-json-schemas/master.svg?style=flat-square)](https://travis-ci.org/alt3/sequelize-to-json-schemas)
[![Known Vulnerabilities](https://snyk.io/test/github/alt3/sequelize-to-json-schemas/badge.svg)](https://snyk.io/test/github/alt3/sequelize-to-json-schemas)
![NPM Total Downloads](https://img.shields.io/npm/dt/@alt3/sequelize-to-json-schemas.svg?style=flat-square)
[![Code Coverage](https://img.shields.io/codecov/c/github/alt3/sequelize-to-json-schemas.svg?style=flat-square)](https://codecov.io/gh/alt3/sequelize-to-json-schemas)
[![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/alt3/sequelize-to-json-schemas?style=flat-square)](https://codeclimate.com/github/alt3/sequelize-to-json-schemas)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg?style=flat-square)](https://www.contributor-covenant.org/version/2/0/code_of_conduct)

# sequelize-to-json-schemas

Convert Sequelize models into these JSON Schema variants (using the Strategy Pattern):

- JSON Schema Draft-07 - [sample output](examples/json-schema-v7.md)
- OpenAPI 3.0 - [sample output](examples/openapi-v3.md)

Compatible with Sequelize versions 4, 5 and 6.

## Main Goals

- understandable code, highly maintainable
- valid schemas (enforced by the [ajv](https://github.com/epoberezkin/ajv) and [Swagger Parser](https://github.com/APIDevTools/swagger-parser) validators)
- JsonSchemaManager for single (rock solid) core functionality shared between all strategies
- StrategyInterface for simplified implementation of new schema variants

> Feel free to PR strategies for missing schemas

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

## Configuration Options

To configure global options use the JsonSchemaManager initialization:

```javascript
const schemaManager = new JsonSchemaManager({
  baseUri: '/',
  absolutePaths: true,
  secureSchemaUri: true,
  disableComments: true,
});
```

To configure (per) model options use the `generate()` method:

```javascript
const userSchema = schemaManager.generate(userModel, strategy, {
  title: 'Custom model title',
  description: 'Custom model description',
  exclude: ['someAttribute'],
  include: ['someAttribute'],
  associations: true,
  excludeAssociations: ['someAssociation'],
  includeAssociations: ['someAssociation'],
});
```

The following Sequelize attribute options are automatically converted into
schema properties:

```javascript
module.exports = (sequelize) => {
  const model = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Default Value',
      associate: {},
    },
  });

  return model;
};
```

To configure additional schema properties add a `jsonSchema` property with
one or more of the following custom options to your Sequelize attribute:

```javascript
module.exports = (sequelize) => {
  const model = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      jsonSchema: {
        description: 'Custom attribute description',
        comment: 'Custom attribute comment',
        examples: ['Custom example 1', 'Custom example 2'],
        readOnly: true, // OR writeOnly: true
      },
    },
  });

  return model;
};
```

In order to create a valid output for `JSON` columns, or to otherwise override
the schema output for a particular sequelize attribute, add a `schema` attribute:

```javascript
module.exports = (sequelize) => {
  const model = sequelize.define('user', {
    // ...
    settings: {
      type: DataTypes.JSON,
      jsonSchema: {
        schema: { type: 'object' },
      },
    },
  });

  return model;
};
```

## Framework Integrations

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/alt3/sequelize-to-json-schemas/issues/17"><img src="https://raw.githubusercontent.com/feathersjs/docs/master/.vuepress/public/img/logo-title.jpg" width="100px;" alt=""/><br /><h3>Feathers</h3></td>
  </tr>
</table>

## License

This project is released under [MIT LICENSE](LICENSE.txt).

## Contributing

Please refer to the [guidelines for contributing](./contributing.md).
