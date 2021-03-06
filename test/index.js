'use strict'

const Schema = require('../');
const test = require('tape');

/* a json structure to test */
const testObject = {
  one: 'hello world',
  two: {
    three: {
      four: 4,
      five: [1, 3, 3]
    }
  }
};

/* custom schema that validates the json structure */
const exampleSchema = {

  one: {
    'value is one': v => {
      return v == 'hello world';
    }
  },

  two: {

    three: {

      four: {
        'should be a number': v => {
          return typeof v == 'number';
        },
        'should be greater than 0': v => {
          return v > 0;
        }

        /* more tests can go here */

      },

      five: {
        'has length three': v => {
          return v.length == 3;
        }
      }

    }
  }
};

const exampleBadSchema = {
  one: {
    'fails every time :)': v => {
      return f.m.l;
    }
  }
}

test('validate schema', t => {
  let schema = new Schema(exampleSchema);
  let result = schema.validate(testObject);
  t.ok(result.pass, 'schema validated');
  t.end();
});

test('validate schema with erros', t => {
  let schema = new Schema(exampleBadSchema);
  let result = schema.validate(testObject);
  t.ok(!result.pass, 'bad schema failed gracefully');
  t.end();
});
