const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateEntity} = require(`./generator`);
const app = express();

app.use(express.static(`static`));
app.use(bodyParser.json());

const upload = multer({storage: multer.memoryStorage()});

const offers = generateEntity();


const getData = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

app.get(`/api/offers`, (req, res) => res.send(getData(offers)));

app.get(`/api/offers/:date`, (req, res) => {
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

app.post(`/api/offers`, upload.none(), (req, res) => {
  res.send(req.body);
});


const PORT = 3000;
const HOSTNAME = `127.0.0.1`;

module.exports = {
  name: `server`,
  description: `runs local server`,
  execute(port) {
    app.listen(port || PORT, HOSTNAME, () => {
      console.log(`server started at http://${HOSTNAME}:${port || PORT}/`);
    });
  },
  app
};
