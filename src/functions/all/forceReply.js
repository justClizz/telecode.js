module.exports = async(d) => {
  d.options.reply_markup = {
    input_field_placeholder: d.inside? d.inside : "",
    force_reply: true
  }
  return ""
};
