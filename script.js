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
        case "*":
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
                operationDisplay.textContent += resultDisplay.textContent + e.target.textContent;
                resultDisplay.textContent = "";
            }
            
            
        });
    });
}

displayOperation();


function calculateResult() {
    const resultDisplay = document.querySelector(".result");
    const operationDisplay = document.querySelector(".operation-display");
    
}

