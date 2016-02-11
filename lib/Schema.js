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

    let validators = {};

    traverse(schema).forEach(function(func) {
      if (this.level == 0 || !this.isLeaf) {
        return;
      }
      let key = this.path.slice(0, this.path.length - 1).join('-');
      if (validators[key] == null) {
        validators[key] = [];
      }
      validators[key].push({
        assert: this.path[this.path.length - 1],
        path: this.path.slice(0, this.path.length - 1),
        test: this.node
      });
    });

    this.validators = validators;
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

    /* iterate over each validator */
    Object.keys(this.validators).forEach(i => {

      /* run each test on the respective value */
      this.validators[i].forEach(validator => {

        let path = validator.path.slice();
        let value = schema[path.shift()];

        while (path.length > 0) {
          if (value == null) {
            results.errors.push(`key does not exist: Object.${validator.path.join('.')}`);
            return;
          }
          value = value[path.shift()];
        }

        let success = validator.test(value);
        let key = validator.path[validator.path.length - 1]
        let message = `${key} ${validator.assert}`;

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
