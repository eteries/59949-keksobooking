const packageInfo = require(`../package.json`);
require(`colors`);

module.exports = {
  name: `license`,
  description: `shows program license`,
  execute() {
    console.log(packageInfo.license.blue);
  }
};
