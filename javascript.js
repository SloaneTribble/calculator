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
    x = "";
    y = "";
    operator = "";
    return result;
}

function evaluate(operator, x, y){
    // let operation = displayValue;
    // let regex = /[+-\?\*]/;
    // let opArray = operation.replace(/^-|([+\-*/])-/g, "$1#")
    //     .split(/([+\-*/])/)
    //     .map(e => e.replace("#", "-"));
    // let x = opArray[0];
    // let operator = opArray[1];
    // let y = opArray[2];

    

    let result = operate(operator, x, y);
    return result;
}

let dividedByZero = false;

let x = "";

let y = "";

let operator = "";

let display = document.querySelector("#display");
display.innerText = x + operator + y;



const operatorKeys = document.querySelectorAll(".operator-key");

operatorKeys.forEach((key) => {

    key.addEventListener('click', ()=> {
        if (dividedByZero === true){
            x = "";
            y = "";
            operator = "";
            display.innerText = x + operator + y;
            dividedByZero = false;
        }
        // let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/; 
        if (operator !== ""){
            display.innerText = evaluate(operator, x, y);
            x = display.innerText;
            operator = "";
            y = "";
        }
        operator += key.innerText;
        display.innerText += operator;
    });
});

const numKeys = document.querySelectorAll(".num-key");

numKeys.forEach((key) => {

    key.addEventListener('click', ()=> {
        if (dividedByZero === true){
            x = "";
            y = "";
            operator = "";
            display.innerText = "";
            dividedByZero = false;
        }
        if(operator !== ""){ // if an operator is present
            y += key.innerText; // add a digit to the right side of the expression
            display.innerText += key.innerText;
        } else {
            x += key.innerText; // add operator to left side of expression
            display.innerText += key.innerText;
        }
    });
});

const decimalKey = document.querySelector("#decimal");

decimalKey.addEventListener('click', ()=> {
    let parsedX = parseFloat(x);
    let parsedY = parseFloat(y);
    switch(true){
        case y === "" && parsedX % 1 === 0: 
            x += decimalKey.innerText;
            break;
        case operator !== "" && parsedY % 1 === 0: 
            y += decimalKey.innerText;
            break;
        default:
            break;
    }
    display.innerText = x + operator + y;

});

const clear = document.querySelector("#clear");

clear.addEventListener('click', ()=> {
    x = "";
    operator = "";
    y = "";
    display.innerText = x + operator + y;
});

const equals = document.querySelector("#equals");

equals.addEventListener('click', ()=> {
    let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        if (!operators.test(display.innerText)){
            return;}
    display.innerText = operate(operator, x, y);
});

const invertSign = document.querySelector("#invert-sign");

invertSign.addEventListener('click', ()=> {
    switch(true){
        case x !== 0 && operator === "": x *= (-1);
        break;
        case operator !== "" && y !== 0: y *= (-1);
        break;
        default: break;
    }
    display.innerText = x + operator + y;
});

const deleteKey = document.querySelector("#delete");

deleteKey.addEventListener('click', ()=>{
    let textString = `${display.innerText}`;
    let slicedString = textString.slice(0,-1);
    display.innerText = slicedString;
});



