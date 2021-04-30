style = {
  mainBlue: '#1990FF',
  mainGreen: '#1ddb33',
  accentBlue: '#00EDFF',
  accentYellow: '#F6FF07',
  backgroundGreen: '#F0FFF0',
  lineBlue: '#253C5B',
  font: "'Hind Siliguri', sans-serif"
}

var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
// call with formatter.format(arg)

// create graph
const createGraphs = (principal, dataByMonth) => {
  // harvest data from dataByMonth
  let allLabels = [];
  let allData = {
    principalData: [],
    paymentsData: [],
    interestData: []
  }
  allData.principalData = (new Array(dataByMonth.length)).fill(principal, 0, dataByMonth.length);
  for (idx in dataByMonth) {
    allLabels.push(parseInt(idx) + 1);
    allData.paymentsData.push(principal + (dataByMonth[idx].payments));
    allData.interestData.push(principal + (dataByMonth[idx].payments) + dataByMonth[idx].interest);
  }
  const totalPayments = allData.paymentsData[allData.paymentsData.length -1] - principal;
  const totalInterest = allData.interestData[allData.interestData.length -1] - allData.paymentsData[allData.paymentsData.length -1];

  // FILL OUT INFO BOX
  document.getElementById('principal-li').innerText = `Principal: ${formatter.format(principal)}`
  document.getElementById('payments-li').innerText = `Total Payments: ${formatter.format(totalPayments)}`
  document.getElementById('interest-li').innerText = `Total Interest: ${formatter.format(totalInterest)}`


  // CREATE LINE CHART

  // delete old chart and create new one
  document.getElementById('graph').remove();
  let newChart = document.createElement('canvas');
  newChart.id = 'graph'
  document.getElementById('graph-container').append(newChart);

  const data = {
    labels: [''],
    datasets: [{
      label: 'Principal',
      data: [allData.principalData[0]],
      borderColor: style.accentYellow,
      backgroundColor: style.accentYellow,
      fill: true
    }, {
      label: 'Payments',
      data: [allData.paymentsData[0]],
      borderColor: style.mainBlue,
      backgroundColor: style.mainBlue,
      fill: true
    }, {
      label: 'Interest',
      data: [allData.interestData[0]],
      borderColor: style.mainGreen,
      backgroundColor: style.mainGreen,
      fill: true
    }],
    animations: {
      duration: 0
    }
  };

  const config = {
    type: 'line',
    data,
    options: {
      radius: 0,
      scales: {
        y: {
          min: 0,
          max: Math.ceil(principal * 4 / 100) * 100,
          ticks: {
            callback: val => formatter.format(val).slice(0, -3)
            }
        },
        x: {
          max: allLabels[allLabels.length -1],
          display: true,
          title: {
            display: true,
            text: 'Months',
            font: {
              size: 16,
            },
          }
        },
      },
      plugins: {
        filler: {
          drawTime: 'beforeDraw'
        },
      },
      animation: {
        duration: 0
      }
    }
  };

  // create graph
  let graph = new Chart(
    document.getElementById('graph'),
    config
  );

  let intervalTime = 100;

  let fillGraph = setInterval(() => {
    const gData = graph.data;
    if (gData.datasets[0].data.length === allLabels.length -1) { // once all data is displayed
      graph.data.labels = allLabels; // set labels
      clearInterval(fillGraph);
    }

    gData.labels.push(''); // update labels bc it won't work otherwise
    
    for (var i = 0; i < gData.datasets.length; ++i) {
      let data = gData.datasets[i].data
      data.push(Object.values(allData)[i][data.length]); // add next set of datapoints
    }
    graph.update();

  }, intervalTime);



  // CREATE PIE CHART

  document.getElementById('pie').remove();
  let newPie = document.createElement('canvas');
  newPie.id = 'pie'
  document.getElementById('pie-container').append(newPie);

  const pieData = {
    labels: ['Interest', 'Payments', 'Principal'],
    datasets: [{
      label: 'Total Balance',
      data: [totalInterest.toFixed(2), totalPayments.toFixed(2), principal.toFixed(2)],
      backgroundColor: [style.mainGreen, style.mainBlue, style.accentYellow]
    }]
  };

  const pieConfig = {
    type: 'pie',
    data: pieData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    },
  };

  let pie = new Chart(
    document.getElementById('pie'),
    pieConfig
  );

};