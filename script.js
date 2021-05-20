function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function power(a, b) {
  return a ** b;
}

function root(a, b) {
  return a ** (1 / b);
}

function operate(operator, num1, num2) {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  return operator(num1, num2);
}

let num1;
let num2;
let operator;
let screen = document.getElementById("screen").firstChild;

const buttons = document.getElementById("buttons");
// const zero = document.getElementById("0");
// const one = document.getElementById("1");
// const two = document.getElementById("2");
// const three = document.getElementById("3");
// const four = document.getElementById("4");
// const five = document.getElementById("5");
// const six = document.getElementById("6");
// const seven = document.getElementById("7");
// const eight = document.getElementById("8");
// const nine = document.getElementById("9");
// const point = document.getElementById("point");
// const equals = document.getElementById("equals");
// const add = document.getElementById("add");
// const subtract = document.getElementById("subtract");
// const multiply = document.getElementById("multiply");
// const divide = document.getElementById("divide");
// const sign = document.getElementById("sign");
// const root = document.getElementById("root");
// const power = document.getElementById("power");
// const clear = document.getElementById("clear");

buttons.addEventListener("click", e => {
  switch(
    e.target.id ||
    e.target.parentNode.id ||
    e.target.parentNode.parentNode.id ||
    e.target.parentNode.parentNode.parentNode.id
  ) {
    case "0":
      if (screen.textContent !== "0") {
        screen.textContent += "0";
      }
      break;
    case "1":
      if (screen.textContent === "0") {
        screen.textContent = "1";
      } else {
        screen.textContent += "1";
      }
      break;
    case "2":
      if (screen.textContent === "0") {
        screen.textContent = "2";
      } else {
        screen.textContent += "2";
      }
      break;
    case "3":
      if (screen.textContent === "0") {
        screen.textContent = "3";
      } else {
        screen.textContent += "3";
      }
      break;
    case "4":
      if (screen.textContent === "0") {
        screen.textContent = "4";
      } else {
        screen.textContent += "4";
      }
      break;
    case "5":
      if (screen.textContent === "0") {
        screen.textContent = "5";
      } else {
        screen.textContent += "5";
      }
      break;
    case "6":
      if (screen.textContent === "0") {
        screen.textContent = "6";
      } else {
        screen.textContent += "6";
      }
      break;
    case "7":
      if (screen.textContent === "0") {
        screen.textContent = "7";
      } else {
        screen.textContent += "7";
      }
      break;
    case "8":
      if (screen.textContent === "0") {
        screen.textContent = "8";
      } else {
        screen.textContent += "8";
      }
      break;
    case "9":
      if (screen.textContent === "0") {
        screen.textContent = "9";
      } else {
        screen.textContent += "9";
      }
      break;
    case "point":
      if (!screen.textContent.includes(".")) {
        screen.textContent += ".";
      }
      break;
    case "equals":
      if (!num2) {
        num2 = screen.textContent;
      }
      screen.textContent = operate(operator, num1, num2);
      num1 = screen.textContent;
      break;
    case "add":
      if (!num1) {
        num1 = screen.textContent;
        operator = add;
      } else {
        num2 = screen.textContent;
        screen.textContent = operate(operator, num1, num2);
        num1 = screen.textContent;
        operator = add;
      }
      break;
    case "subtract":
      break;
    case "multiply":
      break;
    case "divide":
      break;
    case "sign":
      break;
    case "power":
      break;
    case "delete":
      break;
    case "clear":
      break;
    }
});

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