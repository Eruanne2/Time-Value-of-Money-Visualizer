// DOM elements
const startBalanceInput = document.getElementById('start-balance-input');
const termTextInput = document.getElementById('term-text-input');
const termSelectInput = document.getElementById('term-select-input');
const interestInput = document.getElementById('interest-input');
const compoundsSelect = document.getElementById('compounds-select');
const paymentInput = document.getElementById('payment-input');
const endBalanceInput = document.getElementById('end-balance-input');
const submitBtn = document.getElementById('submit-btn');

// calc values
const startBalance = 0;
const termLength = 0;
const termPeriod = 'years';
const interestRate = 0.0;
const compounds = 'monthly';
const paymentAmount = 0;
const endBalance = 0;

// EVENT HANDLERS
const handleUpdate = field => {
  return e => field = e.currentTarget.value;
};

const handleSubmit = e => {
  // check to see which field should be calculated

  // call the appropriate method

  // fill in the appropriate field

  // trigger graph
};

// add event listeners
startBalanceInput.addEventListener('change', e => handleUpdate('startBalance')); // is this correct??



// OTHER FUNCTIONS

// animate graph
const animateGraph = () => {

};

// calculations
const calculateFinalBalance = () => {

};

const calculateStartingBalance = () => {

};

const calculateTermLength = () => {

};

const calculateInterestRate = () => {

};

const monthlyPayment = () => {

};

