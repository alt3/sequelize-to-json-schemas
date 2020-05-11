/**
 * DRY function for checking if passed value is of expected type.
 *
 * @param {string} name Name of setting to check
 * @param {object} value Value to check
 * @param {string} type Type to match
 * @param {string} errorPrefix String to prepend thrown error with
 * @returns {bool}
 * @throws {TypeError}
 */
function checkType(name, value, type, errorPrefix) {
  if (type === 'array' && !Array.isArray(value)) {
    throw new TypeError(`${errorPrefix} configuration setting '${name}' not of type '${type}'`);
  }

  // eslint-disable-next-line valid-typeof
  if (type !== 'array' && typeof value !== type) {
    throw new TypeError(`${errorPrefix} configuration setting '${name}' not of type '${type}'`);
  }

  return true;
}

/**
 * Checks if optional value is of expected type.
 *
 * @param {string} name Object to check
 * @param {object} value Object to check
 * @param {string} type Property type
 * @returns {bool}
 * @throws {TypeError}
 */
const checkTypeOptional = function (name, value, type) {
  if (value === null) {
    return true;
  }

  return checkType(name, value, type, 'Optional');
};

/**
 * Checks if required value is of expected type.
 *
 * @param {string} name Object to check
 * @param {object} value Object to check
 * @param {string} type Property type
 * @returns {bool}
 * @throws {TypeError}
 */
const checkTypeRequired = function (name, value, type) {
  if (value === null) {
    throw new TypeError(`Required configuration setting '${name}' is missing`);
  }

  return checkType(name, value, type, 'Required');
};

module.exports = {
  checkTypeOptional,
  checkTypeRequired,
};
