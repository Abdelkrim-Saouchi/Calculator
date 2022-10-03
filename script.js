// global variables
const resultDisplay = document.querySelector(".result");
const operationDisplay = document.querySelector(".operation-display");
const digitButtons = Array.from(document.querySelectorAll(".btn .digit"));
const operatorButtons = Array.from(document.querySelectorAll(".btn .operator"));

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetResultDisplay = false;

// add digits to screen
digitButtons.forEach(button =>{
    button.addEventListener("click", ()=> {
        addDigit(button.textContent);
    })
});

// add operator to screen
operatorButtons.forEach(button => {
    button.addEventListener("click", ()=> {
        setOperation(button.textContent);
    });
});

// clear button
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", clear);

//equal button
const equalBtn = document.querySelector("#equal");
equalBtn.addEventListener("click", evaluate);

//operation functions

function addDigit(number) {
    // if result is 0 or already filled with digits rest result to empty string
    if (resultDisplay.textContent === "0" || shouldResetResultDisplay) {
        resetResult();
    }
    // add digits to empty string
    resultDisplay.textContent += number;
}

function resetResult() {
    resultDisplay.textContent = "";
    shouldResetResultDisplay = false; // indicates that screen is already rest
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate(); // if it's second operation
    // if it's first operation
    firstOperand = resultDisplay.textContent;
    currentOperation = operator;
    operationDisplay.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetResultDisplay = true; // result screen is filled => must be rest

}

function evaluate() {
    if (currentOperation === null || shouldResetResultDisplay) return; // prevent add or fire equal to be first operator
    if (currentOperation === "/" && resultDisplay.textContent === "0") {
        alert("can not divide by 0");
        return;
    }
    secondOperand = resultDisplay.textContent;
    resultDisplay.textContent = operate(currentOperation, firstOperand, secondOperand);
    operationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand}`;
    currentOperation = null; //return to first operation

}

function clear() {
    resultDisplay.textContent = "0";
    operationDisplay.textContent = "";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

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

function operate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            if (num2 === 0) return null;
            else return divide(num1, num2);
        default:
            return null;
    }
}


