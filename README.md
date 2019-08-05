# sequelize-to-json-schema

Convert Sequelize models into any of the following JSON Schema variants:

- JSON Schema v6
- Swagger/OpenAPI v2
- Swagger/OpenAPI v3

> PR a new strategy if your variant is missing.


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
