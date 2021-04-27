// DOM elements
const currentValueInput = document.getElementById('current-value-input');
const currentValueGo = document.getElementById('current-value-go');
const termTextInput = document.getElementById('term-text-input');
const termSelectInput = document.getElementById('term-select-input');
const termGo = document.getElementById('term-go');
const interestInput = document.getElementById('interest-input');
const interestGo = document.getElementById('interest-go');
const compoundsSelect = document.getElementById('compounds-select');
const paymentInput = document.getElementById('payment-input');
const paymentGo = document.getElementById('payment-go');
const futureValueInput = document.getElementById('future-value-input');
const futureValueGo = document.getElementById('future-value-go');
const clearBtn = document.getElementById('clear-btn');

// calc values
let mockState = {
  currentValue: 0,
  termLength: 0,
  termPeriod: 'years',
  interestRate: 0.0,
  compounds: 'monthly',
  paymentAmount: 0,
  futureValue: 0
}


// link inputs and values


// EVENT HANDLERS
const handleUpdate = field => {
  return e => mockSate[field] = e.currentTarget.value;
};

const calculateCurrentValue = () => {
  // check that the proper field are filled in - display errors

  // calculate value and fill in field

  // trigger graph
};


const calculateTermLength = () => {

};

const calculateInterestRate = () => {

};

const calculatePaymentAmount = () => {

};

const calculateFutureValue = () => {

};

const handleClear = e => {
  e.preventDefault();

  currentValueInput.value = '';
  termTextInput.value = '';
  termSelectInput.value = 'years';
  interestInput.value = '';
  compoundsSelect.value = 'monthly';
  paymentInput.value = '';
  futureValueInput.value = '';
};

// add event listeners
currentValueInput.addEventListener('input', handleUpdate('currentValue'));
currentValueGo.addEventListener('click', calculateCurrentValue);
termTextInput.addEventListener('input', handleUpdate('termLength'));
termSelectInput.addEventListener('input', handleUpdate('termPeriod'));
termGo.addEventListener('click', calculateTermLength);
interestInput.addEventListener('input', handleUpdate('interestRate'));
interestGo.addEventListener('click', calculateInterestRate);
compoundsSelect.addEventListener('input', handleUpdate('compounds'));
paymentInput.addEventListener('input', handleUpdate('paymentAmount'));
paymentGo.addEventListener('click', calculatePaymentAmount);
futureValueInput.addEventListener('input', handleUpdate('futureValue'));
futureValueGo.addEventListener('click', calculateFutureValue);
clearBtn.addEventListener('click', handleClear);



// OTHER FUNCTIONS

// animate graph
const animateGraph = () => {

};

