/**
 * Create and validate schemas
 *
 * @author Wells Johnston <wells@littlstar.com>
 */

'use strict'

const traverse = require('traverse');

class Schema {

  /**
   * Creates the validators object
   *
   * @constructor
   * @param {Object} schema The schema to use as validators
   */

  constructor(schema) {

    let keys = {};

    /* traverses the schema and adds each test to the keys array */
    traverse(schema).forEach(function(func) {

      /* ignore the top level object (and leaves) */
      if (this.level == 0 || !this.isLeaf) {
        return;
      }

      /* the validator key is based on the path in the object to avoid overlaps */
      let key = this.path.slice(0, this.path.length - 1).join('-');
      keys[key] = keys[key] || [];

      keys[key].push({
        assert: this.path[this.path.length - 1],
        path: this.path.slice(0, this.path.length - 1),
        test: this.node
      });
    });

    this.keys = keys;
  }

  /**
   * Validates a schema, printing PASS or FAIL per test.
   *
   * @param {Object} schema The schema to validate.
   */

  validate(schema) {

    let results = {
      pass: true,
      success: [],
      errors: []
    };

    /* loop over each key (each can have an array of validators) */
    Object.keys(this.keys).forEach(key => {

      /* for each key, run each validator function */
      this.keys[key].forEach(validator => {

        let path = validator.path.slice();
        let value = schema[path.shift()];

        /* check the property exists */
        while (path.length > 0) {
          if (value == null) {
            results.errors.push(`key does not exist: Object.${validator.path.join('.')}`);
            return;
          }
          value = value[path.shift()];
        }

        let key = validator.path[validator.path.length - 1];
        let success = null;
        let message = null;

        try {
          success = validator.test(value);
          message = `${key} ${validator.assert}`;
        } catch (e) {
          success = false;
          message = `Error running validation function for key: ${key}`;
        }

        if (success) {
          results.success.push(message);
        } else {
          results.errors.push(message);
          results.pass = false;
        }
      });
    });

    return results;
  }

}

module.exports = Schema;
