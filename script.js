const numbersButtons = document.querySelectorAll(".number");
const equals = document.querySelector("#equals");
const operators = document.querySelectorAll(".operation")
const calcVisor = document.querySelector("#visor-text");
const visorCurrentExp = document.querySelector("#visor-cur-exp");

let firstValue = undefined;
let lastValue = undefined;
let operator = undefined;

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
    visorCurrentExp.textContent += value;
}

let plus = (value1, value2) => {return value1+value2}
let minus = (value1, value2) => {return value1-value2}

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
        }
    }
}

numbersButtons.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        buildExpVisor(button.id);
    })
})

operators.forEach((button) => {
    button.addEventListener('click', ()=>{
        console.log(`current operator: ${operator}`);
        if (firstValue === undefined && calcVisor.textContent !== ""){
            firstValue = +calcVisor.textContent;
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
        }else if (firstValue !== undefined){
            buildCurrentExp(button.textContent);
        }
        console.log(`First: ${firstValue}`);
        console.log(`Last: ${lastValue}`);
    });
})

equals.addEventListener('click', ()=>{
    if (firstValue !== undefined && operator !== undefined){
        lastValue = +calcVisor.textContent;
        calcResult();
    }
})