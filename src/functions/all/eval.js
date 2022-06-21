module.exports = async(d) => {
  let self = d.this;
  const res = await require("../../interpreter")({
    code: d.inside,
    this: self,
    ctx: d.ctx,
    messageInfo: {
      args: d.messageInfo.args,
      command: d.messageInfo.command
    }
  })

  if(res.code) {
    d.ctx.reply(res.code, res.options)
  }

  return ""
};
