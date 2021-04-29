const pieData = {
  labels: ['Principal', 'Payments', 'Interest'],
  datasets: [
    {
      label: 'Total Balance',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Object.values(Utils.CHART_COLORS),
    }
  ]
};

const pieConfig = {
  type: 'pie',
  data: pieData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Pie Chart'
      }
    }
  },
};

pie = new Chart(
  document.getElementById('pie'),
  pieConfig
);