const { Client } = require('.');

const bot = new Client({
  token: ""
});

bot.startCommand({
  code: "Hello $authorUsername"
});

bot.command({
  name: "e",
  code: `$eval[$message]`
});

bot.command({
  name: "js",
  code: `$jsEval[$message;yes]`
});

bot.registerCommand();
bot.launch();
