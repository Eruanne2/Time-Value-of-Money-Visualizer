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

const errors = {
  currentValue: document.getElementById('current-value-error'),
  termLength: document.getElementById('term-length-error'),
  interestRate: document.getElementById('interest-error'),
  paymentAmount: document.getElementById('payment-error'),
  futureValue: document.getElementById('future-value-error')
}

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

let dataByMonth = {}; // { 1: { startingBalance: 1000, payments: 2500, interest: 482.34}, 2: {...}}


// link inputs and values


// EVENT HANDLERS
const handleUpdate = field => {
  console.log('inside handleUpdate');
  return e => {
    mockState[field] = e.currentTarget.value;
    if (mockState[field] !== '') errors[field].classList.add('hidden'); 
  }
};


/*
FV = PV x [ 1 + (i / n) ] ^ (n x (t / 12)), where:

FV = Future value of money
PV = Present value of money
i = interest rate
n = number of compounding periods per year
t = number of months
*/

// Assume a sum of $10,000 is invested for 1 year at 10% interest. 
// Monthly Compounding: FV = $10,000 x [1 + (10% / 12)] ^ (12 x 1) = $11,047
// Daily Compounding:   FV = $10,000 x [1 + (10% / 365)] ^ (365 x 1) = $11,052


const calculateCurrentValue = e => {
  e.preventDefault();
  console.log('inside calculatecurrentvalue')
  // check that the proper field are filled in - display errors
  if (termTextInput.value === '') errors["termLength"].classList.remove('hidden');
  if (interestInput.value === '') errors["interestRate"].classList.remove('hidden');
  if (paymentInput.value === '') errors["paymentAmount"].classList.remove('hidden');
  if (futureValueInput.value === '') errors["futureValue"].classList.remove('hidden');

  // calculate value and fill in field

  // trigger graph
};


const calculateTermLength = e => {

};

const calculateInterestRate = e => {

};

const calculatePaymentAmount = e => {

};

const calculateFutureValue = e => {

};

const handleClear = e => {
  e.preventDefault();
  
  Object.values(errors).forEach(err => err.classList.add('hidden'));
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

