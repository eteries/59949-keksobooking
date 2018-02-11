function prompt() {
  var args = process.argv.slice(2)

  switch(args[0]) {
    case '--version':
      console.log('ver0.0.1');
      process.exit()

    case '--help':
      console.log('Доступные команды:\n' +
        '--help    — печатает этот текст;\n' +
        '--version — печатает версию приложения;');
      process.exit()

    case undefined:
      console.log('Привет пользователь!\n' +
        'Эта программа будет запускать сервер «DevSrv».\n' +
        'Автор: Juice.');
      process.exit()

    default:
      console.error('Неизвестная команда! "' + args[0] + '"\n' +
        'Чтобы прочитать правила использования приложения, наберите "--help".');
      process.exit(1)
  };
}

prompt();
