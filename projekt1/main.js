let inputsCount = 3;
let inputsWithNumbers = 0;


function calculate(){
  const inputs = document.getElementsByClassName("inputNumber");

  let arr = [];
  for(let i = 0; i < inputs.length; i++){
    arr.push(parseFloat(inputs[i].value))
  };
  

  let max = Number.MIN_VALUE;
  let min = Number.MAX_VALUE;
  let sum = 0;
  let avg = 0;
  for(let i = 0; i < inputs.length; i++){
    max = Math.max(arr[i],max)
    min = Math.min(arr[i],min)
    sum += arr[i]
  };
  avg = sum / inputs.length

  document.getElementById("avgResult").innerHTML = "Średnia: " + avg;

  document.getElementById("maxResult").innerHTML = "Maksymalna: " + max;

  document.getElementById("minResult").innerHTML = "Minimalna: " + min;
  
  document.getElementById("sumResult").innerHTML = "Suma: " + sum;
}

function addInput(){
  const inputs = document.getElementById("inputs");
  const inputField = document.createElement("input"); 
  inputField.setAttribute("class", "inputNumber");
  inputField.addEventListener("change", calculate);
  inputs.appendChild(inputField);
}

function deleteInput(){
  const inputs = document.getElementById("inputs");
  const inputsNumbers = document.getElementsByClassName("inputNumber");
  inputs.removeChild(inputsNumbers[inputsNumbers.length - 1]);
  calculate();
}

const x = document.getElementsByClassName("inputNumber");
for(let i = 0; i < x.length; i++){
  x[i].addEventListener("change",calculate)
};
document.getElementById("createButton").addEventListener("click",addInput);
document.getElementById("deleteButton").addEventListener("click",deleteInput);


