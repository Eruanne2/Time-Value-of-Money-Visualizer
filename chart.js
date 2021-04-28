style = {
  mainBlue: '#1990FF',
  mainGreen: '#1ddb33',
  accentBlue: '#00EDFF',
  accentYellow: '#F6FF07',
  backgroundGreen: '#F0FFF0',
  lineBlue: '#253C5B',
  font: "'Hind Siliguri', sans-serif"
}

// animate graph
const animateGraph = (principal, dataByMonth) => {

  // delete old chart and create new one
  document.getElementById('myChart').remove();
  let newChart = document.createElement('canvas');
  newChart.id = 'myChart'
  document.getElementById('graph-container').append(newChart);

  console.log('now the graph appears')
  console.log('principal', principal)
  console.log('dataByMonth', dataByMonth);

  const labels = [];
  const paymentsData = [];
  const interestData = [];
  for (idx in dataByMonth) {
    labels.push(idx + 1);
    paymentsData.push(principal + (dataByMonth[idx].payments));
    interestData.push(principal + (dataByMonth[idx].payments) + dataByMonth[idx].interest);
  }

  const data = {
    labels: labels,
    datasets: [{
      label: 'Principal',
      backgroundColor: style.accentYellow,
      borderColor: style.accentYellow,
      data: (new Array(dataByMonth.length)).fill(principal.toFixed(2), 0, dataByMonth.length-1),
    }, {
      label: 'Payments',
      backgroundColor: style.mainBlue,
      borderColor: style.mainBlue,
      data: paymentsData,
    }, {
      label: 'Interest',
      backgroundColor: style.mainGreen,
      borderColor: style.mainGreen,
      data: interestData,
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



  // fill in data by looping through formula

  // create graph with dataByMonth (x-axis are array indicies in months, y-axis are values in dollars)

};

