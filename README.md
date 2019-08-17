# sequelize-to-json-schemas

Convert Sequelize models into various JSON Schema variants.

## Supported Schemas

- JSON Schema v7
- OpenAPI v3

> more strategies welcome, [examples found here](https://github.com/alt3/sequelize-to-json-schemas/tree/master/lib/strategies).

## Example

```javascript
const { SchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('./lib');
const schemaManager = new SchemaManager();

// generate a JSON Schema Draft-07 schema
const strategy = new JsonSchema7Strategy();
const schema = SchemaManager.generate(sequelizeModel, strategy);

// and an OpenAPI 3.0 schema
strategy = new OpenApi3Strategy();
schema = SchemaManager.generate(sequelizeModel, strategy);
```

## Why?

## TODO/Notes:

- [ ] support sequelize 4, 5 (and 6?)
- [ ] use http or https schema pointers

#### Development tools

- [<img alt="Babel" src="https://babeljs.io/img/favicon.png" height="16"> Babel](https://babeljs.io/)
- [<img alt="ESLint" src="https://eslint.org/img/favicon.512x512.png" height="16"> ESLint](https://eslint.org/) with [`airbnb-base` config](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [<img alt="Prettier" src="https://prettier.io/icon.png" height="16"> Prettier](https://prettier.io/)
- [<img alt="Jest" src="https://jestjs.io/img/favicon/favicon.ico" height="16"> Jest](https://jestjs.io/)

## Usage

### Automatic releasing process

> _Note:_ you can try this process safely by releasing an "alpha" version. Ex: 0.1.0-alpha.2

- [ ] Update the package version in `package.json` (ex: `1.2.3`), commit it, and push it.
- [ ] Tag the previously created commit (ex: `v1.2.3`), and push it (`git push --tags`).
- Travis build runs on tagged commit
- New package version is automatically released after tests have passed

## License

This project is released under [MIT LICENSE](LICENSE.txt).

## Contributing

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).
