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
                result = "Nice try!"; 
                dividedByZero = true;
                break;}
            result = x / y;
            result = result.toFixed(8);
            result = result.toString();
            if(result.length > 14){result = result.slice(0, 14);} 
        break;
    }

    return result;
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
        if(display.innerText.length > 16){return;}

        if (operator !== "" && y === ""){return;}
        // if (operator == null){operator = ""}; // Pretty sure this is unnecessary
        if (dividedByZero === true){
            x = "0"; // reset display
            y = "";
            operator = "";
            display.innerText = x + operator + y;
            dividedByZero = false;
        }
        // let operators = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/; 
        // ^^^ Older version used regex to split the string in display into
        // three components -- seemed to be more error prone

        if (operator !== "" && y !== ""){ // if an operator is present
            display.innerText = operate(operator, x, y); //perform the current operation
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
        if(display.innerText.length > 16){return;}

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
            if(x === "0"){ // prevents a digit from being concatenated to 0
                x = key.innerText; 
                display.innerText = key.innerText;
            }else{
                x += key.innerText; // add a digit to left side of expression
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
    //if x is an integer, and no operator or right operand are present
        case y === "" && operator === "" && parsedX % 1 === 0 && !x.includes("."): 
            x += decimalKey.innerText; // add a decimal point to x
            break;
    //if y is not present but there is an operator
        case y === "" && operator !== "":
            y += decimalKey.innerText; //place a decimal point in front of future operand
            break;
        case operator !== "" && parsedY % 1 === 0 && !y.includes("."): //
            y += decimalKey.innerText; 
            break;
        default:
            break;
    }
    display.innerText = x + operator + y;

});



const equals = document.querySelector("#equals");

equals.addEventListener('click', ()=> {
    if(operator === "" || operator !== "" && y === "" || x === "." || y === "."){
        return;
    }
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
    display.innerText = x.toString() + operator + y.toString();
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
    let backSpace = false;

    if(dividedByZero === true){
        x = "0";
        y = "";
        operator = "";
        display.innerText = x + operator + y;
        dividedByZero = false;
        return;
    }
    
	switch(key) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6': 
    case '7':
    case '8':
    case '9':
    case '0':
        input = key;
        break;
     
    case '+':
    case '-':
    case '*':
    case '/':
        input = key;
        isOperator = true;
        break;

    case '.':
        if(display.innerText.length > 16){return;}
        let parsedX = parseFloat(x);
        let parsedY = parseFloat(y);
        switch(true){
            case y === "" && operator === "" && parsedX % 1 === 0 && !x.includes("."): 
            x += decimalKey.innerText; // add a decimal point to x
            break;
        case y === "" && operator !== "":
            y += decimalKey.innerText;
            break;
        case operator !== "" && parsedY % 1 === 0 && !y.includes("."): //
            y += decimalKey.innerText; 
            break;
        default:
            break;
        }
    display.innerText = x + operator + y;
    return;
       
    case '=':
        if(operator === "" || operator !== "" && y === "" || x === "." || y === "."){
            return;
        }

        display.innerText = operate(operator, x, y).toString();
        if(dividedByZero === true){
            x = "Cannot divide by zero!";
            y = "";
            operator = "";
            return;
        }
        x = display.innerText;
        y = "";
        operator = "";
        return;
    break;

    case "Backspace":
        backSpace = true;
        x = x.toString();
        y = y.toString();
        switch(true){
            case (y !== ""): 
                y = y.slice(0,-1);
                break;
            case (y === "" && operator !== ""):
                operator = "";
                break;
            case (x.length === 0 && operator === ""):
                x = "0";
                break;
            case (x !== "0" && operator === ""):
                x = x.slice(0, -1);
                if (x === ""){x = "0";}
                break;
            default:
                x = "0";
                break;
        }
        display.innerText = x + operator + y;  
        break;

    case "Shift":
        return;
        break;
        
    default:
        return;
        break;
  }


  if (dividedByZero === true){
    x = "0";
    y = "";
    operator = "";
    display.innerText = "";
    dividedByZero = false;
}

if(display.innerText.length > 16 || backSpace === true){return;}//prevent overflowing display;

  if(isOperator){
        if(operator !== "" && y === ""){input = "";}

        if (operator !== "" && y !== ""){
            display.innerText = operate(operator, x, y);
            x = display.innerText;
            operator = input;
            y = "";
            display.innerText = x + operator + y;
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

