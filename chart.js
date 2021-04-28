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
  document.getElementById('graph').remove();
  let newChart = document.createElement('canvas');
  newChart.id = 'graph'
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

  const totalDuration = 5000;
  const delayBetweenPoints = totalDuration / labels.length;
  const previousY = (ctx) => 
    ctx.index === 0 ? 
    ctx.chart.scales.y.getPixelForValue(100) 
    : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

  data = {
    labels: labels,
    datasets: [{
      label: 'Principal',
      borderColor: style.accentYellow,
      backgroundColor: style.accentYellow,
      fill: true,
      borderWidth: 1,
      radius: 0,
      data: (new Array(dataByMonth.length)).fill(principal.toFixed(2), 0, dataByMonth.length),
    },
    {
      label: 'Payments',
      borderColor: style.mainBlue,
      backgroundColor: style.mainBlue,
      fill: true,
      borderWidth: 1,
      radius: 0,
      data: paymentsData,
    },
    {
      label: 'Interest',
      data: interestData,
      borderColor: style.mainGreen,
      backgroundColor: style.mainGreen,
      fill: true
    }]
  }

  const config = {
    type: 'line',
    data,
    options: {
      animation,
      interaction: {
        intersect: false
      },
      radius: 0,
      scales: {
        y: {
          min: 0
        },
        x: {
          type: 'linear'
        }
      },
      plugins: {
        legend: false,
        filler: {
          drawTime: 'beforeDraw'
        }
      }
    }
  };


  // create graph
  var graph = new Chart(
    document.getElementById('graph'),
    config
  );

};

