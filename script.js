// global variables
const resultDisplay = document.querySelector(".result");
const operationDisplay = document.querySelector(".operation-display");


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
    const digits = Array.from(document.querySelectorAll(".digit"));

    digits.forEach(digit => { //add digits to display
        digit.addEventListener("click", () => {
            let text = digit.textContent;
            // resultDisplay.textContent += text;
            operationDisplay.textContent += text;
        });
    });
}

displayDigits();

function displayOperation() {
    // get operators in arrays
    const operators = Array.from(document.querySelectorAll(".operator"));
    // counter to count number of operator in operation
    var counter = 0;
    operators.forEach( operator => {
        operator.addEventListener("click", (e) => {
            // if operator (except equal) is clicked before and clicked again fire calculations 
            if (e.target.textContent !== "=" && (counter === 1 || isIncludeOperator(operationDisplay.textContent)) &&
                 getOperationsArray(operationDisplay.textContent)[2] !== "") {
                console.log("entered")
                
                
                resultDisplay.textContent = calculateResult(getOperationsArray(operationDisplay.textContent));
                operationDisplay.textContent = resultDisplay.textContent + e.target.textContent;
                
                counter = 0;
            }
            // if equal was clicked and other operator was click before
            else if (counter === 1 && e.target.textContent === "=") {
                console.log("entered =");
                resultDisplay.textContent = calculateResult(getOperationsArray(operationDisplay.textContent));
                operationDisplay.textContent = resultDisplay.textContent;
                counter = 0;
            }
            // add operator to display
            else {
                console.log("entered else");
                if (getOperationsArray(operationDisplay.textContent).length === 3 && getOperationsArray(operationDisplay.textContent) !== "") {
                    resultDisplay.textContent = calculateResult(getOperationsArray(operationDisplay.textContent));
                    operationDisplay.textContent = resultDisplay.textContent;
                    counter = 0;
                }
               else {
                    if (e.target.textContent === "=") return; //prevent addition of equal to display
                    operationDisplay.textContent += e.target.textContent;
                    resultDisplay.textContent = "";
                    counter++; //indicate that operator is clicked
               }
                // const array = getOperationsArray(operationDisplay.textContent);
                // console.log(typeof array[2]);
                
            }
                
            
        });
        
    });
}

displayOperation();


// function that transforms string of operation to array
function getOperationsArray(operationString) {
    let expression = operationString;
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
    return result;
    
    
}

//Do calculations
function calculateResult(array) {
    return `${operate(array[1], +array[0], +array[2])}`;
}

// check if string of operations contains operator
function isIncludeOperator(operationString) {
    if (operationString.includes("x")) return true;
    else if (operationString.includes("/")) return true;
    else if (operationString.includes("+")) return true;
    else if (operationString.includes("-")) return true;
    else return false;
}
