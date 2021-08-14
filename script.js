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

  const round = (num) => {
    // get number of digits after decimal point
    let i = num.slice(num.indexOf(".") + 1).length;
    // round number to fewer and fewer decimal places until it fits or you run out
    while (i > 0 && num.length > 10) {
      num = Number(num).toFixed(i - 1);
      i--;
    }
    return num;
  };

  const toScientific = (num) => {
    // put number in scientific notation to 4 decimal places
    num = Number(num).toExponential(4);
    // cut off trailing zeroes/point if needed, 
    // e.g. 1.0300e+5 becomes 1.03e+5 and 1.0000e+5 becomes 1e+5
    while (num[num.indexOf("e") - 1] === "0" || num[num.indexOf("e") - 1] === ".") {
      num = num.slice(0, num.indexOf("e") - 1) + num.slice(num.indexOf("e"));
    }
    return num;
  };

  const makeFit = (num) => {
    num = num.toString();
    
    if (num === "Infinity" || num === "-Infinity") {
      return null;
    }
    // if the number is long...
    if (num[0] === "-" && num.length > 11 || num[0] !== "-" && num.length > 10) {
      // ...if it's not too big or too small, round it...
      if (Math.abs(num) > 0.00000001 && Math.abs(num) < 9999999999) {
        num = round(num);
        // ...otherwise put it in scientific notation
      } else {
        num = toScientific(num);
      }
      // check it again and if it still fails return null
      if (
        num === "Infinity" ||
        num === "-Infinity" ||
        num[0] === "-" && num.length > 11 || 
        num[0] !== "-" && num.length > 10
      ) {
        return null;
      }
    }

    return num;
  };

  const evaluate = () => {
    if (ops.secondOperand !== null) {
      ops.firstOperand = Number(ops.firstOperand);
      ops.secondOperand = Number(ops.secondOperand);
      let result;

      switch (ops.currentOperator) {
        case "add":
          result = add(ops.firstOperand, ops.secondOperand);
          break;
        case "subtract":
          result = subtract(ops.firstOperand, ops.secondOperand);
          break;
        case "multiply":
          result = multiply(ops.firstOperand, ops.secondOperand);
          break;
        case "divide":
          result = divide(ops.firstOperand, ops.secondOperand);
          break;
        case "power":
          result = power(ops.firstOperand, ops.secondOperand);
      }

      return result !== null ? makeFit(result) : result;
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
  const buttons = document.getElementById("buttons");
  buttons.addEventListener("click", events);
  
  const display = (num = null) => {
    if (num !== null) {
        document.getElementById("screen").firstChild.innerText = /*roundCheck(*/num/*)*/;
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
    // temporarily disable click listener while lolClear is running
    buttons.removeEventListener("click", events);
    setTimeout(() => {
      buttons.addEventListener("click", events);
    }, 1300);

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
      } else if (display().length <= 9) {
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
      } else if (!display().includes(".") && display().length <= 9) {
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

  function events(e) {
    if (e.target.closest("button") === null) {
      return;
    }
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
  }
})();