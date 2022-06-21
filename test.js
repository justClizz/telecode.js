const { Client } = require('.');

const bot = new Client({
  token: ""
});

bot.startCommand({
  code: "Hello $message"
});

bot.command({
  name: "e",
  code: `$eval[$message]`
});

bot.registerCommand();
bot.launch();
