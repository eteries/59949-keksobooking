require(`async-validate/plugin/all`);

const Data = require(`../../data/data`);
const Schema = require(`async-validate`);
const ValidationError = require(`../validation-error`);

Schema.plugin([require(`./assertion`)]);


const callback = function (err, response) {
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
    title: {type: `string`, required: true, min: 30, max: 140},
    type: {type: `enum`, required: true, list: Data.TYPE},
    address: {type: `string`, required: true, min: 5, max: 100},
    description: {type: `string`, required: false, min: 5, max: 100},
    timein: {type: `string`, required: true, pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, message: `time format should be HH:mm`},
    timeout: {type: `string`, required: true, pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, message: `time format should be HH:mm`},
    price: {type: `number`, required: true, min: 1, max: 100000,
      transform(value) {
        return (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10));
      }
    },
    rooms: {type: `number`, required: true, min: 1, max: 1000,
      transform(value) {
        return (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10));
      }
    },
    guests: {type: `number`, required: true, min: 1, max: 10,
      transform(value) {
        return (Number.isNaN(parseInt(value, 10)) ? value : parseInt(value, 10));
      }
    },
    name: {type: `enum`, required: false, list: Data.NAMES},
    features: {type: `enum`, required: false, list: Data.FEATURES},
    avatar: {type: `isImage`, required: false},
    preview: {type: `isImage`, required: false}
  }
};

const schema = new Schema(descriptor);

module.exports = {schema, callback};
