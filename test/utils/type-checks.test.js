/**
 * Please note that `valiate()` is being tested through the two methods.
 */
const { checkTypeOptional, checkTypeRequired } = require('../../lib/utils/type-checks');

describe('input-validation', function () {
  // --------------------------------------------------------------------------
  // test checkTypeOptional()
  // --------------------------------------------------------------------------
  describe('checkTypeOptional', function () {
    it(`returns true for null values`, function () {
      expect(checkTypeOptional('name', null, 'string')).toBe(true);
    });

    it(`returns true when passed value matches type string`, function () {
      expect(checkTypeOptional('name', 'some-string', 'string')).toBe(true);
    });

    it(`returns true when passed value matches type booelan`, function () {
      expect(checkTypeOptional('name', true, 'boolean')).toBe(true);
    });

    it(`returns true when passed value matches type array`, function () {
      expect(checkTypeOptional('name', [1, 2, 3], 'array')).toBe(true);
    });

    it('throws an error for mismatching string type', function () {
      expect(() => {
        checkTypeOptional('name', 123, 'string');
      }).toThrow("Optional configuration setting 'name' not of type 'string'");
    });

    it('throws an error for mismatching boolean type', function () {
      expect(() => {
        checkTypeOptional('name', 123, 'boolean');
      }).toThrow("Optional configuration setting 'name' not of type 'boolean'");
    });

    it('throws an error for mismatching array type', function () {
      expect(() => {
        checkTypeOptional('name', 123, 'array');
      }).toThrow("Optional configuration setting 'name' not of type 'array'");
    });
  });

  // --------------------------------------------------------------------------
  // test checkTypeOptional()
  // --------------------------------------------------------------------------
  describe('checkTypeRequired', function () {
    it('throws an error if value is missing', function () {
      expect(() => {
        checkTypeRequired('name', null, 'string');
      }).toThrow("Required configuration setting 'name' is missing");
    });

    it(`returns true when passed value matches type string`, function () {
      expect(checkTypeRequired('name', 'some-string', 'string')).toBe(true);
    });

    it(`returns true when passed value matches type booelan`, function () {
      expect(checkTypeRequired('name', true, 'boolean')).toBe(true);
    });

    it(`returns true when passed value matches type array`, function () {
      expect(checkTypeRequired('name', [1, 2, 3], 'array')).toBe(true);
    });

    it('throws an error for mismatching string type', function () {
      expect(() => {
        checkTypeRequired('name', 123, 'string');
      }).toThrow("Required configuration setting 'name' not of type 'string'");
    });

    it('throws an error for mismatching boolean type', function () {
      expect(() => {
        checkTypeRequired('name', 123, 'boolean');
      }).toThrow("Required configuration setting 'name' not of type 'boolean'");
    });

    it('throws an error for mismatching array type', function () {
      expect(() => {
        checkTypeRequired('name', 123, 'array');
      }).toThrow("Required configuration setting 'name' not of type 'array'");
    });
  });
});
