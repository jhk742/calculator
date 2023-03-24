"use strict";
const buttons = document.querySelector(".buttons");

const input = document.querySelector(".input");
const operators = buttons.querySelector(".operators");
const equal = buttons.querySelector(".equal");
const numbers = buttons.querySelectorAll(".numbers");

let equation = "";

operators.addEventListener("click", function (e) {
  const target = e.target.textContent;
  if (target === "÷" || target === "×" || target === "+" || target === "-") {
    equation += e.target.textContent;
    input.textContent = equation;
  }
});

//3 + 2 x 4 x 3 % 6 = 7
equal.addEventListener("click", function (e) {
  const numbers = equation.split(/\+|\-|\×|\÷/g);
  const operators = equation.replace(/[0-9]|\./g, "").split("");

  //equation ends with an operand
  if (numbers.length === operators.length) operators.splice(-1, 1);

  //if indexOf('operator') === -1, the operator is not present
  //splice(start, deleteCount, item1, item2, itemN) -> items are the things to be added
  let divide = operators.indexOf("÷");
  while (divide !== -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  let multiply = operators.indexOf("×");
  while (multiply !== -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  let subtract = operators.indexOf("-");
  while (subtract !== -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  let add = operators.indexOf("+");
  while (add !== -1) {
    numbers.splice(add, 2, +numbers[add] + +numbers[add + 1]);
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  input.innerHTML = numbers[0];
});

numbers.forEach((number) =>
  number.addEventListener("click", function (e) {
    const targ = e.target.textContent;
    if ((targ >= 0 && targ <= 9) || targ === "C" || targ === ".") {
      equation = targ === "C" ? "" : equation + targ;
      input.textContent = equation;
    }
  })
);
