# sequelize-to-json-schemas

Convert Sequelize models into various JSON Schema variants (using the Strategy Pattern).

## Supported Schemas

- JSON Schema v7
- OpenAPI v3

> More welcome, [examples found here](https://github.com/alt3/sequelize-to-json-schemas/tree/master/lib/strategies)

## Installation

```bash
npm install @alt3/sequelize-to-json-schemas@"<1.0.0" --save
```

## Example

```javascript
const {
  SchemaManager,
  JsonSchema7Strategy,
  OpenApi3Strategy,
} = require('sequelize-to-json-schemas');
const schemaManager = new SchemaManager();

// generate a JSON Schema Draft-07 model schema
let schema = schemaManager.generate(userModel, new JsonSchema7Strategy());

// and/or the OpenAPI 3.0 equivalent
schema = schemaManager.generate(userModel, new OpenApi3Strategy());
```

## Additional Information

- understandable code
- compatible with Sequelize v4 and v5
- generates valid schemas (test suite using [ajv](https://github.com/epoberezkin/ajv) and [Swagger Parser](https://github.com/APIDevTools/swagger-parser) validators)

## Strategy Pattern

This library uses the Strategy Pattern to achieve the following:

- create rock-solid core functionality only once
- simplify support for new/upcoming schema variants

## License

This project is released under [MIT LICENSE](LICENSE.txt).

## Contributing

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).
