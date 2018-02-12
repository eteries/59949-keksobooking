module.exports = {
  name: `help`,
  description: `shows program commands`,
  execute() {
    console.log(`Доступные команды:\n` +
      `--help    —  печатает этот текст;\n` +
      `--version —  печатает версию приложения;\n` +
      `--author —  указывает автора приложения;\n` +
      `--description —  выдает описание приложения;\n` +
      `--license —  выводит тип лицензии;\n`);
  }
};
