const help = require(`./help.js`);
const author = require(`./author.js`);
const version = require(`./version.js`);
const license = require(`./license.js`);
const description = require(`./description.js`);
const generate = require(`./generate.js`);

function prompt() {
  let args = [];
  let commands = [];

  commands.push(help, author, version, license, description, generate);

  if (process.argv.length === 2) {
    args.push(`greeting`);
  } else {
    args = process.argv.slice(2);
  }

  let cmdFiltred = commands.find((obj) => (`--` + obj.name) === args[0]);

  if (cmdFiltred) {
    cmdFiltred.execute(args[1], args[2], args[3]);
  } else if (args[0] === `greeting`) {
    console.log(`Привет пользователь!\n` +
      `Для генерации файла с данными вызови программу с ключём «--generate».\n` +
      `Вторым ключем укажи количество желаемых обьектов для генерации.\n` +
      `Третьим параметром укажи имя файла и путь до него в формате «path/filename.json»\n` +
      `Для справки вызови «--help»`);
  } else {
    console.error(`Неизвестная команда! "${args[0]}"\n` +
      `Чтобы прочитать правила использования приложения, наберите «--help».`);
    process.exit(1);
  }
}

module.exports = prompt;
