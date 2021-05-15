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
  return operator(num1, num2);
}

function is(id) {
  return e.target.id === id ||
         e.target.parentNode.id === id ||
         e.target.parentNode.parentNode.id === id ||
         e.target.parentNode.parentNode.parentNode.id === id;
}

let shownValue = document.getElementById("value");

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

buttons.addEventListener(click, e => {
  switch(true) {
    case is("0"):
      break;
    case is("1"):
      break;
    case is("2"):
      break;
    case is("3"):
      break;
    case is("4"):
      break;
    case is("5"):
      break;
    case is("6"):
      break;
    case is("7"):
      break;
    case is("8"):
      break;
    case is("9"):
      break;
    case is("point"):
      break;
    case is("equals"):
      break;
    case is("add"):
      break;
    case is("subtract"):
      break;
    case is("multiply"):
      break;
    case is("divide"):
      break;
    case is("sign"):
      break;
    case is("power"):
      break;
    case is("delete"):
      break;
    case is("clear"):
      break;
    }
});

// 1. check if DIGIT/POINT, OPERATOR, SIGN, DELETE, or CLEAR pressed

// 2. if DIGIT/POINT
//    --if preceded by digit/point, shownValue += DIGIT/POINT,
//        else shownValue = "" += DIGIT/POINT
//    --must ignore point if repeated before new number entry

// 3. if OPERATOR
//    --if an operation is already waiting to be evaluated, shownValue = [result]
//    --store the OPERATOR, store current shownValue as num1 and await second number
//    --

// 4. if SIGN
//    --if shownValue != 0, shownValue = -shownValue

// 5. if DELETE
//    --if shownValue.length = 1, shownValue = 0,
//        else shownValue.slice(0, -1)

// 6. if CLEAR
//    --