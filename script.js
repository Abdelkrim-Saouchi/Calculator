// global variables
const resultDisplay = document.querySelector(".result");
const operationDisplay = document.querySelector(".operation-display");
const operationButtons = Array.from(document.querySelectorAll(".btn"));
resultDisplay.textContent = "0";
let firstOperand;
let secondOperand;
let operator;



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




function isOperator(clickedBtn) {
    switch (clickedBtn.textContent) {
        case "x":
            return true;
        case "/":
            return true;
        case "+":
            return true;
        case "-":
            return true;
        case "=":
            return true;
        default:
            return false;
    }
}

function isMinus(clickedBtn) {
    if (clickedBtn.textContent === "-") return true;
    else return false;
}

function isDigit(clickedBtn) {
    if (isOperator(clickedBtn)) return false;
    else return true;
}

function addFirstDigit(clickedBtn) {
    if (isMinus(clickedBtn) || isDigit(clickedBtn)) {
        resultDisplay.textContent = clickedBtn.textContent;
        // return resultDisplay.textContent;
    }
}

function addSecondDigit(clickedBtn) {
    if (isDigit(clickedBtn)) {
        resultDisplay.textContent += clickedBtn.textContent;
    }
}

function isEqualOperator(clickedBtn) {
    if (isOperator(clickedBtn)) {
        if (clickedBtn.textContent === "=") return true;
        else return false;
    }
}
function run() {
    operationButtons.forEach(button => {
        let digitCounter = 0; //track digit additions
        let operatorCounter = 0; //track operator additions
        button.addEventListener("click", (e) => {
            //add first digit or (-)
            if (digitCounter < 1) {
                addFirstDigit(e.target);
                digitCounter++;
                console.log("entered 1");
            }
            // add other digits
            else if (digitCounter === 1 ) {
                console.log("entered 2");
                addSecondDigit(e.target);
                // if operator except equal was clicked 
                if (!isEqualOperator(e.target) && isOperator(e.target)) {
                    operationDisplay.textContent = resultDisplay.textContent + e.target.textContent;
                    digitCounter = 0;
                    operatorCounter++;
                }
                // if equal was clicked
                else if (isEqualOperator(e.target)) {
                    operationDisplay.textContent += resultDisplay.textContent + e.target.textContent;
                    digitCounter = 0;
                    operatorCounter = 0;
                    //calculate(operation)
                }
            }
            

            
        });
    });
    
}

run();



function getStringOperator(string) {
    if (string.includes("x")) return "x";
    else if (string.includes("/")) return "/";
    else if (string.includes("+")) return "+";
    else return "-";
}

// check if string of operations contains operator
function isIncludeOperator(operationString) {
    if (operationString.includes("x")) return true;
    else if (operationString.includes("/")) return true;
    else if (operationString.includes("+")) return true;
    else if (operationString.includes("-")) return true;
    else return false;
}
