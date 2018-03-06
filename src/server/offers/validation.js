require(`async-validate/plugin/all`);

const Data = require(`../../data/data`);
const Schema = require(`async-validate`);
const ValidationError = require(`../validation-error`);


const cb = function (err, response) {
  if (err) {
    throw err;
  } else if (response) {
    const errors = [];

    response.errors.map((error) => {
      const obj = {
        'fieldName': error.field,
        'fieldValue': error.value,
        'errorMessage': error.message
      };
      errors.push(obj);
    });

    throw new ValidationError(errors);
  }
};


const descriptor = {
  type: `object`,
  fields: {
    name: {type: `enum`, required: false, list: Data.NAMES},
    title: {type: `string`, required: true, min: 30, max: 140},
    price: {type: `number`, required: true, min: 1, max: 100000},
    address: {type: `string`, required: true, min: 5, max: 100},
    rooms: {type: `number`, required: true, min: 1, max: 1000},
    guests: {type: `number`, required: true, min: 1, max: 10},
    features: {type: `enum`, required: true, list: Data.FEATURES},
    description: {type: `string`, required: false}
  }
};

const schema = new Schema(descriptor);

module.exports = {schema, cb};
