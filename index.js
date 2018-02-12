function prompt() {
  let args = [];

  if (process.argv.length === 2) {
    args.push(`greeting`);
  } else {
    args = process.argv.slice(2);
  }

  switch (args[0]) {
    case `--version`:
      console.log(`ver0.0.1`);
      break;

    case `--help`:
      console.log(`Доступные команды:\n` +
        `--help    — печатает этот текст;\n` +
        `--version — печатает версию приложения;`);
      break;

    case `greeting`:
      console.log(`Привет пользователь!\n` +
        `Эта программа будет запускать сервер «DevSrv».\n` +
        `Автор: Juice.`);
      break;

    default:
      console.error(`Неизвестная команда! "${args[0]}"\n` +
        `Чтобы прочитать правила использования приложения, наберите "--help".`);
      process.exit(1);
  }

  process.exit();
}

prompt();
