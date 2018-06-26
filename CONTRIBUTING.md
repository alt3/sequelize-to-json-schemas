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
| `npm test`      | Runs test suite once using [Jest](http://jestjs.io/). |
| `npm start`     | Runs test once, watch for changes in dev/test files, then re-runs tests automatically when a file changes. |
| `npm run lint`  | Runs [ESLint](https://eslint.org/) linter. |

Getting started
---------------

#### Step 1. Checkout repository

_**Prerequisites:** you need to have `git`, `node` (>=6) and `npm` installed_.

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
> package-skeleton@1.0.4 test ./npm-package-skeleton
> jest

 PASS  specs/lib/index.spec.js
  myModule
    ✓ exists (4ms)
    ✓ returns true

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.558s, estimated 1s
Ran all test suites.
```

**Note:** Use `npm test -- --coverage` to generate code coverage report in the `coverage` directory, and `open coverage/index.html` to view full HTML report.

#### Step 4. Run tests (TDD mode)

```bash
npm start
```

Coding standards
----------------

This project follows [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript). It is enforced at build time by [ESLint](http://eslint.org/).

```bash
npm lint
```

**Note:** this is automatically run before the test suite by `npm test`, but not by `npm start`

Other commands
--------------

| Command             | Description |
|---------------------|-------------|
| `npm run doc`       | Generates API documentation in `esdoc` folder. Not expected to be run manually, since ESDoc hosting service runs it already.  |
| `npm run transpile` | Transpile all files from `src` directory to `dist`, using Babel. Not expected to be run manually, since it is automatically run before NPM packaging (`package.json`'s `prepublish` script). |
