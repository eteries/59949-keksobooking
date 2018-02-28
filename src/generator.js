const Data = require(`./data/data.js`);
const util = require(`../util/util`);


const coordinateX = util.getRandomInt(300, 900);
const coordinateY = util.getRandomInt(150, 500);

const dataTemplate = {
  'author': {
    'avatar': util.getRandomPic()
  },
  'offer': {
    'title': util.getRandomFromArr(Data.TITLE),
    'address': `${coordinateX}, ${coordinateY}`,
    'price': util.getRandomInt(1000, 1000000),
    'type': util.getRandomFromArr(Data.TYPE),
    'rooms': util.getRandomInt(1, 5),
    'guests': util.getRandomInt(1, 15),
    'checkin': util.getRandomFromArr(Data.TIME),
    'checkout': util.getRandomFromArr(Data.TIME),
    'features': util.getRandomValuesFromArr(Data.FEATURES),
    'description': ``,
    'photos': util.getShuffledArray(Data.PHOTOS)
  },
  'location': {
    'x': coordinateX,
    'y': coordinateY
  },
  'date': util.getRandomDate()
};

const generateEntity = (objectsCount = 7) => {
  const data = [];

  for (let i = 0; i < objectsCount; i++) {
    data.push(dataTemplate);
  }

  return data;
};

module.exports = {
  generateEntity
};
