module.exports = async(d) => {
  d.options.reply_to_message_id = d.ctx.update.message.message_id;
  return ""
};
