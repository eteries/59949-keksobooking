const request = require(`supertest`);
const {app} = require(`../src/server`);

describe(`POST /api/offers`, function () {

  it(`should get json`, () => {
    return request(app)
        .post(`/api/offers`)
        .send({
          author: {},
          offer: {},
          location: {},
          date: 1500000000
        })
        .expect(200, {
          author: {},
          offer: {},
          location: {},
          date: 1500000000
        });
  });

  it(`should get form-data`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`author`, `{}`)
        .field(`offer`, `{}`)
        .field(`location`, `{}`)
        .field(`date`, `1500000000`)
        .expect(200, {
          author: `{}`,
          offer: `{}`,
          location: `{}`,
          date: `1500000000`
        });
  });

  it(`should get form-data with avatar`, () => {
    return request(app)
        .post(`/api/offers`)
        .field(`author`, `{}`)
        .field(`offer`, `{}`)
        .field(`location`, `{}`)
        .field(`date`, `1500000000`)
        .attach(`avatar`, `test/img/keks.png`)
        .expect(200, {
          author: `{}`,
          offer: `{}`,
          location: `{}`,
          date: `1500000000`
        });
  });

  it(`unknown address should return 404`, () => {
    return request(app)
        .post(`/api/offerzzz`)
        .expect(404);
  });

});
