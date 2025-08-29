const inputField = document.querySelector('.input');
const buttons = document.querySelector('.buttons');

function append(e){
    if(e!==undefined){
    inputField.textContent += e;
    inputField.scrollLeft = inputField.scrollWidth;
    }
}

function clearOne(){
    inputField.textContent = inputField.textContent.slice(0,-1);
}

function clearAll(){
    inputField.textContent = '';
}

function calculate(){
    try {
        let ans = eval(inputField.textContent);
        if (!(Number.isInteger(ans))){
            inputField.textContent = ans.toFixed(2);
        }else{
            inputField.textContent = ans;
        }
   
        inputField.scrollLeft = inputField.scrollWidth; 
    } catch (error) {
        inputField.textContent = "Error *-*"
    }
}

buttons.addEventListener('click', (e)=>{
    let button = e.target.value;

    if (button==='AC') clearAll();
    else if (button==='C') clearOne();
    else if (button==='=') calculate();
    else append(button);
})