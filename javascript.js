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