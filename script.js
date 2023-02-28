const numbersButtons = document.querySelectorAll(".number");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".operation")
const calcVisor = document.querySelector("#visor-text");
const visorCurrentExp = document.querySelector("#visor-cur-exp");
const clearAllButton = document.querySelector("#clear-all");
const clearEntryButton = document.querySelector("#clear-entry");
const floatButton = document.querySelector("#float-point");
const audioClick = new Audio("./sounds/click.wav");
const LIMIT_CHAR = 12;

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
    if (!isNaN(currentValue)) calcVisor.textContent += currentValue;
    
}

let clearAll = () =>{
    buildCurrentExp("");
    buildExpVisor("");
    firstValue = undefined;
    lastValue = undefined;
    operator = undefined;
}

let buildCurrentExp = (value) => {
    if (value === ""){
        console.log("lIMAP")
        visorCurrentExp.textContent = "";
    }
    if (isOperator(visorCurrentExp.textContent[visorCurrentExp.textContent.length-1]) === false){
        visorCurrentExp.textContent += value;
    }else{
        visorCurrentExp.textContent = visorCurrentExp.textContent.replace(visorCurrentExp.textContent[visorCurrentExp.textContent.length-1], value);
    }
    if (visorCurrentExp.textContent.length > LIMIT_CHAR){ 
       let newString = visorCurrentExp.textContent.substring(0, LIMIT_CHAR-1);
       visorCurrentExp.textContent = newString;
       visorCurrentExp.textContent += ".."; 
    }
}

const operacoes = {
    "+": (a,b) => a + b,
    "plus" : (a,b) => a+b,
    "-": (a,b) => a-b,
    "*": (a,b) => a*b,
    "/": (a,b) => b === 0 ? "Error":a/b, 
}
// refatorar depois 
// let plus = (value1, value2) => {return value1+value2}
// let minus = (value1, value2) => {return value1-value2}
// let times = (value1, value2) => {return value1 * value2};
// let divide = (value1, value2) => {
//     return ( value2 === 0 ? "Error" : value1/value2);
// }

let makeOperation = () => {
    if (firstValue !== undefined && lastValue !== undefined && operator !== undefined){
        buildCurrentExp("");
        buildCurrentExp(operacoes[operator](firstValue, lastValue));
        console.log(operacoes[operator](firstValue, lastValue));
        operacoes[operator](firstValue, lastValue) === "Error" ? firstValue=undefined : firstValue = +visorCurrentExp.textContent;
        lastValue = undefined;
        operator = undefined;
        buildExpVisor("");
    }
}

//refatorar depois
// let makeOperation = () =>{
    
//         makeOperation(operator);
//         // if (operator === "plus" || operator === "+"){
//         //     buildCurrentExp("");
//         //     buildCurrentExp(plus(firstValue, lastValue));
//         //     firstValue = +visorCurrentExp.textContent;
//         //     lastValue = undefined;
//         //     operator = undefined;
//         //     buildExpVisor("");
//         // }else if (operator === "-"){
//         //     buildCurrentExp("");
//         //     buildCurrentExp(minus(firstValue, lastValue));
//         //     firstValue = +visorCurrentExp.textContent;
//         //     lastValue = undefined;
//         //     operator = undefined;
//         //     buildExpVisor("");
//         // }else if (operator === "*"){
//         //     buildCurrentExp("");
//         //     buildCurrentExp(times(firstValue, lastValue));
//         //     firstValue = +visorCurrentExp.textContent;
//         //     lastValue = undefined;
//         //     operator = undefined;
//         //     buildExpVisor("");
//         // }else if (operator === "/"){
//         //     buildCurrentExp("");
//         //     buildCurrentExp(divide(firstValue, lastValue));
//         //     if (divide(firstValue, lastValue) !== "Error"){
//         //         firstValue = +visorCurrentExp.textContent;
//         //     }else{
//         //         firstValue = undefined;
//         //     }
//         //     lastValue = undefined;
//         //     operator = undefined;
//         //     buildExpVisor("");
//         // }
//     }
// }

document.addEventListener('keydown', (e)=>{
    
    /*console.log(e.key);*/
    if (isOperator(e.key)){
        updateCalc(e.key, e.key);
    }
    if (e.key === "Delete"){
        clearAll();
    }
    if (e.key === "Backspace"){
        clearLast();
    }
    (e.key !== "Shift" && e.key !== " ") ? numberBuilder(e.key) : "";
    if (e.key === "Enter"){
        e.preventDefault();
        showResult();
    }
})

function numberBuilder(idNumber){
    if (firstValue !== undefined && operator === undefined || visorCurrentExp.textContent==="Error"){
        buildCurrentExp("");
        firstValue = undefined;
    }
    buildExpVisor(idNumber);
}

numbersButtons.forEach( (button) => {
    button.addEventListener('click',(e)=>{
        audioClick.currentTime = 0;
        audioClick.play();
        numberBuilder(button.id);
    })
})

function updateCalc(operatorValue, operatorText){
    if (visorCurrentExp.textContent === "Error"){
        buildCurrentExp("");
    }
    if (firstValue === undefined && calcVisor.textContent !== ""){
        firstValue = +calcVisor.textContent;
        if (unaryFlag){
            if (visorCurrentExp.textContent[0] === "-") {firstValue *= -1;} 
            unaryFlag=false;
        }
        buildCurrentExp(firstValue);
        buildCurrentExp(operatorText);
        buildExpVisor("");
        operator = operatorValue;
    }else if (firstValue !== undefined && calcVisor.textContent !==""){
        lastValue = +calcVisor.textContent; 
        buildCurrentExp(lastValue);
        buildCurrentExp(operatorText);
        makeOperation();
        operator = operatorValue;
        buildCurrentExp(operatorText);
    }else if (firstValue !== undefined){
        operator = operatorValue;
        buildCurrentExp(operatorText);
    }else if (firstValue === undefined && calcVisor.textContent === "" && visorCurrentExp.textContent !== "Error"){
        if (operatorValue === "plus" || operatorValue === "-" || operatorValue === "+"){
            buildCurrentExp(operatorText);
            unaryFlag = true;
        }
    }
}

// refatorar depois 
operators.forEach((button) => {
    button.addEventListener('click', ()=>{
        audioClick.currentTime = 0;
        audioClick.play();
        updateCalc(button.id, button.textContent);
        
    });
})


function showResult(){
    if (firstValue !== undefined && operator !== undefined){
        lastValue = +calcVisor.textContent;
        makeOperation();
    }
}

equals.addEventListener('click', ()=>{
    audioClick.currentTime = 0;
    audioClick.play()
    showResult();
})

clearAllButton.addEventListener('click', ()=>{
    audioClick.currentTime = 0;
    audioClick.play();
    clearAll();
})

function clearLast(){
    calcVisor.textContent = calcVisor.textContent.replace(calcVisor.textContent[calcVisor.textContent.length-1], "");
}

clearEntryButton.addEventListener('click', () => {
    audioClick.currentTime = 0;
    audioClick.play()
    clearLast();
})

floatButton.addEventListener('click', ()=>{
    audioClick.currentTime = 0;
    audioClick.play();
    //Se não tiver nada no visor
    calcVisor.textContent === "" ? calcVisor.textContent= "0." : calcVisor.textContent+=".";

})