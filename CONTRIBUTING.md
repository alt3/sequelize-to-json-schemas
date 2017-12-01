Contributing
============

Issues
------

Feel free to [open an issue](https://github.com/amercier/npm-package-skeleton/issues/new),
or propose a [pull request](https://github.com/amercier/npm-package-skeleton/pulls).
To prevent duplication, please look at [existing issues](https://github.com/amercier/npm-package-skeleton/issues?q=is%3Aissue) before posting a new one.

TL;DR
-----

| Command         | Description |
|-----------------|-------------|
| `npm test`      | Runs test suite once using Mocha. Generates code coverage report in the `coverage` directory (run `open coverage/index.html` to view full HTML report). |
| `npm start`     | Runs test once, watch for changes in dev/test files, then re-runs tests automatically when a file changes. <br><small>_**Note:** as opposed as `npm test`, it doesn't generate a code coverage report._</small> |
| `npm run lint`  | Runs ESLint linter. <br><small>_**Note:** this is automatically run before the test suite by `npm test`, but not by `npm start`_.</small> |
| `npm run doc`   | Generates API documentation in `esdoc` folder. <br><small>_**Note:** this is not expected to be run manually since ESDoc hosting service runs it for you._</small>  |
| `npm transpile` | Transpile all files from `src` directory to `dist`, using Babel. <br><small>_**Note:** this is not expected to be run manually since it is automatically run before NPM packaging (`package.json`'s `prepublish` script)._</small> |



Getting started
---------------

#### Step 1. Checkout repository

_**Prerequisites:** you need to have `git`, `node` (>=0.10) and `npm` installed_.

```bash
git clone https://github.com/amercier/npm-package-skeleton.git
```

_(or your clone's Git URL)_

#### Step 2. Install NPM dependencies

```bash
npm install
```

#### Step 3. Run tests (run-once mode)

```bash
npm test
```

```log
> package-skeleton@0.1.0-alpha.2 test /.../npm-package-skeleton
> npm run lint && rm -rf coverage && istanbul cover _mocha -- specs --recursive --compilers js:babel-register


> package-skeleton@0.1.0-alpha.2 lint /.../npm-package-skeleton
> eslint .



  myModule
    ✓ exists
    ✓ is true


  2 passing (21ms)


----------|----------|----------|----------|----------|----------------|
File      |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------|----------|----------|----------|----------|----------------|
All files |      100 |      100 |      100 |      100 |                |
 index.js |      100 |      100 |      100 |      100 |                |
----------|----------|----------|----------|----------|----------------|
```

#### Step 4. Run tests (TDD mode)

```bash
npm start
```

Coding standards
----------------

This project follows [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript). It is enforced at build time by [ESLint](http://eslint.org/).
