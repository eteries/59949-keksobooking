const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`../generator`);

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

offersRouter.post(``, upload.single(`avatar`), (req, res) => {
  res.send(req.body);
});

module.exports = offersRouter;
