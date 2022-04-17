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
    x = parseInt(x);
    y = parseInt(y);
    let result = 0;
    switch(operator){
        case "+": result = x + y;
        break;
        case "-": result = x - y;
        break;
        case "*": result = x * y;
        break;
        case "/": result = x / y;
        break;
    }
    return result;
}

function evaluate(displayValue){
    let operation = displayValue;
    let opArray = operation.match(/[^\d()]+|[\d.]+/g);
    let x = opArray[0];
    let operator = opArray[1];
    let y = opArray[2];

    return operate(operator, x, y);
}


let display = document.querySelector("#display");
display.innerText = [];



const operatorKeys = document.querySelectorAll(".operator-key");

operatorKeys.forEach((key) => {

    key.addEventListener('click', ()=> {
        let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (operators.test(display.innerText)){
            display.innerText = evaluate(display.innerText);
        }
        let currentState = `${display.innerText}`;
        currentState += `${key.innerText}`;
        display.innerText = currentState;
    });
});

const numKeys = document.querySelectorAll(".num-key");

numKeys.forEach((key) => {

        key.addEventListener('click', ()=> {
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
    display.innerText = evaluate(display.innerText);
});

