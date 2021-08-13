// function add(a, b) {
//   return a + b;
// }

// function subtract(a, b) {
//   return a - b;
// }

// function multiply(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   if (b === 0) {
//     return null;
//   } else {
//     return a / b;
//   }
// }

// function power(a, b) {
//   if (a === 0 && b < 0) {
//     return null;
//   } else {
//     return a ** b;
//   }
// }

// function operate(operator, num1, num2) {
//   num1 = parseInt(num1);
//   num2 = parseInt(num2);
//   return operator(num1, num2);
// }
const eventHandler = (() => {
  const hitEquals = new Event("hitEquals");
  const hitClear = new Event("hitClear");
  const hitDelete = new Event("hitDelete");
  const hitDigit = new Event("hitDigit", { detail: e.target.id });
  const hitPoint = new Event("hitPoint");
  const hitOperator = new Event("hitOperator", { detail: e.target.id });
  const hitSign = new Event("hitSign");

  function emitEvent(e) {
    if (e.target.closest("button").id === "equals") {
      document.dispatchEvent(hitEquals);
      return;
    }
    if (e.target.closest("button").id === "clear") {
      document.dispatchEvent(hitClear);
      return;
    }
    if (e.target.closest("button").id === "delete") {
      document.dispatchEvent(hitDelete);
      return;
    }
    if (e.target.closest("button").classList.contains("digit")) {
      document.dispatchEvent(hitDigit);
      return;
    }
    if (e.target.closest("button").id === "point") {
      document.dispatchEvent(hitPoint);
      return;
    }
    if (e.target.closest("button").classList.contains("operator")) {
      document.dispatchEvent(hitOperator);
      return;
    }
    if (e.target.closest("button").id === "sign") {
      document.dispatchEvent(hitSign);
    }
  }

  const buttons = document.getElementById("buttons");
  buttons.addEventListener("click", emitEvent);
})();

const ops = (() => {
  let _currentOperator;
  let firstOperand = "0";
  let secondOperand = null;

  const _add = (a, b) => {
    return a + b;
  };

  const _subtract = (a, b) => {
    return a - b;
  };

  const _multiply = (a, b) => {
    return a * b;
  };

  const _divide = (a, b) => {
    if (b === 0) {
      screen.lolClear();
    } else {
      return a / b;
    }
  };

  const _power = (a, b) => {
    if (a === 0 && b < 0) {
      screen.lolClear();
    } else {
      return a ** b;
    }
  };

  const evaluate = () => {
    if (secondOperand) {
      return _currentOperator(firstOperand, secondOperand);
    }
  };

  document.addEventListener("hitOperator2", (e) => {
    _currentOperator = ops[`_${e.detail}`];
  });

  return {
    firstOperand,
    secondOperand,
    evaluate
  };
})();

const screen = (() => {
  let _needsRefresh = true;
  let _operand1Shown = true;
  let _operand1Active = true;
  
  const _display = (string, additive) => {
    if (string && additive) {
      document.getElementById("screen").firstChild.innerText += string;
    } else if (string) {
      document.getElementById("screen").firstChild.innerText = string;
    } else {
      return document.getElementById("screen").firstChild.innerText;
    }
  };

  const clear = () => {
    _display("0");
    ops.firstOperand = _display();
    ops.secondOperand = null;
    _needsRefresh = true;
    _operand1Active = true;
    _operand1Shown = true;
  };

  const lolClear = () => {
    _display("L");
    setTimeout(_display("O", "additive"), 100);
    setTimeout(_display("L", "additive"), 200);
    setTimeout(_display("O", "additive"), 300);
    setTimeout(_display("L", "additive"), 400);
    setTimeout(_display("O", "additive"), 500);
    setTimeout(_display("L", "additive"), 600);
    setTimeout(_display("O", "additive"), 700);
    setTimeout(_display("L", "additive"), 800);
    setTimeout(clear(), 900);
  };

  const appendDigit = (d) => {
    function stepOne(nextStep) {
      if (_needsRefresh) {
        _display(d);
        if (_display() !== "0") _needsRefresh = false;
      } else {
        _display(d, "additive");
      }
      nextStep();
    }

    function stepTwo() {
      if (_operand1Active) {
        ops.firstOperand = _display();
        ops.secondOperand = null;
      } else {
        ops.secondOperand = _display();
        _operand1Shown = false;
      }
    }

    stepOne(stepTwo);
  };

  const appendPoint = () => {
    function stepOne(nextStep) {
      if (_needsRefresh) {
        _display("0.");
        _needsRefresh = false;
      } else if (!_display().includes(".")) {
        _display(".", "additive");
      } else {
        return;
      }
      nextStep();
    }

    function stepTwo() {
      if (_operand1Active) {
        ops.firstOperand = _display().slice(0, -1);
        ops.secondOperand = null;
      } else {
        ops.secondOperand = _display().slice(0, -1);
        _operand1Shown = false;
      }
    }

    stepOne(stepTwo);
  };

  const backspace = () => {
    function stepOne(nextStep) {
      if (_operand1Active && _needsRefresh) {
        clear();
        return;
      } 

      if (_display() !== "0") {
        if (
          !_display().includes("-") && _display().length === 1 ||
           _display().includes("-") && _display().length === 2
        ) {
          _display("0");
          _needsRefresh = true;
        } else {
          _display(_display().slice(0, -1));
        }
      }

      nextStep();
    }

    function stepTwo() {
      if (_operand1Shown) {
        ops.firstOperand = _display();
      } else {
        ops.secondOperand = _display();
      }
    }

    stepOne(stepTwo);
  };

  const toggleSign = () => {
    if (_display()[0] !== "-") {
      _display(`-${_display}`);
    } else {
      _display(_display().slice(1));
    }
  };

  document.addEventListener("hitEquals", (e) => {
    _display(ops.evaluate());
    ops.firstOperand = _display();
    needsRefresh = true;
    _operand1Active = true;
    _operand1Shown = true;
  });

  document.addEventListener("hitClear", (e) => {
    clear();
  });

  document.addEventListener("hitDelete", (e) => {
    backspace();
  });

  document.addEventListener("hitDigit", (e) => {
    appendDigit(e.detail);
  });

  document.addEventListener("hitPoint", (e) => {
    appendPoint();
  });

  document.addEventListener("hitSign", (e) => {
    toggleSign();
  });

  document.addEventListener("hitOperator", (e) => {
    function stepOne(nextStep) {
      if (!_operand1Shown) {
        _display(ops.evaluate());
        ops.firstOperand = _display();
      } else if (_operand1Active) {
        ops.secondOperand = null;
      }
      nextStep();
    }
    
    function stepTwo() {
      _operand1Shown = true;
      _operand1Active = false;
      _needsRefresh = true;
      const hitOperator2 = new Event("hitOperator2", { detail: e.detail });
      document.dispatchEvent(hitOperator2);
    }

    stepOne(stepTwo);
  });

  return { lolClear };
})();

// let firstOperand;
// let secondOperand;
// let currentOperator;
// let screen = document.getElementById("screen").firstChild;
// let needsRefresh = false;
// let awaitingNumber = false;

// const buttons = document.getElementById("buttons");

// buttons.addEventListener("click", e => {
//   if (e.target.closest("button").classList.contains("digit")) {
//     enterDigit(e);
//   } else if (e.target.closest("button").classList.contains("operator")) {
//     setOperator(e);
//   } else if (e.target.closest("button").id === "equals") {
//     evaluate();
//   }
// });

// function enterDigit(e) {
//   if (e.target.closest("button").id === "0") {
//     if (needsRefresh) {
//       screen.textContent = "0";
//       needsRefresh = false;
//     } else if (screen.textContent !== "0") {

//     }
//     secondOperand = "";
//   } else {
//     if (screen.textContent === "0" || needsRefresh) {
//       screen.textContent = e.target.closest("button").id;
//       needsRefresh = false;
//     } else {
//       screen.textContent += e.target.closest("button").id;
//     }
//   }
// }

// function setOperator(e) {
//   let clickedOperator = e.target.closest("button").id;
  
// }

// function evaluate() {
//   if (!secondOperand) {
//     secondOperand = screen.textContent;
//   }
//   screen.textContent = operate(currentOperator, firstOperand, secondOperand);
//   firstOperand = screen.textContent;
//   needsRefresh = true;
// }

// buttons.addEventListener("click", e => {
//   switch (e.target.closest("button").id) {
//     case "0":
//       if (screen.textContent !== "0") {
//         screen.textContent += "0";
//       }
//       secondOperand = "";
//       awaitingNumber = false;
//       break;
//     case "1":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "1";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "1";
//       }
//       awaitingNumber = false;
//       break;
//     case "2":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "2";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "2";
//       }
//       awaitingNumber = false;
//       break;
//     case "3":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "3";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "3";
//       }
//       awaitingNumber = false;
//       break;
//     case "4":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "4";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "4";
//       }
//       awaitingNumber = false;
//       break;
//     case "5":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "5";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "5";
//       }
//       awaitingNumber = false;
//       break;
//     case "6":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "6";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "6";
//       }
//       awaitingNumber = false;
//       break;
//     case "7":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "7";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "7";
//       }
//       awaitingNumber = false;
//       break;
//     case "8":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "8";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "8";
//       }
//       awaitingNumber = false;
//       break;
//     case "9":
//       if (screen.textContent === "0" || needsRefresh) {
//         screen.textContent = "9";
//         needsRefresh = false;
//       } else {
//         screen.textContent += "9";
//       }
//       awaitingNumber = false;
//       break;
//     case "point":
//       if (!screen.textContent.includes(".")) {
//         screen.textContent += ".";
//       }
//       break;
//     case "equals":
//       if (!secondOperand) {
//         secondOperand = screen.textContent;
//       }
//       screen.textContent = operate(currentOperator, firstOperand, secondOperand);
//       firstOperand = screen.textContent;
//       needsRefresh = true;
//       break;
//     case "add":
//       if (!firstOperand) {
//         firstOperand = screen.textContent;
//         currentOperator = add;
//       } else if (awaitingNumber) {
//         currentOperator = add;
//       } else {
//         secondOperand = screen.textContent;
//         screen.textContent = operate(currentOperator, firstOperand, secondOperand);
//         firstOperand = screen.textContent;
//         currentOperator = add;
//       }
//       awaitingNumber = true;
//       needsRefresh = true;
//       break;
//     case "subtract":
//       if (!firstOperand) {
//         firstOperand = screen.textContent;
//         currentOperator = subtract;
//       } else if (awaitingNumber) {
//         currentOperator = subtract;
//       } else {
//         secondOperand = screen.textContent;
//         screen.textContent = operate(currentOperator, firstOperand, secondOperand);
//         firstOperand = screen.textContent;
//         currentOperator = subtract;
//       }
//       awaitingNumber = true;
//       needsRefresh = true;
//       break;
//     case "multiply":
//       if (!firstOperand) {
//         firstOperand = screen.textContent;
//         currentOperator = multiply;
//       } else if (awaitingNumber) {
//         currentOperator = multiply;
//       } else {
//         secondOperand = screen.textContent;
//         screen.textContent = operate(currentOperator, firstOperand, secondOperand);
//         firstOperand = screen.textContent;
//         currentOperator = multiply;
//       }
//       awaitingNumber = true;
//       needsRefresh = true;
//       break;
//     case "divide":
//       if (!firstOperand) {
//         firstOperand = screen.textContent;
//         currentOperator = divide;
//       } else if (awaitingNumber) {
//         currentOperator = divide; 
//       } else {
//         secondOperand = screen.textContent;
//         screen.textContent = operate(currentOperator, firstOperand, secondOperand);
//         firstOperand = screen.textContent;
//         currentOperator = divide;
//       }
//       awaitingNumber = true;
//       needsRefresh = true;
//       break;
//     case "sign":
//       break;
//     case "power":
//       break;
//     case "delete":
//       break;
//     case "clear":
//       break;
//     }
// });

// 1. check if DIGIT/POINT, OPERATOR, SIGN, DELETE, or CLEAR pressed

// 2. if DIGIT/POINT
//    --if preceded by digit/point, screen.textContent += DIGIT/POINT,
//        else screen.textContent = "" += DIGIT/POINT
//    --must ignore point if repeated before new number entry

// 3. if OPERATOR
//    --if an operation is already waiting to be evaluated, screen.textContent = [result]
//    --store the OPERATOR, store current screen.textContent as num1 and await second number
//

// 4. if SIGN
//    --if screen.textContent != 0, screen.textContent = -screen.textContent

// 5. if DELETE
//    --if screen.textContent.length = 1, screen.textContent = 0,
//        else screen.textContent.slice(0, -1)

// 6. if CLEAR
//    --