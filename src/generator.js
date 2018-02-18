const Data = require(`./data/data.js`);

const getRandomPic = () => {
  return `https://robohash.org/` + Math.random().toString(36).substring(2, 9);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

function getRandomValuesFromArr(arr) {
  let newArr = [];
  let items = Math.floor(Math.random() * (arr.length)) + 1;

  for (let i = 0; i < items; i++) {
    newArr.push(getRandomFromArr(arr));
  }
  return [...new Set(newArr)];
}

function getShuffledArray(arr) {
  let newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
}

const coordinateX = getRandomInt(300, 900);
const coordinateY = getRandomInt(150, 500);

const generateEntity = () => {
  return {
    'author': {
      'avatar': getRandomPic()
    },
    'offer': {
      'title': getRandomFromArr(Data.TITLE),
      'address': `${coordinateX}, ${coordinateY}`,
      'price': getRandomInt(1000, 1000000),
      'type': getRandomFromArr(Data.TYPE),
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 15),
      'checkin': getRandomFromArr(Data.TIME),
      'checkout': getRandomFromArr(Data.TIME),
      'features': getRandomValuesFromArr(Data.FEATURES),
      'description': ``,
      'photos': getShuffledArray(Data.PHOTOS)
    },
    'location': {
      'x': coordinateX,
      'y': coordinateY
    }
  };
};

module.exports = {
  generateEntity
};
