
const generateEntity = () => {
  return {
    'author': {
      'avatar': null
    },
    'offer': {
      'title': null,
      'address': null,
      'price': null,
      'type': null,
      'rooms': null,
      'guests': null,
      'checkin': null,
      'checkout': null,
      'features': null,
      'description': null,
      'photos': null
    },
    'location': {
      'x': null,
      'y': null
    }
  };
};

module.exports = {
  generateEntity
};
