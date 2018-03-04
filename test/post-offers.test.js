const request = require(`supertest`);
const {app} = require(`../src/server`);
const data = require(`../src/data/data`);


describe(`POST /api/offers`, function () {
  it(`should get json`, () => {
    return request(app)
        .post(`/api/offers`)
        .send({
          name: `Keks`,
          title: `Маленькая квартирка рядом с парком`,
          type: `flat`,
          price: 30000,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          timein: `12:00`,
          timeout: `13:00`,
          rooms: 1,
          guests: 1,
          features: [`dishwasher`, `conditioner`],
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`
        })
        .expect(200, {
          name: `Keks`,
          title: `Маленькая квартирка рядом с парком`,
          type: `flat`,
          price: 30000,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          timein: `12:00`,
          timeout: `13:00`,
          rooms: 1,
          guests: 1,
          features: [`dishwasher`, `conditioner`],
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`
        });
  });

  it(`should get form-data`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .expect(200, {
          name: `Keks`,
          title: `Маленькая квартирка рядом с парком`,
          type: `flat`,
          price: 30000,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          timein: `12:00`,
          timeout: `13:00`,
          rooms: 1,
          guests: 1,
          features: [`dishwasher`, `conditioner`],
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`
        });
  });

  it(`should get form-data with avatar and preview images`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(200, {
          name: `Keks`,
          title: `Маленькая квартирка рядом с парком`,
          type: `flat`,
          price: 30000,
          address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          timein: `12:00`,
          timeout: `13:00`,
          rooms: 1,
          guests: 1,
          features: [`dishwasher`, `conditioner`],
          description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`
        });
  });

  it(`unknown address should return 404`, () => {
    return request(app)
        .post(`/api/offerzzz`)
        .expect(404);
  });

  it(`should fail if title is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, ``)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `title`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if title is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `title`,
          fieldValue: `Маленькая квартирка`,
          errorMessage: `should be in range 30..140`
        }]);
  });

  it(`should fail if type is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, ``)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `type`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if type is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `qwerty`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `type`,
          fieldValue: ``,
          errorMessage: `should contain one of this values: ${data.TYPE}`
        }]);
  });

  it(`should fail if price is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, ``)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `price`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if price is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `-30`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `price`,
          fieldValue: `-30`,
          errorMessage: `should be in range 1..100 000`
        }]);
  });

  it(`should fail if address is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, ``)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `address`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if address is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō; 102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō; 102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `address`,
          fieldValue: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō; 102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō; 102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
          errorMessage: `should be in range 1..100`
        }]);
  });

  it(`should fail if timein is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, ``)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `timein`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if timein is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12-00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `timein`,
          fieldValue: `12-00`,
          errorMessage: `field format should be HH:mm`
        }]);
  });

  it(`should fail if timeout is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, ``)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `timeout`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if timeout is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13-00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `timeout`,
          fieldValue: `13-00`,
          errorMessage: `field format should be HH:mm`
        }]);
  });

  it(`should fail if rooms is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, ``)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `rooms`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if rooms is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `-1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `rooms`,
          fieldValue: `-1`,
          errorMessage: `should be in range 1..1000`
        }]);
  });

  it(`should fail if guests is empty`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, ``)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `guests`,
          fieldValue: ``,
          errorMessage: `field is required`
        }]);
  });

  it(`should fail if guests is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `2000`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `guests`,
          fieldValue: `2000`,
          errorMessage: `should be in range 1..1000`
        }]);
  });

  it(`should fail if features is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `qwerty`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `features`,
          fieldValue: `qwerty`,
          errorMessage: `should contain one of this values: ${data.FEATURES}`
        }]);
  });

  it(`should fail if description is invalid`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`name`, `Keks`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`type`, `flat`)
        .field(`price`, `30000`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`timein`, `12:00`)
        .field(`timeout`, `13:00`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`features`, `dishwasher`)
        .field(`features`, `conditioner`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС. Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .attach(`avatar`, `test/img/keks.png`)
        .attach(`preview`, `test/img/keks.png`)
        .expect(400, [{
          fieldName: `description`,
          fieldValue: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС. Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
          errorMessage: `should be in range 1..100`
        }]);
  });
});
