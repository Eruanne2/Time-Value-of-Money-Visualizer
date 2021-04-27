// DOM elements
const presentValueInput = document.getElementById('present-value-input');
const presentValueGo = document.getElementById('present-value-go');
const termTextInput = document.getElementById('term-text-input');
const termSelectInput = document.getElementById('term-select-input');
const termGo = document.getElementById('term-go');
const interestInput = document.getElementById('interest-input');
const interestGo = document.getElementById('interest-go');
const compoundsSelect = document.getElementById('compounds-select');
// const paymentInput = document.getElementById('payment-input');
// const paymentGo = document.getElementById('payment-go');
const futureValueInput = document.getElementById('future-value-input');
const futureValueGo = document.getElementById('future-value-go');
const clearBtn = document.getElementById('clear-btn');

const errors = {
  presentValue: document.getElementById('present-value-error'),
  termLength: document.getElementById('term-length-error'),
  interestRate: document.getElementById('interest-error'),
  // paymentAmount: document.getElementById('payment-error'),
  futureValue: document.getElementById('future-value-error')
}


// link inputs and values
const getValuesFromInput = () => {
  return {
    pv: (parseInt(presentValueInput.value)).toFixed(2),
    fv: (parseInt(futureValueInput.value)).toFixed(2),
    i: (parseFloat(interestInput.value)).toFixed(2),
    n: parseInt(termTextInput.value) * parseInt(termTextSelect.value),
    pmt: (parseInt(paymentInput.value)).toFixed(2)
  };
}


// EVENT HANDLERS

const calculatePresentValue = e => {
  e.preventDefault();
  
  // check that the proper field are filled in - display errors
  if (termTextInput.value === '') errors['termLength'].classList.remove('hidden');
  if (interestInput.value === '') errors['interestRate'].classList.remove('hidden');
  // if (paymentInput.value === '') errors['paymentAmount'].classList.remove('hidden');
  if (futureValueInput.value === '') errors['futureValue'].classList.remove('hidden');

  // convert termLength to months and find compound periods
  if (mockState['termPeriod'] === 'years') mockState['termLength'] = mockState['termLength'] * 12;

  // calculate missing value
  debugger
  let numer = mockState['futureValue'];
  let denom = (1 + (mockState['interestRate'] / mockState['compoundPeriods'])) ** (mockState['termLength'] * mockState['compoundPeriods'] / 12);
  mockState['presentValue'] = (numer / denom).toFixed(2);
  presentValueInput.value = mockState['presentValue'];

  // trigger graph
  animateGraph();
};


const calculateTermLength = e => {
  e.preventDefault();
  console.log('inside calculatepresentvalue')
  // check that the proper field are filled in - display errors
  if (presentValueInput.value === '') errors["presentValue"].classList.remove('hidden');
  if (interestInput.value === '') errors["interestRate"].classList.remove('hidden');
  // if (paymentInput.value === '') errors["paymentAmount"].classList.remove('hidden');
  if (futureValueInput.value === '') errors["futureValue"].classList.remove('hidden');

  // calculate value and fill in field

  // trigger graph
  animateGraph();
};

const calculateInterestRate = e => {
  e.preventDefault();
  console.log('inside calculatepresentvalue')
  // check that the proper field are filled in - display errors
  if (presentValueInput.value === '') errors["presentValue"].classList.remove('hidden');
  if (termTextInput.value === '') errors["termLength"].classList.remove('hidden');
  // if (paymentInput.value === '') errors["paymentAmount"].classList.remove('hidden');
  if (futureValueInput.value === '') errors["futureValue"].classList.remove('hidden');

  // calculate value and fill in field

  // trigger graph
  animateGraph();
};

// const calculatePaymentAmount = e => {
//   e.preventDefault();
//   console.log('inside calculatepresentvalue')
//   // check that the proper field are filled in - display errors
//   if (presentValueInput.value === '') errors["presentValue"].classList.remove('hidden');
//   if (termTextInput.value === '') errors["termLength"].classList.remove('hidden');
//   if (interestInput.value === '') errors["interestRate"].classList.remove('hidden');
//   if (futureValueInput.value === '') errors["futureValue"].classList.remove('hidden');

//   // calculate value and fill in field

//   // trigger graph
//   animateGraph();
// };

const calculateFutureValue = e => {
  e.preventDefault();
  console.log('inside calculatepresentvalue')
  // check that the proper field are filled in - display errors
  if (presentValueInput.value === '') errors["presentValue"].classList.remove('hidden');
  if (termTextInput.value === '') errors["termLength"].classList.remove('hidden');
  if (interestInput.value === '') errors["interestRate"].classList.remove('hidden');
  // if (paymentInput.value === '') errors["paymentAmount"].classList.remove('hidden');

  // calculate value and fill in field

  // trigger graph
  animateGraph();
};

const handleClear = e => {
  e.preventDefault();

  Object.values(errors).forEach(err => err.classList.add('hidden'));
  presentValueInput.value = '';
  termTextInput.value = '';
  termSelectInput.value = 'years';
  interestInput.value = '';
  compoundsSelect.value = 'monthly';
  paymentInput.value = '';
  futureValueInput.value = '';
};

// add event listeners
presentValueInput.addEventListener('input', handleUpdate('presentValue'));
presentValueGo.addEventListener('click', calculatePresentValue);
termTextInput.addEventListener('input', handleUpdate('termLength'));
termSelectInput.addEventListener('input', handleUpdate('termPeriod'));
termGo.addEventListener('click', calculateTermLength);
interestInput.addEventListener('input', handleUpdate('interestRate'));
interestGo.addEventListener('click', calculateInterestRate);
compoundsSelect.addEventListener('input', handleUpdate('compoundPeriods'));
// paymentInput.addEventListener('input', handleUpdate('paymentAmount'));
// paymentGo.addEventListener('click', calculatePaymentAmount);
futureValueInput.addEventListener('input', handleUpdate('futureValue'));
futureValueGo.addEventListener('click', calculateFutureValue);
clearBtn.addEventListener('click', handleClear);



// OTHER FUNCTIONS

// animate graph
const animateGraph = () => {
  console.log('now the graph appears')

  let dataByMonth = []; // [{ startingBalance: 1000, payments: 2500, interest: 482.34}, {...}]
  // fill in data by looping through formula

  // create graph with dataByMonth (x-axis are array indicies in months, y-axis are values in dollars)

};

