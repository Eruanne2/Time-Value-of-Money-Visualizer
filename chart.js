const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data,
  options: {}
};


var myChart = new Chart(
  document.getElementById('myChart'),
  config
);



// animate graph
const animateGraph = (principal, data) => {
  console.log('now the graph appears')
  console.log('principal', principal)
  console.log('dataByMonth', data);

  // fill in data by looping through formula

  // create graph with dataByMonth (x-axis are array indicies in months, y-axis are values in dollars)

};

