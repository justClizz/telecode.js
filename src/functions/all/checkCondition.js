module.exports = async(d) => {
  let inside = d.inside;
  let checkCondition = require('../../utils/checkCondition');

  if(!inside) {
    d.errorHandler.isError = true;
    return d.errorHandler.message(`TelecodeError: Invalid usage in $checkCondition`);
  } else {
    return checkCondition(inside, d.errorHandler)
  }
};
