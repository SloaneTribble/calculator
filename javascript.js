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
    // x = result;
    // y = "";
    // operator = "";
    return result.toString();
}

let dividedByZero = false;

let x = "0";

let y = "";

let operator = "";

let display = document.querySelector("#display");
display.innerText = x + operator + y;



const operatorKeys = document.querySelectorAll(".operator-key");

operatorKeys.forEach((key) => {

    key.addEventListener('click', ()=> {
        if (operator == null){operator = ""};
        if (dividedByZero === true){
            x = "0";
            y = "";
            operator = "";
            display.innerText = x + operator + y;
            dividedByZero = false;
        }
        // let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/; 
        if (operator !== ""){
            display.innerText = operate(operator, x, y);
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
            x = "0";
            y = "";
            operator = "";
            display.innerText = "";
            dividedByZero = false;
        }
        if(operator !== ""){ // if an operator is present
            y += key.innerText; // add a digit to the right side of the expression
            display.innerText += key.innerText;
        } else {
            if(x === "0"){
                x = key.innerText;
                display.innerText = key.innerText;
            }else{
                x += key.innerText; // add operator to left side of expression
                display.innerText += key.innerText;
            }
            
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



const equals = document.querySelector("#equals");

equals.addEventListener('click', ()=> {
    let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        if (!operators.test(display.innerText)){
            return;}
    x = operate(operator, x, y);
    y = "";
    operator = "";
    display.innerText = x + operator + y;

});

const invertSign = document.querySelector("#invert-sign");

invertSign.addEventListener('click', ()=> {
    switch(true){
        case x !== "0" && operator === "": x *= (-1);
        break;
        case operator !== "" && y !== 0: y *= (-1);
        break;
        default: break;
    }
    display.innerText = x + operator + y;
});

const clear = document.querySelector("#clear");

clear.addEventListener('click', ()=> {
    x = "0";
    operator = "";
    y = "";
    display.innerText = x + operator + y;
});

const deleteKey = document.querySelector("#delete");

deleteKey.addEventListener('click', ()=>{
    switch(true){
        case (y !== ""): 
            y = y.slice(0,-1);
            break;
        case (y === "" && operator !== ""):
            operator = "";
            break;
        case (x.length === 1 && operator === ""):
            x = "0";
            break;
        case (x !== "0" && operator === ""):
            x = x.slice(0, -1);
            break;
        default:
            x = "0";
            break;
    }
    display.innerText = x + operator + y;    
});

let input = document.querySelector('input');


window.addEventListener('keydown', e => {
	handler(e.key);
});

function handler(key) {
    let input = "";
    let isOperator = false;
	switch(key) {
    case '1':
        input = "1";
        break;
    case '2':
        input = "2";
        break;
    case '3':
        input = "3";
        break;
    case '4':
        input = "4";
        break;
    case '5':
        input = "5";
        break;
    case '6':
        input = "6";
        break;
    case '7':
        input = "7";
        break;
    case '8':
        input = "8";
        break;
    case '9':
        input = "9";
        break;
    case '0':
        input = "0";
        break;
    case '+':
        input = "+";
        isOperator = true;
        break;
    case '-':
        display.innerText += '-';
        input = "-";
        isOperator = true;
        break;
    case '*':
        display.innerText += "*";
        input = "*";
        isOperator = true;
        break;
    case '/':
        display.innerText += '/';
        input = "/";
        isOperator = true;
        break;
    case 'Enter':
        let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
        if (!operators.test(display.innerText)){
            return;}
        x = operate(operator, x, y);
        y = "";
        operator = "";
        display.innerText = x + operator + y;

    case "Backspace":
        switch(true){
            case (y !== ""): 
                y = y.slice(0,-1);
                break;
            case (y === "" && operator !== ""):
                operator = "";
                break;
            case (x.length === 1 && operator === ""):
                x = "0";
                break;
            case (x !== "0" && operator === ""):
                x = x.slice(0, -1);
                break;
            default:
                x = "0";
                break;
        }
        display.innerText = x + operator + y;   
        break;
        
    default:
        display.innerText += '';
        break;
  }


  if (dividedByZero === true){
    x = "0";
    y = "";
    operator = "";
    display.innerText = "";
    dividedByZero = false;
}


  if(isOperator){
      
        if (operator !== ""){
        display.innerText = operate(operator, x, y);
        x = display.innerText;
        operator = "";
        y = "";
        } else {
        operator = input;
        display.innerText = x + operator + y;
        }
    } else {
        
        if(operator !== ""){ // if an operator is present
            y += input; // add a digit to the right side of the expression
            display.innerText += input;
        } else {
            if(x === "0"){
                x = input;
                display.innerText = input;
            }else{
                x += input; // add operator to left side of expression
                display.innerText += input;
            } 
        }
    }
}

