style = {
  mainBlue: '#1990FF',
  mainGreen: '#1ddb33',
  accentBlue: '#00EDFF',
  accentYellow: '#F6FF07',
  backgroundGreen: '#F0FFF0',
  lineBlue: '#253C5B',
  font: "'Hind Siliguri', sans-serif"
}

// create variables for use in AddData
let allLabels = [];
let allData = {
  principalData: [],
  paymentsData: [],
  interestData: []
}
var graph;

// animate graph
const animateGraph = (principal, dataByMonth) => {

  // delete old chart and create new one
  document.getElementById('graph').remove();
  let newChart = document.createElement('canvas');
  newChart.id = 'graph'
  document.getElementById('graph-container').append(newChart);

  // fill in allData
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
      },
      animation: {
        easing: 'easeOutQuart',
        from: (ctx) => {
          if (ctx.type === 'data') {
            if (ctx.mode === 'default' && !ctx.dropped) {
              ctx.dropped = true;
              return 0;
            }
          }
        }
      }
    }
  };

  // create graph
  graph = new Chart(
    document.getElementById('graph'),
    config
  );

  let intervalTime = 5000.0 / allLabels.length;

  let fillGraph = setInterval(() => {
    const gData = graph.data;
    if (gData.labels.length === allLabels.length) clearInterval(fillGraph);
  
    gData.labels.push(allLabels[gData.labels.length])
    
    for (var i = 0; i < gData.datasets.length; ++i) {
      let data = gData.datasets[i].data
      data.push(Object.values(allData)[i][data.length]);
    }
    graph.update();
  }, intervalTime);

};