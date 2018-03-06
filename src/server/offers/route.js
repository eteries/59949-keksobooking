const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../../generator/generator`);
const ValidationError = require(`../validation-error`);
const {schema, callback} = require(`./validation`);

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
    price: parseInt(req.body.price, 10) || null,
    address: req.body.address,
    timein: req.body.timein,
    timeout: req.body.timeout,
    rooms: parseInt(req.body.rooms, 10) || null,
    guests: parseInt(req.body.guests, 10) || null,
    features: req.body.features,
    description: req.body.description,
    avatar: req.files.avatar,
    preview: req.files.preview
  };

  schema.validate(source, callback);

  return res.send(source);
});


offersRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});


module.exports = offersRouter;
