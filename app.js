var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// DOM elements
const pvTab = document.getElementById('pv-tab');
const fvTab = document.getElementById('fv-tab');
const presentValueInput = document.getElementById('present-value-input');
const termTextInput = document.getElementById('term-text-input');
const termSelectInput = document.getElementById('term-select-input');
const interestInput = document.getElementById('interest-input');
const compoundsSelect = document.getElementById('compounds-select');
const paymentInput = document.getElementById('payment-input');
const futureValueInput = document.getElementById('future-value-input');
const calculateBtn = document.getElementById('calculate-btn');
const displayOutput = document.getElementById('display-output');
const errors = {
  presentValue: document.getElementById('present-value-error'),
  termLength: document.getElementById('term-length-error'),
  interestRate: document.getElementById('interest-error'),
  futureValue: document.getElementById('future-value-error')
};

// mock state to store values
let mockState = {
  pv: 0,        // present value
  fv: 0,        // future value
  i: 0,         // interest rate
  n: 0,         // times compounding per year
  t: 0,         // time in months
  pmt: 0        // monthly payment amount
};

// Util functions and event handlers
const removeError = field => e => errors[field].classList.add('hidden');

var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
// call with formatter.format(arg)

const handleClear = e => {
  e.preventDefault();

  Object.values(errors).forEach(err => err.classList.add('hidden'));
  presentValueInput.value = '';
  termTextInput.value = '';
  termSelectInput.value = '12';
  interestInput.value = '';
  compoundsSelect.value = '12';
  paymentInput.value = '';
  futureValueInput.value = '';
  displayOutput.innerText = '';
};


// link inputs and values
const getValuesFromInput = () => {
  mockState.pv = parseFloat(presentValueInput.value);
  mockState.fv = parseFloat(futureValueInput.value);
  mockState.i = parseFloat(interestInput.value) / 100;
  mockState.n = parseFloat(compoundsSelect.value);
  mockState.t = parseFloat(termTextInput.value) * parseFloat(termSelectInput.value);
  mockState.pmt = parseFloat(paymentInput.value) || 0;
  return mockState;
}


// toggle tabs
const openPVTab = e => {
  calculateBtn.removeEventListener('click', calculateFV);
  calculateBtn.addEventListener('click', calculatePV);
  presentValueInput.classList.add('hidden');
  document.getElementById('pv-label').classList.add('hidden');
  futureValueInput.classList.remove('hidden');
  document.getElementById('fv-label').classList.remove('hidden');
  pvTab.classList.remove('not-selected')
  fvTab.classList.add('not-selected')
  displayOutput.innerText = '';
}
const openFVTab = e => {
  calculateBtn.removeEventListener('click', calculatePV);
  calculateBtn.addEventListener('click', calculateFV);
  presentValueInput.classList.remove('hidden');
  document.getElementById('pv-label').classList.remove('hidden');
  futureValueInput.classList.add('hidden');
  document.getElementById('fv-label').classList.add('hidden');
  pvTab.classList.add('not-selected')
  fvTab.classList.remove('not-selected')
  displayOutput.innerText = '';
}



// calculations and graph creation
const calculatePV = e => {
  e.preventDefault();

  // check that the proper field are filled in - display errors
  let errorsPresent = false;
  if (termTextInput.value === '') { errors["termLength"].classList.remove('hidden'); errorsPresent = true; }
  if (parseInt(futureValueInput.value) === 0) { errors["futureValue"].classList.remove('hidden'); errorsPresent = true; }
  if (interestInput.value === '') { errors["interestRate"].classList.remove('hidden'); errorsPresent = true; }
  if (futureValueInput.value === '') { errors["futureValue"].classList.remove('hidden'); errorsPresent = true; }
  if (errorsPresent) return;
  else Object.values(errors).forEach(err => err.classList.add('hidden'));

  // calculations
  let vals = getValuesFromInput();
  vals.pv = 0;
  let dataByMonth = [];

  for (let count = vals.t; count >= 1; count--){ // iterate through each month, starting with the last
    vals.fv = parseFloat(vals.fv) - parseFloat(vals.pmt); // subtract payment

    let numer = vals.fv; // calculate balance before this month's interest
    let denom = (1 + (vals.i / vals.n)) ** (vals.n / 12); 
    vals.pv = numer / denom;

    dataByMonth.unshift({ // push this month's balances to the beginning of the array
      total: vals.fv + parseFloat(vals.pmt),
      payments: (count) * vals.pmt,
      interest: vals.fv - vals.pv // this is not cumulative
    });
    vals.fv = vals.pv; // set the previous month's ending balance to this month's starting balance
  }

  for (let i = 1; i < dataByMonth.length; i++){ // make interest cumulative
    dataByMonth[i].interest += dataByMonth[i-1].interest;
  };
  
  displayOutput.innerText = `Present Value: ${formatter.format(vals.pv)}`; // display present value to user
  let principal = vals.pv;
  
  createGraphs(principal, dataByMonth);
}


const calculateFV = e => {
  e.preventDefault();
  // check that the proper field are filled in - display errors
  let errorsPresent = false;
  if (presentValueInput.value === '') { errors["presentValue"].classList.remove('hidden'); errorsPresent = true; }
  if (termTextInput.value === '') { errors["termLength"].classList.remove('hidden'); errorsPresent = true; }
  if (interestInput.value === '') { errors["interestRate"].classList.remove('hidden'); errorsPresent = true; }
  if (errorsPresent) return;
  else Object.values(errors).forEach(err => err.classList.add('hidden'));


  // calculate value and fill in field
  let vals = getValuesFromInput();
  vals.fv = 0;
  let principal = vals.pv;
  let dataByMonth = [];

  for (let count = 1; count <= vals.t; count++){ // iterate through each month
    vals.fv = parseFloat(vals.pv) * (1 + (vals.i / vals.n)) ** (vals.n / 12); // accumulate interest
    vals.fv = parseFloat(vals.fv) + parseFloat(vals.pmt); // add payment
    dataByMonth.push({ // push this month's ending balances to the end of the array
      total: vals.fv,
      payments: (count) * vals.pmt, 
      interest: vals.fv - (principal) - ((count) * vals.pmt)
    });
    vals.pv = vals.fv; // set the next month's starting balance to this month's ending balance
  }

  displayOutput.innerText = `Future Value: ${formatter.format(vals.fv)}`; // display future value to user

  // trigger graph
  createGraphs(principal, dataByMonth);
};

// add event listeners
document.getElementById('main-header').addEventListener('click', handleClear);
presentValueInput.addEventListener('input', removeError('presentValue'));
pvTab.addEventListener('click', openPVTab);
termTextInput.addEventListener('input', removeError('termLength'));
interestInput.addEventListener('input', removeError('interestRate'));
futureValueInput.addEventListener('input', removeError('futureValue'));
fvTab.addEventListener('click', openFVTab);
document.getElementById('clear-btn').addEventListener('click', handleClear);
calculateBtn.addEventListener('click', calculateFV);
