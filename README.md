# npm-package-skeleton

Skeleton of a simple NPM Package with Babel and CI already configured.

#### Pre-configured development tools

- [<img alt="Babel" src="https://babeljs.io/img/favicon.png" height="16"> Babel](https://babeljs.io/)
- [<img alt="ESLint" src="https://eslint.org/img/favicon.512x512.png" height="16"> ESLint](https://eslint.org/) with [`airbnb-base` config](https://www.npmjs.com/package/eslint-config-airbnb-base)
- [<img alt="Prettier" src="https://prettier.io/icon.png" height="16"> Prettier](https://prettier.io/)
- [<img alt="Jest" src="https://jestjs.io/img/favicon/favicon.ico" height="16"> Jest](https://jestjs.io/)
- [<img alt="EditorConfig" src="https://editorconfig.org/favicon.ico" height="16"> EditorConfig](https://editorconfig.org/)

#### Pre-configured CI tools

- [<img alt="Travis CI" src="https://cdn.travis-ci.org/images/favicon-076a22660830dc325cc8ed70e7146a59.png" height="16"> Travis CI](https://travis-ci.org/) continuous integration platform
- [<img alt="NPM" src="https://static.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png" height="16"> NPM automatic releasing](https://docs.travis-ci.com/user/deployment/npm)
- [<img alt="Codecov" src="https://codecov.io/static/favicons/favicon-16x16.png" height="16"> Codecov](https://codecov.io/) code coverage reporting
- [<img alt="ESDoc" src="https://esdoc.org/favicon.ico" height="16"> ESDoc](https://esdoc.org/)

#### Recommended tools

- [<img alt="GreenKeeper" src="https://greenkeeper.io/favicon-16x16.png" height="16"> GreenKeeper](https://greenkeeper.io/)
- [<img alt="Snyk" src="https://res.cloudinary.com/snyk/image/upload/favicon/favicon.ico" height="16"> Snyk](https://snyk.io/)

## Getting started

1. Add this project as `skeleton` remote:

- For a new project:
  ```sh
  mkdir my-project && cd my-project
  git init
  git remote add skeleton https://github.com/amercier/npm-package-skeleton.git
  git remote set-url skeleton --push "Error: skeleton remote is read-only" # Disable pushing on skeleton
  git config remote.skeleton.tagOpt --no-tags # Disable fetching tags on skeleton
  git remote add origin <YOUR GIT REPOSITORY URL>
  git pull skeleton master
  git push -u origin master
  ```
- For an existing project:<br>
  <br>
  **Warning:** this will erase all existing code and git
  history on master branch, use `git reflog` if you ever need to rollback.
  ```sh
  git remote add skeleton https://github.com/amercier/npm-package-skeleton.git
  git remote set-url skeleton --push "Error: skeleton remote is read-only"
  git show-ref --verify --quiet refs/heads/master || git branch master # Create master branch if needed
  [[ refs/heads/master == $(git symbolic-ref --quiet HEAD) ]] || git checkout master # Switch to master branch
  git fetch skeleton
  git reset --hard skeleton/master # Warning: this rewrites git history
  git push -f -u origin master
  ```

2. Set initial version (ex: `0.1.0`) in `package.json`

3. Replace the following occurrences

- [ ] `amercier/npm-package-skeleton` → _your repo slug_
- [ ] `npm-package-skeleton` → _your project name_
- [ ] `package-skeleton` → _your NPM package name_
- [ ] `Alex Mercier` → _your name_
- [ ] `pro.alexandre.mercier@gmail.com` → _your public email address_
- [ ] `https://amercier.com` → _your website_

4. Import project in CI tools:

- [ ] [Travis CI](https://travis-ci.org/)
- [ ] [Codecov](https://codecov.io/)
- [ ] [ESDoc](https://doc.esdoc.org/-/generate.html)

5. Add the following environment variables in your new Travis CI project's settings:

- [ ] `NPM_AUTH_TOKEN`: NPM authentication token, used for automatic NPM releasing. See [documentation](https://docs.travis-ci.com/user/deployment/npm).

6. (Optional) Enable [GreenKeeper](https://greenkeeper.io/): `greenkeeper enable`.

7. (Optional) Enable [Snyk](https://snyk.io/) monitoring: `snyk monitor`.

8. (Optional) Add [plugin-add-module-exports Babel plugin](https://www.npmjs.com/package/babel-plugin-add-module-exports) to avoid users of your packages having to use `.default` in ES5 style (see install documentation below).

9. Cleanup `README.md` by removing all documentation related to the skeleton.

## Usage

### Automatic releasing process

> _Note:_ you can try this process safely by releasing an "alpha" version. Ex: 0.1.0-alpha.2

- [ ] Update the package version in `package.json` (ex: `1.2.3`), commit it, and push it.
- [ ] Tag the previously created commit (ex: `v1.2.3`), and push it (`git push --tags`).
- Travis build runs on tagged commit
- New package version is automatically released after tests have passed

## License

This project is released under [ISC License](LICENSE.md).

---

## **Note:** the content after this is the actual package documentation (to be edited after cloning).

# npm-package-skeleton

[![Latest Stable Version](https://img.shields.io/npm/v/package-skeleton.svg)](https://www.npmjs.com/package/package-skeleton)
[![Build Status](https://img.shields.io/travis/amercier/npm-package-skeleton/master.svg)](https://travis-ci.org/amercier/npm-package-skeleton)
[![NPM Downloads](https://img.shields.io/npm/dm/package-skeleton.svg)](https://www.npmjs.com/package/package-skeleton)

[![dependencies Status](https://david-dm.org/amercier/npm-package-skeleton/status.svg)](https://david-dm.org/amercier/npm-package-skeleton)
[![Test Coverage](https://img.shields.io/codecov/c/github/amercier/npm-package-skeleton/master.svg)](https://codecov.io/github/amercier/npm-package-skeleton?branch=master)
[![API Documentation](https://doc.esdoc.org/github.com/amercier/npm-package-skeleton/badge.svg)](https://doc.esdoc.org/github.com/amercier/npm-package-skeleton/)

## Installation

Prerequisites: [Node.js](https://nodejs.org/) 6+, **npm** 3+.

    npm install --save package-skeleton

## Usage

### ES5

    var xxx = require('package-skeleton').default;

### ES2015+

    import xxx from 'package-skeleton';

## Contributing

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).

[![devDependencies Status](https://david-dm.org/amercier/npm-package-skeleton/dev-status.svg)](https://david-dm.org/amercier/npm-package-skeleton?type=dev)

## License

[![License](https://img.shields.io/npm/l/package-skeleton.svg)](LICENSE.md)

---

<sup>_Created with [npm-p&#97;ckage-skeleton](https://github.com/amercier/npm-package-skeleton)._</sup>
