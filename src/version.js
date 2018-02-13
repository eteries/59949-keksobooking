const packageVer = require(`../package.json`).version;
require(`colors`);

module.exports = {
  name: `version`,
  description: `shows program version`,
  execute() {
    console.log(`v` + packageVer[0].red + `.` + packageVer[2].green + `.` + packageVer[4].blue);
  }
};
