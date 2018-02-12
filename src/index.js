const help = require(`./help.js`);
const author = require(`./author.js`);
const version = require(`./version.js`);
const license = require(`./license.js`);
const description = require(`./description.js`);

function prompt() {
  let args = [];
  let commands = [];

  commands.push(help, author, version, license, description);

  if (process.argv.length === 2) {
    args.push(`greeting`);
  } else {
    args = process.argv.slice(2);
  }

  let cmdFiltred = commands.find((obj) => (`--` + obj.name) === args[0]);

  if (cmdFiltred) {
    cmdFiltred.execute();
  } else if (args[0] === `greeting`) {
    console.log(`Привет пользователь!\n` +
      `Эта программа будет запускать сервер «DevSrv».\n` +
      `Автор: Juice.`);
  } else {
    console.error(`Неизвестная команда! "${args[0]}"\n` +
      `Чтобы прочитать правила использования приложения, наберите "--help".`);
    process.exit(1);
  }

  process.exit();
}

module.exports = prompt;
