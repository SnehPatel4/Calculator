const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let fisrtValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //  Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // if current display value is 0, replace it, if not add number.
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If, no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and second value depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operator
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign first value if no value
  if (!fisrtValue) {
    fisrtValue = currentValue;
  } else {
    console.log(fisrtValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](fisrtValue, currentValue);
    calculatorDisplay.textContent = calculation;
    fisrtValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add Event Listners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset all value, diaplay
function resetAll() {
  fisrtValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Event Listners
clearBtn.addEventListener("click", resetAll);
