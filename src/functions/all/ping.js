module.exports = async(d) => {
  const a = d.ctx.update.message.date * 1000
  const r = Date.now() - a;
  return r;
};
