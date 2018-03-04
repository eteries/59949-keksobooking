const packageInfo = require(`../package.json`);
require(`colors`);

module.exports = {
  name: `author`,
  description: `shows program author`,
  execute() {
    console.log(packageInfo.author.green);
  }
};
