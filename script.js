const numbersButtons = document.querySelectorAll(".number");
const calcVisor = document.querySelector("#visor");

let buildEXP = (currentValue) =>{
    if (currentValue !== ""){
        currentValue = +currentValue
    }
    calcVisor.textContent = currentValue;
}

numbersButtons.forEach( (button) => {
    button.addEventListener('click', (e)=>{
        buildEXP(button.id);
    })
})