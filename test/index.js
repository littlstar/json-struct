'use strict'

const Schema = require('../');
const test = require('tape');

const schema1 = {

  one: {
    'is one': v => {
      return v == 'one';
    }
  },

  two: {
    two: {
      'is two': v => {
        return v == 'two';
      },
      'is rigth length': v => {
        return v.length == 3;
      }
    },

    three: {
      four: {
        'is 4': v => {
          return v == 4;
        }
      }
    },

    four: {
      five: {
        'is greater than 4': v => {
          return v == 5;
        }
      }
    }
  }
}

const testSchema = {
  one: 'one',
  two: {
    two: 'two',
    three: {
      four: 4
    },
    four: {
      five: 5
    }
  }
};

test('validate schema', t => {
  let schema = new Schema(schema1);
  let result = schema.validate(testSchema);
  t.ok(result.pass, 'schema validated');
  t.end();
});
