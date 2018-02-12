const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `shows program author`,
  execute() {
    console.log(packageInfo.author);
  }
};
