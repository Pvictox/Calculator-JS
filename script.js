const numbersButtons = document.querySelectorAll(".number");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".operation")
const calcVisor = document.querySelector("#visor-text");
const visorCurrentExp = document.querySelector("#visor-cur-exp");

let firstValue = undefined;
let lastValue = undefined;
let operator = undefined;
let unaryFlag = false;

const listOperators = ['+', '-', '*', '/'];

let isOperator = (value) => {
    result = listOperators.filter((op) => {
        if (op === value){
            return true;
        }
    });

    if (result.length > 0){
        return true;
    }else{
        return false;
    }
}


//Função responsável por modificar o visor.
let buildExpVisor = (currentValue) =>{
    if (currentValue !== ""){
        currentValue = +currentValue
    }else{
        calcVisor.textContent = currentValue;
    }
    calcVisor.textContent += currentValue;
}



let buildCurrentExp = (value) => {
    if (value === ""){
        visorCurrentExp.textContent = "";
    }
    if (isOperator(visorCurrentExp.textContent[visorCurrentExp.textContent.length-1]) === false){
        visorCurrentExp.textContent += value;
    }else{
        visorCurrentExp.textContent = visorCurrentExp.textContent.replace(visorCurrentExp.textContent[visorCurrentExp.textContent.length-1], value);
    }
}

// refatorar depois 
let plus = (value1, value2) => {return value1+value2}
let minus = (value1, value2) => {return value1-value2}
let times = (value1, value2) => {return value1 * value2};

//refatorar depois
let calcResult = () =>{
    if (firstValue !== undefined && lastValue !== undefined && operator !== undefined){
        if (operator === "plus"){
            buildCurrentExp("");
            buildCurrentExp(plus(firstValue, lastValue));
            firstValue = +visorCurrentExp.textContent;
            lastValue = undefined;
            operator = undefined;
            buildExpVisor("");
        }else if (operator === "minus"){
            buildCurrentExp("");
            buildCurrentExp(minus(firstValue, lastValue));
            firstValue = +visorCurrentExp.textContent;
            lastValue = undefined;
            operator = undefined;
            buildExpVisor("");
        }else if (operator === "times"){
            buildCurrentExp("");
            buildCurrentExp(times(firstValue, lastValue));
            firstValue = +visorCurrentExp.textContent;
            lastValue = undefined;
            operator = undefined;
            buildExpVisor("");
        }
    }
}

numbersButtons.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        if (firstValue !== undefined && operator === undefined){
            buildCurrentExp("");
            firstValue = undefined;
        }
        buildExpVisor(button.id);
    })
})


// refatorar depois 
operators.forEach((button) => {
    button.addEventListener('click', ()=>{
        if (firstValue === undefined && calcVisor.textContent !== ""){
            firstValue = +calcVisor.textContent;
            if (unaryFlag){
                if (visorCurrentExp.textContent[0] === "-") {firstValue *= -1;} 
                unaryFlag=false;
            }
            buildCurrentExp(firstValue);
            buildCurrentExp(button.textContent);
            buildExpVisor("");
            operator = button.id;
        }else if (firstValue !== undefined && calcVisor.textContent !==""){
            lastValue = +calcVisor.textContent; 
            buildCurrentExp(lastValue);
            buildCurrentExp(button.textContent);
            calcResult();
            operator = button.id;
            buildCurrentExp(button.textContent);
        }else if (firstValue !== undefined){
            operator = button.id;
            buildCurrentExp(button.textContent);
        }else if (firstValue === undefined && calcVisor.textContent === ""){
            if (button.id === "plus" || button.id === "minus"){
                buildCurrentExp(button.textContent);
                unaryFlag = true;
            }
        }
    });
})

equals.addEventListener('click', ()=>{
    if (firstValue !== undefined && operator !== undefined){
        lastValue = +calcVisor.textContent;
        calcResult();
    }
})