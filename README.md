## Install
```
npm i json-struct --save
```

## Example
```javascript
const Schema = require('json-struct');

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
}

const schema = new Schema(exampleSchema);
const result = schema.validate(test);

test('validate schema', t => {
  let schema = new Schema(schema);
  let result = schema.validate(testObject);
  t.ok(result.pass, 'schema validated');
  t.end();
});
```
