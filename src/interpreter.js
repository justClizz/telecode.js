module.exports = async (d) => {
  var code = d.code,
    self = d.this,
    ctx = d.ctx,
    messageInfo = d.messageInfo,
    suppressErr,
    parser = require('./functions/parser'),
    { escapeRegex, check } = require('./utils/models/functions');

  const searched = [];
  function searchFunc(_n, _p) {
    for (const f of _n) {
      let func = _p.filter((filt) => filt === f.slice(0, filt.length));
      if (func.length == 1) {
        searched.push(func[0]);
      } else if (func.length > 1) {
        searched.push(func.sort((a, b) => b.length - a.length)[0]);
      }
    }

    return searched;
  }

  let options = {};
  var searchCode = code.replace(/\$/gi, ",$");
  let theFuncs = searchFunc(searchCode.split(","), parser);

  for (const func of theFuncs.reverse()) {
    let _iOne = code.split(new RegExp(escapeRegex(func), "gi"));
    _iOne = _iOne[_iOne.length - 1];
    const length = _iOne.split("[").length - 1;
    _iOne = _iOne.split("]").slice(0, length).join("]").replace("[", "");

    const d = func.replace("$", "").replace("[", "");
    let line = code.split("\n").findIndex(element => element.includes(func))
    line = parseInt(line === -1? 1 : line + 1)

    const all = {
      name: func,
      inside: _iOne,
      this: self,
      code,
      ctx,
      options,
      messageInfo,
      errorHandler: {
        isError: false,
        message: (err, notShowingLine) => {
          if(err) {
            if (!suppressErr) {
              var def = notShowingLine? "" : " Line " + line
              return ctx.reply("❌" + err.trim() + def)
            }
            return ctx.reply(suppressErr.trim().split("{error}").join(err).split("{line}").join(line))
          }
        },
      }
    }

    var res = await require(`./functions/all/${d}.js`)(all);
    code = code.replaceLast(_iOne ? `${func}[${_iOne}]` : func, res);

    if (all.errorHandler.isError) {
      code = "";
      break;
    }
  }

  return {
    code,
    options
  };
};
