require(`colors`);

module.exports = {
  name: `help`,
  description: `shows program commands`,
  execute() {
    console.log(`Доступные команды:\n` +
      `${`--help — `.grey} ${`печатает этот текст;\n`.green}` +
      `${`--generate num path wr — `.grey} ${`генерирует файл данных;\n`.green}` +
      `${`  num — `.yellow} ${`количество генерируемых обьектов;\n`.green}` +
      `${`  path — `.yellow} ${`путь до файла в формате json;\n`.green}` +
      `${`  wr — `.yellow} ${`указание перезаписать существующий файл;\n`.green}` +
      `${`--version — `.grey} ${`печатает версию приложения;\n`.green}` +
      `${`--author — `.grey} ${`указывает автора приложения;\n`.green}` +
      `${`--description — `.grey} ${`выдает описание приложения;\n`.green}` +
      `${`--license — `.grey} ${`выводит тип лицензии;\n`.green}`);
  }
};
