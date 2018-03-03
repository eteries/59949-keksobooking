const request = require(`supertest`);
const {app} = require(`../src/server`);

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
});
