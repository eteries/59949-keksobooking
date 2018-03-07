const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../../generator/generator`);
const ValidationError = require(`../validation-error`);
const {schema, callback} = require(`./validation`);
const {getFilteredData, async} = require(`../../../util/util`);

const upload = multer({storage: multer.memoryStorage()});

const offers = generateEntity();

const offersRouter = new Router();

offersRouter.use(bodyParser.json());

offersRouter.get(``, async(async (req, res) => res.send(getFilteredData(offers))));

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

const formFields = [
  {name: `avatar`, maxCount: 1},
  {name: `preview`, maxCount: 3}
];

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
    description: req.body.description,
    avatar: req.files.avatar,
    preview: req.files.preview
  };

  schema.validate(source, callback);

  if (source.avatar) {
    source.avatar.map((it) => {
      delete it.buffer;
    });
  }
  if (source.preview) {
    source.preview.map((it) => {
      delete it.buffer;
    });
  }

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
