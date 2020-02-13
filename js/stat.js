'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var GAP_BAR = 50;
  var GAP_HEADER = 30;
  var FONT_GAP = 20;
  var TEXT_WIDTH = 50;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  };

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';

    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + GAP_HEADER);
    ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + GAP_HEADER + FONT_GAP);

    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      times[i] = Math.round(times[i]);
      var timeBar = Math.round(BAR_HEIGHT * times[i] / maxTime);
      var statisticsCoordinateX = CLOUD_X + TEXT_WIDTH + (GAP_BAR + BAR_WIDTH) * i;

      ctx.fillStyle = '#000';
      ctx.fillText(times[i], statisticsCoordinateX, CLOUD_HEIGHT - timeBar - CLOUD_Y * 4);
      ctx.fillText(names[i], statisticsCoordinateX, CLOUD_HEIGHT - CLOUD_Y);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240,' + getRandomIntInclusive(0, 100) + '%,50%)';
      }
      ctx.fillRect(statisticsCoordinateX, CLOUD_HEIGHT - timeBar - CLOUD_Y * 3, BAR_WIDTH, timeBar);
    }
  };
})();
