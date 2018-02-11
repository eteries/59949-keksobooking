function prompt(question) {
  console.log(question);

  process.stdin.once('data', function (data) {
    var command = data.toString().trim();

    switch(command) {
      case '--version':
        console.log('ver0.0.1');
        process.exit()

      case '--help':
        console.log('Доступные команды:\n' +
          '--help    — печатает этот текст;\n' +
          '--version — печатает версию приложения;');
        process.exit()

      case '':
        console.log('Привет пользователь!\n' +
          'Эта программа будет запускать сервер «DevSrv».\n' +
          'Автор: Juice.');
        process.exit()

      default:
        console.error('Неизвестная команда! "' + command + '"\n' +
          'Чтобы прочитать правила использования приложения, наберите "--help".');
        process.exit(1)
    }
  });
}

prompt('Жду команду...');
