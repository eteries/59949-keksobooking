const packageInfo = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `shows program version`,
  execute() {
    console.log(`v${packageInfo.version}`);
  }
};
