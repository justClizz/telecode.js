const checkCondition = (cond, err) => {
  const operators = () => {
    for (const op of ["<=", ">=", "<", ">", "==", "!="]) {
      if (cond.includes(op)) return op;
    }
  };

  const operator = operators();
  if(!operator) {
    err.isError = true;
    err.message("TelecodeError: checkCondition can't find the condition operators!")
  }

  const split = cond.split(operator);
  let pass = false;
  if(operator === "<=") {
    if(split[0] <= split[1]) pass = true;
  } else if(operator === ">=") {
    if(split[0] >= split[1]) pass = true;
  } else if(operator === "<") {
    if(split[0] < split[1]) pass = true
  } else if(operator === "==") {
    if(split[0] == split[1]) pass = true;
  } else if(operator === "!=") {
    if(split[0] != split[1]) pass = true;
  }

  return pass;
};

module.exports = checkCondition;
