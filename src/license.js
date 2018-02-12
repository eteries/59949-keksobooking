const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `shows program license`,
  execute() {
    console.log(packageInfo.license);
  }
};
