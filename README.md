# sequelize-to-json-schemas

Convert Sequelize models into various JSON Schema variants.

- JSON Schema v7
- OpenAPI v3

> more strategies welcome, [examples found here](https://github.com/alt3/sequelize-to-json-schemas/tree/master/lib/strategies).

## Example

```javascript
const { SchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('./lib');
const schemaManager = new SchemaManager();

// now generate a JSON Schema Draft-07 schema
const schema = SchemaManager.generate(sequelizeModel, new JsonSchema7Strategy());

// and an OpenAPI 3.0 schema
schema = SchemaManager.generate(sequelizeModel, new OpenApi3Strategy());
```

## Why?

## TODO/Notes:

- [ ] add ci test for sequelize 4, 5
- [ ] use http or https schema pointers

#### Development tools

- [<img alt="ESLint" src="https://eslint.org/img/favicon.512x512.png" height="16"> ESLint](https://eslint.org/) with [`airbnb-base` config](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [<img alt="Prettier" src="https://prettier.io/icon.png" height="16"> Prettier](https://prettier.io/)
- [<img alt="Jest" src="https://jestjs.io/img/favicon/favicon.ico" height="16"> Jest](https://jestjs.io/)

## License

This project is released under [MIT LICENSE](LICENSE.txt).

## Contributing

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).
