require(`async-validate/plugin/all`);

const Data = require(`../../data/data`);
const Schema = require(`async-validate`);
const ValidationError = require(`../validation-error`);


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
    name: {type: `enum`, required: false, list: Data.NAMES},
    title: {type: `string`, required: false, min: 30, max: 140},
    price: {type: `number`, required: false, min: 1, max: 100000},
    address: {type: `string`, required: false, min: 5, max: 100},
    timein: {type: `string`, required: true, pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, message: `time format should be HH:mm`},
    timeout: {type: `string`, required: true, pattern: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, message: `time format should be HH:mm`},
    rooms: {type: `number`, required: true, min: 1, max: 1000},
    guests: {type: `number`, required: false, min: 1, max: 10},
    features: {type: `enum`, required: false, list: Data.FEATURES},
    description: {type: `string`, required: false, min: 5, max: 100},
    avatar: function (cb) {
      const fileExt = this.value[0].mimetype;
      if (fileExt !== `image/jpg` && fileExt !== `image/png`) {
        this.raise(`avatar should be an image`);
      }
      cb();
    }
  }
};

const schema = new Schema(descriptor);

module.exports = {schema, callback};
