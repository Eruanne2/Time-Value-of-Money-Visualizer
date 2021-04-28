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
      data: (new Array(dataByMonth.length)).fill(principal.toFixed(2), 0, dataByMonth.length),
      borderColor: style.accentYellow,
      backgroundColor: style.accentYellow,
      fill: true
    }, {
      label: 'Payments',
      data: paymentsData,
      borderColor: style.mainBlue,
      backgroundColor: style.mainBlue,
      fill: true
    }, {
      label: 'Interest',
      data: interestData,
      borderColor: style.mainGreen,
      backgroundColor: style.mainGreen,
      fill: true
    }]
  };

  const config = {
    type: 'line',
    data,
    options: {
      radius: 0,
      scales: {
        y: {
          min: 0
        }
      },
      plugins: {
        filler: {
          drawTime: 'beforeDraw'
        }
      }
    }
  };

  // create graph
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

};