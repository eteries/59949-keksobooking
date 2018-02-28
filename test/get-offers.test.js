const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

describe(`GET /api/offers`, function () {

  it(`response with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(`Content-Type`, /json/)
        .expect(200)
        .then((response) => {
          const data = response.body;
          assert.equal(data.total, 7);
          assert.equal(data.data.length, 7);
          assert.equal(Object.keys(data.data[0]).length, 4);
        });
  });
});
