
const getRandomPic = () => {
  return `https://robohash.org/` + Math.random().toString(36).substring(2, 9);
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomDate = () => {
  const dateNow = Math.floor(Date.now() / 1000);
  const week = 60 * 60 * 24 * 7;

  return getRandomInt((dateNow - week), dateNow);
};

const getRandomFromArr = (arr) => arr[Math.floor(arr.length * Math.random())];

const getRandomValuesFromArr = (arr) => {
  let newArr = [];
  let items = Math.floor(Math.random() * (arr.length)) + 1;

  for (let i = 0; i < items; i++) {
    newArr.push(getRandomFromArr(arr));
  }
  return [...new Set(newArr)];
};

const getShuffledArray = (arr) => {
  let newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

const getFilteredData = (data, skip = 0, limit = 20) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

const async = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = {
  getRandomPic,
  getRandomInt,
  getRandomDate,
  getRandomFromArr,
  getRandomValuesFromArr,
  getShuffledArray,
  getFilteredData,
  async
};
