// DOM elements
const presentValueInput = document.getElementById('present-value-input');
const presentValueGo = document.getElementById('present-value-go');
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
  presentValue: document.getElementById('present-value-error'),
  termLength: document.getElementById('term-length-error'),
  interestRate: document.getElementById('interest-error'),
  paymentAmount: document.getElementById('payment-error'),
  futureValue: document.getElementById('future-value-error')
}

// link inputs and values
const getValuesFromInput = () => {
  return {
    pv: parseFloat(presentValueInput.value),                                // present value
    fv: parseFloat(futureValueInput.value),                                 // future value
    i: (parseFloat(interestInput.value) / 100).toFixed(2),                  // interest rate
    n: parseFloat(compoundsSelect.value),                                   // times compounding per year
    t: parseFloat(termTextInput.value) * parseFloat(termSelectInput.value), // time in months
    pmt: (parseFloat(paymentInput.value)).toFixed(2)                        // monthly payment amount
  };
}

// EVENT HANDLERS
const calculatePresentValue = e => {
  e.preventDefault();

  // check that the proper field are filled in - display errors
  if (termTextInput.value === '') errors['termLength'].classList.remove('hidden');
  if (interestInput.value === '') errors['interestRate'].classList.remove('hidden');
  if (paymentInput.value === '') errors['paymentAmount'].classList.remove('hidden');
  if (futureValueInput.value === '') errors['futureValue'].classList.remove('hidden');

  // calculate present value
  let vals = getValuesFromInput();
  vals.pv = 0;
  let dataByMonth = [];
  let finalBalance = vals.fv;
  // let numer = vals.fv;
  // let denom = (1 + (vals.i / vals.n)) ** (vals.n * vals.t / 12);
  // vals.pv = numer / denom;

  for (let count = vals.t; count >= 1; count--){ // iterate through each month, starting with the last
    vals.fv = parseFloat(vals.fv) - parseFloat(vals.pmt); // subtract payment

    let numer = vals.fv; // calculate balance before this month's interest
    let denom = (1 + (vals.i / vals.n)) ** (vals.n / 12); 
    vals.pv = numer / denom;

    dataByMonth.unshift({ // push this month's balances to the beginning of the array
      total: vals.fv,
      payments: (count) * vals.pmt, 
      interest: vals.fv - vals.pv
    });

    vals.fv = vals.pv; // set the previous month's ending balance to this month's starting balance
  }
  
  presentValueInput.value = vals.pv.toFixed(2); // display present value to user
  let principal = vals.pv;
  // trigger graph
  animateGraph(principal, dataByMonth);
};

const calculateFutureValue = e => {
  e.preventDefault();
  console.log('inside calculatepresentvalue')
  // check that the proper field are filled in - display errors
  if (presentValueInput.value === '') errors["presentValue"].classList.remove('hidden');
  if (termTextInput.value === '') errors["termLength"].classList.remove('hidden');
  if (interestInput.value === '') errors["interestRate"].classList.remove('hidden');
  if (paymentInput.value === '') errors["paymentAmount"].classList.remove('hidden');

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
  animateGraph(principal, dataByMonth);
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
presentValueGo.addEventListener('click', calculatePresentValue);
futureValueGo.addEventListener('click', calculateFutureValue);
clearBtn.addEventListener('click', handleClear);



// OTHER FUNCTIONS

// animate graph
const animateGraph = (principal, data) => {
  console.log('now the graph appears')
  console.log('principal', principal)
  console.log('dataByMonth', data);

  // fill in data by looping through formula

  // create graph with dataByMonth (x-axis are array indicies in months, y-axis are values in dollars)

};

