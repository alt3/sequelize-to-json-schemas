/**
 * Native alternatives for lodash.
 *
 * Please note:
 * - not using alternatives that do not work cross-browser (see link)
 * - disabling eslint rules so examples stay identical to github
 *
 * @see {@link https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore}
 */

/* eslint-disable func-names */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable unicorn/prevent-abbreviations  */

const pick = function(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

module.exports = {
  pick,
};
