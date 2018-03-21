var request = require('request'),
    cheerio = require('cheerio');

var urlTarget = 'https://weather.com/weather/today/l/IDXX0022:1:ID';

function main() {
  return request(urlTarget, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(body);
      var nowCardLocation = $('.today_nowcard h1.h4.today_nowcard-location').text();
      var condition = $('.today_nowcard div.today_nowcard-phrase').text();
      var temperatureF = $('.today_nowcard div.today_nowcard-temp span').text();
      var convertTemperature = (parseFloat(temperatureF) - 32) * 5 / 9;
      var temperatureC = Math.round(convertTemperature);
      console.log('location: ', nowCardLocation);
      console.log('condition: ', condition);
      console.log('temperature: ', temperatureF + ' F --> ' + temperatureC + ' C');
    }
  });
};

main();
