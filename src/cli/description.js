const packageInfo = require(`../../package.json`);
require(`colors`);

module.exports = {
  name: `description`,
  description: `shows program description`,
  execute() {
    console.log(packageInfo.description.yellow);
  }
};
