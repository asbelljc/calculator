const ops = (() => {
  let currentOperator;
  let firstOperand = "0";
  let secondOperand = null;

  const add = (a, b) => {
    return a + b;
  };

  const subtract = (a, b) => {
    return a - b;
  };

  const multiply = (a, b) => {
    return a * b;
  };

  const divide = (a, b) => {
    if (b === 0) {
      return null;
    } else {
      return a / b;
    }
  };

  const power = (a, b) => {
    if (a === 0 && b < 0) {
      return null;
    } else {
      return a ** b;
    }
  };

  const evaluate = () => {
    if (ops.secondOperand !== null) {
      ops.firstOperand = Number(ops.firstOperand);
      ops.secondOperand = Number(ops.secondOperand);
      switch (ops.currentOperator) {
        case "add":
          return add(ops.firstOperand, ops.secondOperand);
        case "subtract":
          return subtract(ops.firstOperand, ops.secondOperand);
        case "multiply":
          return multiply(ops.firstOperand, ops.secondOperand);
        case "divide":
          return divide(ops.firstOperand, ops.secondOperand);
        case "power":
          return power(ops.firstOperand, ops.secondOperand);
      }
    }
  };

  return {
    firstOperand,
    secondOperand,
    currentOperator,
    evaluate
  };
})();

const screen = (() => {
  let needsRefresh = true;
  let operand1Shown = true;
  let operand1Active = true;
  
  const display = (string = null) => {
    if (string !== null) {
      document.getElementById("screen").firstChild.innerText = string;
    } else {
      return document.getElementById("screen").firstChild.innerText;
    }
  };

  const clear = () => {
    display("0");
    ops.firstOperand = display();
    ops.secondOperand = null;
    needsRefresh = true;
    operand1Active = true;
    operand1Shown = true;
  };

  const lolClear = () => {
    function appendL() {
      display(`${display()}L`)
    }
    function appendO() {
      display(`${display()}O`);
    }

    display("L");
    setTimeout(appendO, 100);
    setTimeout(appendL, 200);
    setTimeout(appendO, 300);
    setTimeout(appendL, 400);
    setTimeout(appendO, 500);
    setTimeout(appendL, 600);
    setTimeout(appendO, 700);
    setTimeout(appendL, 800);
    setTimeout(clear, 1300);
  };

  const appendDigit = (d) => {
    function stepOne(nextStep) {
      if (needsRefresh) {
        display(d);
        if (display() !== "0") needsRefresh = false;
      } else {
        display(`${display() + d}`);
      }
      nextStep();
    }

    function stepTwo() {
      if (operand1Active) {
        ops.firstOperand = display();
        ops.secondOperand = null;
      } else {
        ops.secondOperand = display();
        operand1Shown = false;
      }
    }

    stepOne(stepTwo);
  };

  const appendPoint = () => {
    function stepOne(nextStep) {
      if (needsRefresh) {
        display("0.");
        needsRefresh = false;
      } else if (!display().includes(".")) {
        display(`${display()}.`);
      } else {
        return;
      }
      nextStep();
    }

    function stepTwo() {
      if (operand1Active) {
        ops.firstOperand = display().slice(0, -1);
        ops.secondOperand = null;
      } else {
        ops.secondOperand = display().slice(0, -1);
        operand1Shown = false;
      }
    }

    stepOne(stepTwo);
  };

  const backspace = () => {
    function stepOne(nextStep) {
      if (operand1Active && needsRefresh) {
        clear();
        return;
      } 

      if (display() !== "0") {
        if (
          !display().includes("-") && display().length === 1 ||
           display().includes("-") && display().length === 2
        ) {
          display("0");
          needsRefresh = true;
        } else {
          display(display().slice(0, -1));
        }
      }

      nextStep();
    }

    function stepTwo() {
      if (operand1Shown) {
        ops.firstOperand = display();
      } else {
        ops.secondOperand = display();
      }
    }

    stepOne(stepTwo);
  };

  const toggleSign = () => {
    function stepOne(nextStep) {
      if (display() !== "0") {
        if (display()[0] !== "-") {
          display(`-${display()}`);
        } else {
          display(display().slice(1));
        }
        nextStep();
      }
    }

    function stepTwo() {
      if (operand1Shown) {
        ops.firstOperand = display();
      } else {
        ops.secondOperand = display();
      }
    }

    stepOne(stepTwo);
  };

  const handleOperator = (operator) => {
    function stepOne(nextStep) {
      if (!operand1Shown) {
        if (ops.evaluate() === null) {
          lolClear();
          return;
        } else { 
          display(ops.evaluate());
          ops.firstOperand = display();
        }
      } else if (operand1Active) {
        ops.secondOperand = null;
      }
      nextStep();
    }
    
    function stepTwo() {
      operand1Shown = true;
      operand1Active = false;
      needsRefresh = true;
      ops.currentOperator = operator;
    }

    stepOne(stepTwo);
  };

  const EQUALS = () => {
    if (ops.evaluate() === null) {
      lolClear();
    } else {
      display(ops.evaluate());
      ops.firstOperand = display();
      needsRefresh = true;
      operand1Active = true;
      operand1Shown = true;
    }
  };

  const events = (e) => {
    if (e.target.closest("button").id === "equals") {
      EQUALS();
      return;
    }
    if (e.target.closest("button").id === "clear") {
      clear();
      return;
    }
    if (e.target.closest("button").id === "delete") {
      backspace();
      return;
    }
    if (e.target.closest("button").classList.contains("digit")) {
      appendDigit(e.target.closest("button").id);
      return;
    }
    if (e.target.closest("button").id === "point") {
      appendPoint();
      return;
    }
    if (e.target.closest("button").classList.contains("operator")) {
      handleOperator(e.target.closest("button").id);
      return;
    }
    if (e.target.closest("button").id === "sign") {
      toggleSign();
    }
  };

  const buttons = document.getElementById("buttons");
  buttons.addEventListener("click", events);

  return {
    display
  };
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