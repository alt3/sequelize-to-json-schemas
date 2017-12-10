npm-package-skeleton
====================

Skeleton of a simple NPM Package with Babel and CI already configured.

#### Pre-configured development tools

- [<img alt="Babel" src="https://babeljs.io/favicon-16x16.png" height="16"> Babel](https://babeljs.io/)
- [<img alt="ESLint" src="http://eslint.org/img/favicon.512x512.png" height="16"> ESLint](http://eslint.org/)
- [<img alt="Mocha" src="https://mochajs.org/favicon.ico" height="16"> Mocha](https://mochajs.org/)
- [<img alt="Chai" src="http://chaijs.com/img/favicon.ico" height="16"> Chai](http://chaijs.com/)
- [<img alt="SinonJS" src="http://sinonjs.org/assets/images/favicon.png" height="16"> SinonJS](http://sinonjs.org/)
- [<img alt="Istanbul" src="https://istanbul.js.org/assets/istanbul-logo.png" height="16"> Istanbul](https://github.com/gotwarlost/istanbul)
- [<img alt="EditorConfig" src="http://editorconfig.org/favicon.ico" height="16"> EditorConfig](http://editorconfig.org/)

#### Pre-configured CI tools

- [<img alt="Travis CI" src="https://cdn.travis-ci.org/images/favicon-076a22660830dc325cc8ed70e7146a59.png" height="16"> Travis CI](https://travis-ci.org/) continuous integration platform
- [<img alt="NPM" src="https://www.npmjs.com/static/images/touch-icons/favicon-16x16.png" height="16"> NPM automatic releasing](https://docs.travis-ci.com/user/deployment/npm)
- [<img alt="Codecov" src="https://d234q63orb21db.cloudfront.net/685e381330164f79197bc0e7f75035c6f1b9d7d0/media/images/favicon.png" height="16"> Codecov](https://codecov.io/) code coverage reporting
- [<img alt="Code Climate" src="https://codeclimate.com/favicon.png" height="16"> Code Climate](https://codeclimate.com/)
- [<img alt="Gemnasium" src="https://gemnasium.com/assets/favicon.png" height="16"> Gemnasium](https://gemnasium.com/)
- [<img alt="ESDoc" src="https://esdoc.org/favicon.ico" height="16"> ESDoc](https://esdoc.org/)

#### Recommended tools

- [<img alt="GreenKeeper" src="http://greenkeeper.io/favicon-16x16.png" height="16"> GreenKeeper](http://greenkeeper.io/)
- [<img alt="Snyk" src="https://res.cloudinary.com/snyk/image/upload/favicon/favicon.ico" height="16"> Snyk](https://snyk.io/)

## Getting started

1. Add this project as `skeleton` remote:
  - For a new project:
    ```sh
    mkdir my-project && cd my-project
    git init
    git remote add skeleton https://github.com/amercier/npm-package-skeleton.git
    git remote set-url skeleton --push "Error: skeleton remote is read-only"
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
    git reset --hard skeleton/master # Warning: this rewrites git history
    git push -f -u origin master
    ```

2. Set initial version (ex: `0.1.0`) in `package.json`

3. Replace the following occurrences
  - [ ] `amercier/npm-package-skeleton` → *your repo slug*
  - [ ] `npm-package-skeleton` → *your project name*
  - [ ] `package-skeleton` → *your NPM package name*
  - [ ] `Alex Mercier` → *your name*
  - [ ] `pro.alexandre.mercier@gmail.com` → *your public email address*
  - [ ] `http://amercier.com` → *your website*

4. Import project in CI tools:
  - [ ] [Travis CI](https://travis-ci.org/)
  - [ ] [Codecov](https://codecov.io/)
  - [ ] [Code Climate](https://codeclimate.com/github/signup)
  - [ ] [Gemnasium](https://gemnasium.com/)
  - [ ] [ESDoc](https://doc.esdoc.org/-/generate.html)

5. Add the following environment variables in your new Travis CI project's settings:
  - [ ] `NPM_AUTH_TOKEN`: NPM authentication token, used for automatic NPM releasing. See [documentation](https://docs.travis-ci.com/user/deployment/npm).
  - [ ] `CC_TEST_REPORTER_ID`: CodeClimate project's token, used for code coverage reporting to CodeClimate.

6. (Optional) Enable [GreenKeeper](http://greenkeeper.io/): `greenkeeper enable`.

7. (Optional) Enable [Snyk](https://snyk.io/) monitoring: `snyk monitor`.

8. (Optional) Add [plugin-add-module-exports Babel plugin](https://www.npmjs.com/package/babel-plugin-add-module-exports) to avoid users of your packages having to use `.default` in ES5 style (see install documentation below).

9. Cleanup `README.md` by removing all documentation related to the skeleton.

## Usage

### Automatic releasing process

> *Note:* you can try this process safely by releasing an "alpha" version. Ex: 0.1.0-alpha.2

- [ ] Update the package version in `package.json` (ex: `1.2.3`), commit it, and push it.
- [ ] Tag the previously created commit (ex: `v1.2.3`), and push it (`git push --tags`).
- Travis build runs on tagged commit
- New package version is automatically released after tests have passed

License
-------

This project is released under [ISC License](LICENSE.md).

---
## **Note:** the content after this is the actual package documentation (to be edited after cloning).

npm-package-skeleton
====================

[![Latest Stable Version](https://img.shields.io/npm/v/package-skeleton.svg)](https://www.npmjs.com/package/package-skeleton)
[![License](https://img.shields.io/npm/l/package-skeleton.svg)](https://www.npmjs.com/package/package-skeleton)
[![Build Status](https://img.shields.io/travis/amercier/npm-package-skeleton/master.svg)](https://travis-ci.org/amercier/npm-package-skeleton)

[![Dependency Status](http://img.shields.io/gemnasium/amercier/npm-package-skeleton.svg)](https://gemnasium.com/amercier/npm-package-skeleton)
[![NPM Downloads](https://img.shields.io/npm/dm/package-skeleton.svg)](https://www.npmjs.com/package/package-skeleton)
[![Test Coverage](https://img.shields.io/codecov/c/github/amercier/npm-package-skeleton/master.svg)](https://codecov.io/github/amercier/npm-package-skeleton?branch=master)
[![API Documentation](https://doc.esdoc.org/github.com/amercier/npm-package-skeleton/badge.svg)](https://doc.esdoc.org/github.com/amercier/npm-package-skeleton/)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/amercier/npm-package-skeleton.svg)](https://codeclimate.com/github/amercier/npm-package-skeleton)
[![Greenkeeper](https://badges.greenkeeper.io/amercier/npm-package-skeleton.svg)](https://github.com/amercier/npm-package-skeleton/issues?q=label%3Agreenkeeper)

<sup><sub>_Created with [npm-p&#97;ckage-skeleton](https://github.com/&#97;mercier/npm-p&#97;ckage-skeleton)._</sup></sub>


Installation
------------

    npm install --save package-skeleton

Usage
-----

### ES5

    var xxx = require('package-skeleton').default;

### ES2015+

    import xxx from 'package-skeleton';


License
-------

This project is released under [ISC License](LICENSE.md).
