// Javascript
var randomScalingFactor = function () {
  return Math.round(Math.random() * 100);
};

var color = Chart.helpers.color;
var config = {
  type: 'radar',
  data: {
    labels: [['Eating', 'Dinner'], ['Drinking', 'Water'], 'Sleeping', ['Designing', 'Graphics'], 'Coding', 'Cycling', 'Running'],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
      borderColor: window.chartColors.red,
      pointBackgroundColor: window.chartColors.red,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }, {
      label: 'My Second dataset',
      backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
      borderColor: window.chartColors.blue,
      pointBackgroundColor: window.chartColors.blue,
      data: [
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor(),
        randomScalingFactor()
      ]
    }]
  },
  options: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Radar Chart'
    },
    scale: {
      ticks: {
        beginAtZero: true
      }
    },
    resopnsive: true,
    responsiveAnimationDuration: 10
  }
};

window.onload = function () {
  window.myRadar = new Chart(document.getElementById('canvas'), config);
};

document.getElementById('randomizeData').addEventListener('click', function () {
  config.data.datasets.forEach(function (dataset) {
    dataset.data = dataset.data.map(function () {
      return randomScalingFactor();
    });
  });

  window.myRadar.update();
});

var colorNames = Object.keys(window.chartColors);
document.getElementById('addDataset').addEventListener('click', function () {
  var colorName = colorNames[config.data.datasets.length % colorNames.length];
  var newColor = window.chartColors[colorName];

  var newDataset = {
    label: 'Dataset ' + config.data.datasets.length,
    borderColor: newColor,
    backgroundColor: color(newColor).alpha(0.2).rgbString(),
    pointBorderColor: newColor,
    data: [],
  };

  for (var index = 0; index < config.data.labels.length; ++index) {
    newDataset.data.push(randomScalingFactor());
  }

  config.data.datasets.push(newDataset);
  window.myRadar.update();
});

document.getElementById('addData').addEventListener('click', function () {
  if (config.data.datasets.length > 0) {
    config.data.labels.push('dataset #' + config.data.labels.length);

    config.data.datasets.forEach(function (dataset) {
      dataset.data.push(randomScalingFactor());
    });

    window.myRadar.update();
  }
});

document.getElementById('removeDataset').addEventListener('click', function () {
  config.data.datasets.splice(0, 1);
  window.myRadar.update();
});

document.getElementById('removeData').addEventListener('click', function () {
  config.data.labels.pop(); // remove the label first

  config.data.datasets.forEach(function (dataset) {
    dataset.data.pop();
  });

  window.myRadar.update();
});
