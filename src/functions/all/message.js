module.exports = async (d) => {
  var args = d.messageInfo.args;
  args = d.inside == "" ? args.join(" ") : args[Number(d.inside) - 1]

  return args? args : ""
};
