
// DOM elements
const mainHeader = document.getElementById('main-header');
const presentValueInput = document.getElementById('present-value-input');
const presentValueGo = document.getElementById('present-value-go');
const termTextInput = document.getElementById('term-text-input');
const termSelectInput = document.getElementById('term-select-input');
const interestInput = document.getElementById('interest-input');
const compoundsSelect = document.getElementById('compounds-select');
const paymentInput = document.getElementById('payment-input');
const futureValueInput = document.getElementById('future-value-input');
const futureValueGo = document.getElementById('future-value-go');
const clearBtn = document.getElementById('clear-btn');
const errors = {
  presentValue: document.getElementById('present-value-error'),
  termLength: document.getElementById('term-length-error'),
  interestRate: document.getElementById('interest-error'),
  futureValue: document.getElementById('future-value-error')
}

// FUNCTIONS

const removeError = field => e => errors[field].classList.add('hidden');

var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
// call with formatter.format(arg)

const resetPage = e => {
  e.preventDefault();
  handleClear(new Event('click'));
  document.querySelector('form').classList.remove('slide');
  document.getElementById('charts').classList.add('invisible');
  document.getElementById('charts').classList.remove('fade');
}

// link inputs and values
const getValuesFromInput = () => {
  return {
    pv: parseFloat(presentValueInput.value),                                // present value
    fv: parseFloat(futureValueInput.value),                                 // future value
    i: parseFloat(interestInput.value) / 100,                               // interest rate
    n: parseFloat(compoundsSelect.value),                                   // times compounding per year
    t: parseFloat(termTextInput.value) * parseFloat(termSelectInput.value), // time in months
    pmt: parseFloat(paymentInput.value) || 0                                // monthly payment amount
  };
}

// calculations
const calculatePresentValue = e => {
  e.preventDefault();

  // check that the proper field are filled in - display errors
  let errorsPresent = false;
  if (termTextInput.value === '') { errors["termLength"].classList.remove('hidden'); errorsPresent = true; }
  if (interestInput.value === '') { errors["interestRate"].classList.remove('hidden'); errorsPresent = true; }
  if (futureValueInput.value === '') { errors["futureValue"].classList.remove('hidden'); errorsPresent = true; }
  if (errorsPresent) return;
  else Object.values(errors).forEach(err => err.classList.add('hidden'));

  // display graph
  document.querySelector('form').classList.add('slide');
  document.getElementById('charts').classList.remove('invisible');
  document.getElementById('charts').classList.add('fade');

  // calculate present value
  let vals = getValuesFromInput();
  vals.pv = 0;
  let dataByMonth = [];
  // let finalBalance = vals.fv;

  for (let count = vals.t; count >= 1; count--){ // iterate through each month, starting with the last
    vals.fv = parseFloat(vals.fv) - parseFloat(vals.pmt); // subtract payment

    let numer = vals.fv; // calculate balance before this month's interest
    let denom = (1 + (vals.i / vals.n)) ** (vals.n / 12); 
    vals.pv = numer / denom;

    dataByMonth.unshift({ // push this month's balances to the beginning of the array
      total: vals.fv + parseFloat(vals.pmt),
      payments: (count) * vals.pmt,
      interest: vals.fv - vals.pv // this is not be cumulative
    });
    vals.fv = vals.pv; // set the previous month's ending balance to this month's starting balance
  }

  for (let i = 1; i < dataByMonth.length; i++){ // make interest cumulative
    dataByMonth[i].interest += dataByMonth[i-1].interest;
  };
  
  presentValueInput.value = vals.pv.toFixed(2); // display present value to user
  let principal = vals.pv;

  // trigger graph
  createGraphs(principal, dataByMonth);
};

const calculateFutureValue = e => {
  e.preventDefault();
  // check that the proper field are filled in - display errors
  let errorsPresent = false;
  if (presentValueInput.value === '') { errors["presentValue"].classList.remove('hidden'); errorsPresent = true; }
  if (termTextInput.value === '') { errors["termLength"].classList.remove('hidden'); errorsPresent = true; }
  if (interestInput.value === '') { errors["interestRate"].classList.remove('hidden'); errorsPresent = true; }
  if (errorsPresent) return;
  else Object.values(errors).forEach(err => err.classList.add('hidden'));

  // display graph
  document.querySelector('form').classList.add('slide');
  document.getElementById('charts').classList.remove('invisible');

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

  futureValueInput.value = vals.fv.toFixed(2); // display future value to user

  // trigger graph
  createGraphs(principal, dataByMonth);
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
mainHeader.addEventListener('click', resetPage);
presentValueInput.addEventListener('input', removeError('presentValue'));
presentValueGo.addEventListener('click', calculatePresentValue);
termTextInput.addEventListener('input', removeError('termLength'));
interestInput.addEventListener('input', removeError('interestRate'));
futureValueInput.addEventListener('input', removeError('futureValue'));
futureValueGo.addEventListener('click', calculateFutureValue);
clearBtn.addEventListener('click', handleClear);


