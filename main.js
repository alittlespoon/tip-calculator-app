// input variables
const billInput = document.querySelector(".bill-amount");
const totalPaxInput = document.querySelector(".total-pax");
const inputMessage = document.querySelector(".input-message");
const inputs = document.querySelectorAll("input");
const customTipInput = document.querySelector(".custom-tip");

// button variables
const submitBtn = document.querySelector(".submit-btn");
const resetBtn = document.querySelector(".reset-btn");
const tipBtns = document.querySelectorAll(".tip-btn");

// display variables
const tipPercentageDisplay = document.querySelector(".tip-percentage");
const totalTipDisplay = document.querySelector(".total-tip");
const totalBillDisplay = document.querySelector(".total-bill");
const calculatedTipDisplay = document.querySelector(".calculated-tip");
const calculatedTotalDisplay = document.querySelector(".calculated-total");

// clear input when page reloads
window.onload = function () {
  let inputs = document.querySelectorAll("input");
  for (let input of inputs) {
    input.value = "";
  }

  // disable submit button by default
  submitBtn.disabled = true;
};

// validate individual inputs
function validateInput(input) {
  // if value is not a number
  if (isNaN(input.value)) {
    input.classList.add("invalid");
    return false;
  }
  // if total pax is 0
  else if (input.classList.contains("total-pax") && input.value == 0) {
    input.classList.add("invalid");
    inputMessage.style.visibility = "visible";
    return false;
  }
  input.classList.remove("invalid");
  inputMessage.style.visibility = "hidden";
  return true;
}

// check if all inputs are valid
function validateInputs() {
  let isValid = true;
  for (let input of inputs) {
    if (!validateInput(input)) {
      isValid = false;
    }
  }
  return isValid;
}

// enable/disable submit button based on validity of inputs
for (let input of inputs) {
  input.addEventListener("input", function () {
    if (!validateInputs()) {
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
    }
  });
}

// set initival values for tip variables
let selectedBtn = null;
let selectedTip = 0;

// function to set tip amount
function setTipAmount(amount) {
  // convert to number
  selectedTip = parseFloat(amount);
}

for (let btn of tipBtns) {
  btn.addEventListener("click", function () {
    // remove selected class from previously selected button
    if (selectedBtn) {
      selectedBtn.classList.remove("selected");
    }

    this.classList.add("selected");
    selectedBtn = this;
    customTipInput.value = "";

    let tip = btn.dataset.tipAmount;
    setTipAmount(tip / 100);
  });
}

// register custom tip input
customTipInput.addEventListener("input", function () {
  // remove selected class from previously selected button
  if (selectedBtn) {
    selectedBtn.classList.remove("selected");
    selectedBtn = null;
  }

  let customTip = this.value.replace("%", "");
  setTipAmount(customTip / 100);
});

// calculate function
function calculateTotal() {
  const billAmount = parseFloat(billInput.value);
  const totalPax = parseInt(totalPaxInput.value, 10);
  const totalTip = billAmount * selectedTip;
  const totalBill = billAmount + totalTip;

  totalTipDisplay.textContent = `$${totalTip.toFixed(2)}`;
  totalBillDisplay.textContent = `$${totalBill.toFixed(2)}`;

  const tipPerPerson = totalTip / totalPax;
  const totalPerPerson = totalBill / totalPax;

  calculatedTipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
  calculatedTotalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;

  tipPercentageDisplay.textContent = `(${selectedTip * 100}%)`;
}

submitBtn.addEventListener("click", calculateTotal);

// reset function
function reset() {
  const displayValues = document.querySelectorAll(".result-amount");

  for (let display of displayValues) {
    display.textContent = display.dataset.defaultText;
  }

  for (let input of inputs) {
    input.value = "";
  }

  if (selectedBtn) {
    selectedBtn.classList.remove("selected");
  }

  submitBtn.disabled = true;
}

resetBtn.addEventListener("click", reset);
