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
    let result = 0;
    switch(operator){
        case "+": result = x + y;
        break;
        case "-": result = x - y;
        break;
        case "*": result = x / y;
        break;
        case "/": result = x * y;
        break;
    }
    return result;
}

let display = document.querySelector("#display");
display.innerText = [];

const operatorKeys = document.querySelectorAll(".operator-key");
let space = " ";

operatorKeys.forEach((key) => {

    key.addEventListener('click', ()=> {
        display.innerText += ` ${key.innerText} `;
    });
});

const numKeys = document.querySelectorAll(".num-key");

numKeys.forEach((key) => {

        key.addEventListener('click', ()=> {
            display.innerText += key.innerText;
        });
});

