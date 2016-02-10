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

    let self = this;
    let results = {
      pass: true,
      success: [],
      errors: []
    }

    traverse(schema).forEach(function() {

      if (this.level == 0 || !this.isLeaf) {
        return;
      }

      let key = this.path.join('-');

      if (self.validators[key] != null) {
        self.validators[key].forEach(v => {
          let success = v.test(this.node);
          if (success) {
            results.success.push(v.assert);
          } else {
            results.errors.push(v.assert);
            results.pass = false;
          }
        });
      }
    });

    return results;
  }

}

module.exports = Schema;
