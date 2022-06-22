module.exports = async(d) => {
  await d.this.bot.telegram.deleteMyCommands()
  return ""
};
