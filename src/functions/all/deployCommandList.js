module.exports = async(d) => {
  let cmds = [];
  let val = Array.from(d.this.commandMap.values());
  for (var i = 0; i < val.length; i++) {
    cmds.push({
      command: val[i].name,
      description: val[i].description? val[i].description : "none"
    })
  }

  const deploy = await d.this.bot.telegram.setMyCommands(cmds)
  if(deploy) {
    return ""
  } else {
    d.errorHandler.isError = true;
    return d.errorHandler.message("❌ TelecodeError: failed to deploy commands to command list in $deployCommandsList")
  }
};
