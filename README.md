# sequelize-to-json-schemas

Convert Sequelize models into various JSON Schema variants like:

- JSON Schema v7
- OpenAPI v3

## Example

```javascript
const { SchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('./lib');
const schemaManager = new SchemaManager();

// now generate a JSON Schema Draft-07 schema
const schema = SchemaManager.generate(sequelizeModel, new JsonSchema7Strategy());

// and an OpenAPI 3.0 schema
schema = SchemaManager.generate(sequelizeModel, new OpenApi3Strategy());
```

## Notes:

- not published on npm yet (soon)
- more strategies welcome, [examples found here](https://github.com/alt3/sequelize-to-json-schemas/tree/master/lib/strategies)

## License

This project is released under [MIT LICENSE](LICENSE.txt).

## Contributing

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).
