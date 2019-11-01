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

const capitalize = function(string) {
  if (typeof string !== 'string') {
    throw new TypeError("The 'string' argument for _capitalize() must be a string");
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

const pick = function(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }

    return obj;
  }, {});
};

// ---------------------------------------------------
// omit alternative taken from
// https://dustinpfister.github.io/2019/08/19/lodash_omit/
// ---------------------------------------------------
const inProps = function(key, props) {
  return props.some(omitKey => {
    return omitKey === key;
  });
};

const omit = function(object, properties) {
  const newObject = {};
  Object.keys(object).forEach(key => {
    if (!inProps(key, properties)) {
      newObject[key] = object[key];
    }
  });

  return newObject;
};

module.exports = {
  capitalize,
  omit,
  pick,
};
