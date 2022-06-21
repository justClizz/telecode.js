const { Telegraf, Markup } = require("telegraf");
const { toLog } = require("./utils/models/terminal");

module.exports = class Client {
  constructor(opts = {}) {
    if (!opts.token) throw toLog(4, undefined, "Token required!");

    this.token = opts.token;
    this.commandMap = new Map();
    this.bot = new Telegraf(this.token);
  }

  command(...opts) {
    for (const w of opts) {
      if (!w.name) throw toLog(4, undefined, "name is required in commands!");
      if (!w.code) throw toLog(4, undefined, "code is required in commands!");

      this.commandMap.set(w.name, w);
    }
  }

  startCommand(opts) {
    if (!opts.code)
      throw toLog(4, undefined, "code is required in startCommand");

    this.bot.start(async (ctx) => {
      let args = ctx.update.message.text.slice("/").trim().split(/ +/g);
      let command = args.shift().toLowerCase();
      let self = this;

      const res = await require("./interpreter")({
        code: opts.code,
        this: self,
        ctx,
        messageInfo: {
          args,
          command,
        },
      });

      if (res.code) {
        ctx.reply(res.code, { reply_markup: res.markup });
      }
    });
  }

  async registerCommand() {
    let val = Array.from(this.commandMap.values());
    let self = this;

    for (const w of val) {
      this.bot.command(w.name, async (ctx) => {
        let args = ctx.update.message.text.slice("/").trim().split(/ +/g);
        let command = args.shift().toLowerCase();

        const res = await require("./interpreter")({
          code: w.code,
          this: self,
          ctx,
          messageInfo: {
            args,
            command,
          },
        });

        if (res.code) {
          ctx.reply(res.code, res.options);
        }
      });
    }
  }

  launch() {
    this.bot.launch().then((x) => {
      toLog(
        2,
        undefined,
        "Ready on " +
          this.bot.botInfo.first_name +
          " || " +
          this.bot.botInfo.username
      );
    });
    process.once("SIGINT", () => this.bot.stop("SIGINT"));
    process.once("SIGTERM", () => this.bot.stop("SIGTERM"));
  }
};

require("./utils/prototype");
