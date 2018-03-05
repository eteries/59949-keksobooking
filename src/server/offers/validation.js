const Data = require(`../../data/data`);
const Schema = require(`async-validate`);

Schema.plugin([
  require(`async-validate/plugin/object`),
  require(`async-validate/plugin/string`),
  require(`async-validate/plugin/util`)
]);

const descriptor = {
  type: `object`,
  fields: {
    name: [
      {type: `string`, required: false},
      function (cb) {
        let val = false;
        Data.NAMES.forEach((elem) => {
          if (this.value === elem) {
            val = true;
          }
        });
        if (!val) {
          this.raise(`"name" field should contain one of this values: ${Data.NAMES}`);
        }
        cb();
      }
    ],
    title: [
      {type: `string`, required: true},
      function (cb) {
        if (this.value.length < 30 || this.value.length > 140) {
          this.raise(`"title" field length should be in range 30..140`);
        }
        cb();
      }
    ],
    type: [
      {type: `string`, required: true},
      function (cb) {
        let val = false;
        Data.TYPE.forEach((elem) => {
          if (this.value === elem) {
            val = true;
          }
        });
        if (!val) {
          this.raise(`"type" field should contain one of this values: ${Data.TYPE}`);
        }
        cb();
      }
    ],
    price: [
      {type: `string`, required: true},
      function (cb) {
        if (this.value < 1 || this.value > 100000) {
          this.raise(`"price" field value should be in range 1..100 000`);
        }
        cb();
      }
    ],
    address: [
      {type: `string`, required: true},
      function (cb) {
        if (this.value.length < 1 || this.value.length > 100) {
          this.raise(`"address" field length should be in range 1..100`);
        }
        cb();
      }
    ],
    timein: [
      {type: `string`, required: true},
      function (cb) {
        if (!this.value) {
          this.raise(`"timein" field value should be in format HH:mm`);
        }
        cb();
      }
    ],
    timeout: [
      {type: `string`, required: true},
      function (cb) {
        if (!this.value) {
          this.raise(`"timeout" field value should be in format HH:mm\``);
        }
        cb();
      }
    ],
    rooms: [
      {type: `string`, required: true},
      function (cb) {
        if (this.value < 1 || this.value > 1000) {
          this.raise(`"rooms" field value should be in range 1..1000`);
        }
        cb();
      }
    ],
    guests: [
      {type: `string`, required: true},
      function (cb) {
        if (this.value < 1 || this.value > 100) {
          this.raise(`"guests" field value should be in range 1..100`);
        }
        cb();
      }
    ],
    features: [
      {type: `string`, required: false},
      function (cb) {
        let val = false;
        Data.FEATURES.forEach((elem) => {
          if (this.value === elem) {
            val = true;
          }
        });
        if (!val) {
          this.raise(`"features" field may contain only this values: ${Data.FEATURES}`);
        }
        cb();
      }
    ],
    description: [
      {type: `string`, required: false},
      function (cb) {
        if (this.value.length < 1 || this.value.length > 300) {
          this.raise(`"description" field length should be in range 1..300`);
        }
        cb();
      }
    ]
  }
};

const schema = new Schema(descriptor);

module.exports = schema;
