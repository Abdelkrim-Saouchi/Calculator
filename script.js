// operation functions
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
    if (b == 0) return "Error";
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

// populate display functions
function displayDigits() {
    const resultDisplay = document.querySelector(".result");
    const digits = Array.from(document.querySelectorAll(".digit"));

    digits.forEach(digit => {
        digit.addEventListener("click", () => {
            let text = digit.textContent;
            resultDisplay.textContent += text;
        });
    });
    // return resultDisplay.textContent;
}

displayDigits();

function displayOperation() {
    const resultDisplay = document.querySelector(".result");
    const operationDisplay = document.querySelector(".operation-display");
    const operators = Array.from(document.querySelectorAll(".operator"));

    operators.forEach( operator => {
        operator.addEventListener("click", (e) => {
            if (e.target.textContent === "=") return;
            else {
            
                operationDisplay.textContent = resultDisplay.textContent + e.target.textContent;
                resultDisplay.textContent = "";
                
            }
            
        });
        
    });
}

displayOperation();


function calculateResult() {
    const resultDisplay = document.querySelector(".result");
    const operationDisplay = document.querySelector(".operation-display");

    let expression = operationDisplay.textContent + resultDisplay.textContent;
    let copy = expression;

    expression = expression.replace(/[0-9]+/g, "#").replace(/[\(|\|\.)]/g, "");
    const numbers = copy.split(/[^0-9\.]+/);
    const operators = expression.split("#").filter(function(n){return n});
    const result = [];

    for(i = 0; i < numbers.length; i++){
         result.push(numbers[i]);
         if (i < operators.length) result.push(operators[i]);
    }

    console.log(result);
    operationDisplay.textContent += resultDisplay.textContent;
    resultDisplay.textContent = `${operate(result[1], +result[0], +result[2])}`;
    // console.log(operate(result[1], +result[0], +result[2]));
}

const equalKey = document.querySelector("#equal");
equalKey.addEventListener("click", calculateResult);

