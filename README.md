## Install
```
npm i js-struct --save
```

## Example
```javascript
const Schema = require('json-struct');

/* a json structure to test */
const test = {
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

/* custom schema that validates the json structure */
const schema = {

  one: {
    /* asserts that the value is equal to 'one' */
    'value is one': v => {
      return v == 'one';
    }
  },

  two: {

    /* complex nested structures work */
    three: {

      /* define as many assertions per node as you want */
      'value is two': v => {
        return v == 'two';
      },

      'is rigth length': v => {
        return v.length == 3;
      }
    },

    four: {
      five: {
        'is a number': v => {
          return typeof v == 'number';
        }
      }
    },

    five: {

      /* don't need worry about having duplicate keys are the same nest level */
      five: {
        'is greater than 4': v => {
          return v > 4;
        }
      }
    }
  }
}

const schema = new Schema(schema);
const result = schema.validate(test);
```
