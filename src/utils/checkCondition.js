const checkCondition = (cond) => {
  const operators = () => {
    for (const op of ["<=", ">=", "<", ">", "==", "!="]) {
      if (cond.includes(op)) return op;
    }
  };

  const operator = operators();
  if(!operator) {
    throw new Error("abc")
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
