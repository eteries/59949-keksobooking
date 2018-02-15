const dataGenerator = require(`./generator`);

const fs = require(`fs`);
const util = require(`util`);
const writeFile = util.promisify(fs.writeFile);
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};
const filePath = `${process.cwd()}/data/project-data.json`;

module.exports = {
  name: `generate`,
  description: `generates data for project`,
  execute() {
    return writeFile(filePath, JSON.stringify(dataGenerator()), fileWriteOptions);
  }
};
