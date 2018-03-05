const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../../generator/generator`);
const schema = require(`./validation`);

const upload = multer({storage: multer.memoryStorage()});

const offers = generateEntity();

const offersRouter = new Router();

offersRouter.use(bodyParser.json());

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const getData = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

const formFields = [
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 3}
];


offersRouter.get(``, async(async (req, res) => res.send(getData(offers))));

offersRouter.get(`/:date`, (req, res) => {
  const reqDate = req.params[`date`];
  const offer = offers.find((obj) => obj.date === reqDate);

  if (!offer) {
    res.status(404);
    res.set(`Content-Type`, `text/html`);
    res.end();
  } else {
    res.send(offer);
  }
});

offersRouter.post(``, upload.fields(formFields), (req, res) => {
  const source = {
    name: req.body.name,
    title: req.body.title,
    type: req.body.type,
    price: req.body.price,
    address: req.body.address,
    timein: req.body.timein,
    timeout: req.body.timeout,
    rooms: req.body.rooms,
    guests: req.body.guests,
    features: req.body.features,
    description: req.body.description
  };

  schema.validate(source, function (err, response) {
    if (err) {
      throw err;
    } else if (response) {
      throw response.errors;
    }
    console.log(`everything is OK!`);
    return res.send(source);
  });
});


module.exports = offersRouter;
