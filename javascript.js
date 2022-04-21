// BRANCH!!!

function add(x ,y) {
    return x + y;
}

function subtract(x ,y) {
    return x - y;
}

function multiply(x ,y) {
    return x * y;
}

function divide(x ,y) {
    return x / y;
}

function operate(operator, x, y){
    x = parseFloat(x);
    y = parseFloat(y);
    let result = 0;
    switch(operator){
        case "+": result = x + y;
        break;
        case "-": result = x - y;
        break;
        case "*": result = x * y;
        break;
        case "/": 
            if (y === 0) {
                result = "Cannot divide by zero!"; 
                dividedByZero = true;
                break;}
            result = x / y;
            result = result.toFixed(10);   
        break;
    }
    return result;
}

function evaluate(displayValue){
    let operation = displayValue;
    let regex = /[+-\?\*]/;
    let opArray = operation.replace(/^-|([+\-*/])-/g, "$1#")
        .split(/([+\-*/])/)
        .map(e => e.replace("#", "-"));
    let x = opArray[0];
    let operator = opArray[1];
    let y = opArray[2];

    let result = operate(operator, x, y);
    return result;
}

let dividedByZero = false;

let display = document.querySelector("#display");
display.innerText = [];



const operatorKeys = document.querySelectorAll(".operator-key");

operatorKeys.forEach((key) => {

    key.addEventListener('click', ()=> {
        if (dividedByZero === true){
            display.innerText = "";
            dividedByZero = false;
        }
        let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        if (operators.test(display.innerText)){
            display.innerText = evaluate(display.innerText);
        }
        let currentState = `${display.innerText}`;
        currentState += `${key.innerText}`;
        display.innerText = currentState;
    });
});

const decimalKey = document.querySelector("#decimal");

decimalKey.addEventListener('click', ()=> {
    let operation = display.innerText;
    let regex = /[+-\?\*]/;
    let opArray = operation.replace(/^-|([+\-*/])-/g, "$1#")
        .split(/([+\-*/])/)
        .map(e => e.replace("#", "-"));
    let x = opArray[0];
    let operator = opArray[1];
    let y = opArray[2];
    let decimal = /[\.]/;

    switch(true){
        case decimal.test(x) && !y: return;
        break;
        case decimal.test(y): return;
    }
    display.innerText += decimalKey.innerText;
});

const numKeys = document.querySelectorAll(".num-key");

numKeys.forEach((key) => {

        key.addEventListener('click', ()=> {
            if (dividedByZero === true){
                display.innerText = "";
                dividedByZero = false;
            }
            let currentState = `${display.innerText}`;
            currentState += key.innerText;
            display.innerText = currentState;
        });
});

const clear = document.querySelector("#clear");

clear.addEventListener('click', ()=> {
    display.innerText = "";
});

const equals = document.querySelector("#equals");

equals.addEventListener('click', ()=> {
    let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        if (!operators.test(display.innerText)){
            return;}
    display.innerText = evaluate(display.innerText);
});

const deleteKey = document.querySelector("#delete");

deleteKey.addEventListener('click', ()=>{
    let textString = `${display.innerText}`;
    let slicedString = textString.slice(0,-1);
    display.innerText = slicedString;
});



