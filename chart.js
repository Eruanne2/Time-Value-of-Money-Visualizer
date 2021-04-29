style = {
  mainBlue: '#1990FF',
  mainGreen: '#1ddb33',
  accentBlue: '#00EDFF',
  accentYellow: '#F6FF07',
  backgroundGreen: '#F0FFF0',
  lineBlue: '#253C5B',
  font: "'Architects Daughter', cursive"
}

// create graph
const createGraphs = (principal, dataByMonth) => {

  // CREATE LINE CHART

  // delete old chart and create new one
  document.getElementById('graph').remove();
  let newChart = document.createElement('canvas');
  newChart.id = 'graph'
  document.getElementById('graph-container').append(newChart);

  // harvest data from dataByMonth
  let allLabels = [];
  let allData = {
    principalData: [],
    paymentsData: [],
    interestData: []
  }
  allData.principalData = (new Array(dataByMonth.length)).fill(principal, 0, dataByMonth.length);
  for (idx in dataByMonth) {
    allLabels.push(idx + 1);
    allData.paymentsData.push(principal + (dataByMonth[idx].payments));
    allData.interestData.push(principal + (dataByMonth[idx].payments) + dataByMonth[idx].interest);
  }

  const data = {
    labels: [allLabels[0]],
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
          max: Math.ceil(1.25 * allData.interestData[allData.interestData.length - 1] / 100) * 100 
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
  graph = new Chart(
    document.getElementById('graph'),
    config
  );

  let intervalTime = 100;

  let fillGraph = setInterval(() => {
    const gData = graph.data;
    if (gData.datasets[0].data.length === allLabels.length) {
      graph.labels = allLabels;
      clearInterval(fillGraph);
    }
    gData.labels.push(allLabels[gData.labels.length])
    
    for (var i = 0; i < gData.datasets.length; ++i) {
      let data = gData.datasets[i].data
      data.push(Object.values(allData)[i][data.length]);
    }
    graph.update();
  }, intervalTime);



  // CREATE PIE CHART

  document.getElementById('pie').remove();
  let newPie = document.createElement('canvas');
  newPie.id = 'pie'
  document.getElementById('pie-container').append(newPie);

  const pieData = {
    labels: ['Principal', 'Payments', 'Interest'],
    datasets: [{
      label: 'Total Balance',
      data: [
        principal, 
        allData.paymentsData[allData.paymentsData.length -1] - principal,
        allData.interestData[allData.interestData.length -1] - allData.paymentsData[allData.paymentsData.length -1] - principal
      ],
      backgroundColor: [style.accentYellow, style.mainBlue, style.mainGreen]
    }]
  };

  const pieConfig = {
    type: 'pie',
    data: pieData,
    options: {
      responsive: true,
      plugins: {
        legend: false
      }
    },
  };

  pie = new Chart(
    document.getElementById('pie'),
    pieConfig
  );
};