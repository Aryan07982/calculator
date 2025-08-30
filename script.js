const inputField = document.querySelector('.input');
const buttons = document.querySelector('.buttons');
const operators = document.querySelectorAll('.operator');
let aStored = false;

let a = null;
let b = null;
let op = null;

function append(e){
    if (aStored){
        inputField.textContent = '';
    }
    if(e!==undefined){
        if(e==='.'){
            if(inputField.textContent.includes('.')){
                return;
            }
            if(inputField.textContent === ''){
                e = '0.'
            }
        }       

        inputField.textContent += e;
        inputField.scrollLeft = inputField.scrollWidth;
        aStored = false;
    }
}

function clearOne(){
    inputField.textContent = inputField.textContent.slice(0,-1);

    if(inputField.textContent==='' && aStored){
        a = null;
        resetOperatorBtns();
    }
}

function clearAll(){
    inputField.textContent = '';
    a = null;
    b = null;
    op = null;
    resetOperatorBtns();
}

function add(num1, num2){
    return num1+num2;
}

function sub(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    return num1/num2;
}

function operate(OP, check = null){

    resetOperatorBtns();

    if(a===null || aStored){
        return;
    }

    b = Number(inputField.textContent); 

    switch (OP) {
        case '+':
            a = add(a,b);
            break;
        case '-':
            a = sub(a,b);
            break;
        case '*':
            a = multiply(a,b);
            break;
        case '/':
            a = divide(a,b);
            break;
    
        default:
            break;
    }

    a = Math.round(a * 1000) / 1000;
    inputField.textContent = a; 
    b = null;
    op = null;
    aStored = true;

    if(check==='='){
        a = null
    }
}

function resetOperatorBtns(){
    operators.forEach((button)=>{
        button.style.cssText = 'background-color:#0EA5E9; border:none';
    });
}

function setOperator(operator){

    if(inputField.textContent === ''){
        return;
    }

    if(a===null){
        a = Number(inputField.textContent);
    } else{
        operate(op);
    }

    op = operator.value;

    resetOperatorBtns();

    operator.style.cssText = 'background-color:#0b52ea; border: 2px solid white';

    aStored = true;
}

buttons.addEventListener('click', (e)=>{
    let button = e.target;

    if (button.value==='AC') clearAll();
    else if (button.value==='C') clearOne();
    else if (button.value==='=') operate(op, button.value);
    else if(button.className === 'operator') setOperator(button);
    else if(button.value === '(' || button.value===')'){
        alert("this button is just to fill up space");
    }
    else append(button.value);
})

document.addEventListener('keydown', (e)=>{

    let key = e.key;

    if(!isNaN(key) || key==='.'){
        append(key);
    }
    if(key==='Enter'){
        operate(op, '=');
    }
    if(key==='Backspace'){
        clearOne();
    }
    if(key==='Escape'){
        clearAll();
    }
})