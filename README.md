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

console.log(result);
```

## Output
```json
{
  "pass": true,
  "success": [
    "one value is one",
    "four should be a number",
    "four should be greater than 0",
    "five has length three"
  ],
  "errors": []
}
```
