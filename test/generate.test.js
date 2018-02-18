const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const {URL} = require(`url`);

const generate = require(`../src/generate.js`);
const {generateEntity} = require(`../src/generator`);
const Data = require(`../src/data/data.js`);

describe(`Generate JSON file`, () => {
  it(`should create json file`, () => {
    const filePath = `${__dirname}/testFile.json`;
    return generate.execute(filePath)
        .then(() => access(filePath))
        .then(() => unlink(filePath));
  });
});

describe(`JSON author object check`, () => {
  let dataObj;
  before(() => {
    dataObj = generateEntity();
  });

  it(`should exist`, () => {
    assert.notEqual(typeof dataObj.author, `undefined`);
  });

  describe(`author.avatar field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.author.avatar, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.author.avatar, `string`);
    });

    it(`should have an http or https protocol`, () => {
      const myURL = new URL(dataObj.author.avatar);
      const val = (myURL.protocol === `http:` || myURL.protocol === `https:`);
      assert.equal(val, true);
    });

    it(`should have a valid domain`, () => {
      const myURL = new URL(dataObj.author.avatar);
      assert.equal(myURL.hostname, `robohash.org`);
    });

    it(`shouldn't have a blank path`, () => {
      const myURL = new URL(dataObj.author.avatar);
      assert.notEqual(myURL.pathname, `/`);
    });
  });
});

describe(`JSON offer object check`, () => {
  let dataObj;
  before(() => {
    dataObj = generateEntity();
  });

  it(`should exist`, () => {
    assert.notEqual(typeof dataObj.offer, `undefined`);
  });

  describe(`offer.title field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.title, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.offer.title, `string`);
    });

    it(`should have one of the values: ${Data.TITLE}`, () => {
      let val = false;

      function comparison(elem) {
        if (dataObj.offer.title === elem) {
          val = true;
        }
      }
      Data.TITLE.forEach(comparison);
      assert.equal(val, true);
    });
  });

  describe(`offer.address field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.address, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.offer.address, `string`);
    });

    it(`should have two values`, () => {
      let coordinates = dataObj.offer.address.split(`, `);
      assert.equal(coordinates.length, 2);
    });

    it(`should have values dataObj.location.x, dataObj.location.y`, () => {
      function comparison(arr) {
        if (+arr[0] === dataObj.location.x && +arr[1] === dataObj.location.y) {
          return true;
        } else {
          return false;
        }
      }
      let coordinates = dataObj.offer.address.split(`, `);
      assert.equal(comparison(coordinates), true);
    });
  });

  describe(`offer.price field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.price, `undefined`);
    });

    it(`should have a num value`, () => {
      assert.equal(typeof dataObj.offer.price, `number`);
    });

    it(`should have a value >= 1000 and <= 1 000 000`, () => {
      let val = (dataObj.offer.price >= 1000 && dataObj.offer.price <= 1000000);
      assert.equal(val, true);
    });
  });

  describe(`offer.type field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.type, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.offer.type, `string`);
    });

    it(`should have one of the values: ${Data.TYPE}`, () => {
      let val = false;

      function comparison(elem) {
        if (dataObj.offer.type === elem) {
          val = true;
        }
      }
      Data.TYPE.forEach(comparison);
      assert.equal(val, true);
    });
  });

  describe(`offer.rooms field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.rooms, `undefined`);
    });

    it(`should have a number value`, () => {
      assert.equal(typeof dataObj.offer.rooms, `number`);
    });

    it(`should have a value >= 1 and <= 5`, () => {
      let val = (dataObj.offer.rooms >= 1 && dataObj.offer.rooms <= 5);
      assert.equal(val, true);
    });
  });

  describe(`offer.guests field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.guests, `undefined`);
    });

    it(`should have a number value`, () => {
      assert.equal(typeof dataObj.offer.guests, `number`);
    });

    it(`should have a value >= 1 and <= 15`, () => {
      let val = (dataObj.offer.guests >= 1 && dataObj.offer.guests <= 15);
      assert.equal(val, true);
    });
  });

  describe(`offer.checkin field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.checkin, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.offer.checkin, `string`);
    });

    it(`should have one of the values: ${Data.TIME}`, () => {
      let val = false;

      function comparison(elem) {
        if (dataObj.offer.checkin === elem) {
          val = true;
        }
      }
      Data.TIME.forEach(comparison);
      assert.equal(val, true);
    });
  });

  describe(`offer.checkout field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.checkout, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.offer.checkout, `string`);
    });

    it(`should have one of the values: ${Data.TIME}`, () => {
      let val = false;

      function comparison(elem) {
        if (dataObj.offer.checkout === elem) {
          val = true;
        }
      }
      Data.TIME.forEach(comparison);
      assert.equal(val, true);
    });
  });

  describe(`offer.features field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.features, `undefined`);
    });

    it(`must be an array`, () => {
      assert.equal(Array.isArray(dataObj.offer.features), true);
    });

    it(`offer.features length should be >= 1 and <= ${Data.FEATURES.length}`, () => {
      let val = (dataObj.offer.features.length >= 1 && dataObj.offer.features.length <= Data.FEATURES.length);
      assert.equal(val, true);
    });

    it(`must contain only this values: ${Data.FEATURES}`, () => {
      function comparison(elem) {
        return Data.FEATURES.includes(elem);
      }
      assert.equal(dataObj.offer.features.every(comparison), true);
    });

    it(`should have no duplicates`, () => {
      function hasDuplicates(array) {
        let valuesSoFar = Object.create(null);
        for (let i = 0; i < array.length; ++i) {
          let value = array[i];
          if (value in valuesSoFar) {
            return true;
          }
          valuesSoFar[value] = true;
        }
        return false;
      }
      assert.notEqual(hasDuplicates(dataObj.offer.features), true);
    });
  });

  describe(`offer.description field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.description, `undefined`);
    });

    it(`should have a string value`, () => {
      assert.equal(typeof dataObj.offer.description, `string`);
    });

    it(`string value must be empty`, () => {
      assert.equal(dataObj.offer.description.length, 0);
    });
  });

  describe(`offer.photos field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.offer.photos, `undefined`);
    });

    it(`must be an array`, () => {
      assert.equal(Array.isArray(dataObj.offer.photos), true);
    });

    it(`should not be empty`, () => {
      assert.notEqual(dataObj.offer.photos.length, 0);
    });

    it(`must contain only photos`, () => {
      function comparison(elem) {
        return Data.PHOTOS.includes(elem);
      }
      assert.equal(dataObj.offer.photos.every(comparison), true);
    });
  });
});

describe(`JSON location object check`, () => {
  let dataObj;
  before(() => {
    dataObj = generateEntity();
  });

  it(`should exist`, () => {
    assert.notEqual(typeof dataObj.location, `undefined`);
  });

  describe(`location.x field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.location.x, `undefined`);
    });

    it(`should have a num value`, () => {
      assert.equal(typeof dataObj.location.x, `number`);
    });

    it(`should have a value >= 300 and <= 900`, () => {
      let val = (dataObj.location.x >= 300 && dataObj.location.x <= 900);
      assert.equal(val, true);
    });
  });

  describe(`location.y field check`, () => {
    it(`should exist`, () => {
      assert.notEqual(typeof dataObj.location.y, `undefined`);
    });

    it(`should have a num value`, () => {
      assert.equal(typeof dataObj.location.y, `number`);
    });

    it(`should have a value >= 150 and <= 500`, () => {
      let val = (dataObj.location.y >= 150 && dataObj.location.y <= 500);
      assert.equal(val, true);
    });
  });
});
