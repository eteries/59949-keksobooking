const packageInfo = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `shows program description`,
  execute() {
    console.log(packageInfo.description);
  }
};
