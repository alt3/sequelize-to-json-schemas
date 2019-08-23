const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;

/**
 * Checks if the given DataType is supported by the current Sequelize version.
 *
 * @param {string} dataType Name of the DataType, e.g. CITEXT
 * @returns {boolean} True if not available
 */
function supportedDataType(dataType) {
  if (DataTypes[dataType]) {
    return true;
  }

  return false;
}

module.exports = supportedDataType;
