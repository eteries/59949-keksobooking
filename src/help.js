require(`colors`);

module.exports = {
  name: `help`,
  description: `shows program commands`,
  execute() {
    console.log(`Доступные команды:\n` +
      `${`--help — `.grey} ${`печатает этот текст;\n`.green}` +
      `${`--version — `.grey} ${`печатает версию приложения;\n`.green}` +
      `${`--author — `.grey} ${`указывает автора приложения;\n`.green}` +
      `${`--description — `.grey} ${`выдает описание приложения;\n`.green}` +
      `${`--license — `.grey} ${`выводит тип лицензии;\n`.green}`);
  }
};
