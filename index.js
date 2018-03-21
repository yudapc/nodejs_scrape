const request = require('request'),
    cheerio = require('cheerio');

const urlTarget = 'https://weather.com/weather/today/l/IDXX0022:1:ID';

const main = () => {
  return request(urlTarget, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const $ = cheerio.load(body);
      const nowCardLocation = $('.today_nowcard h1.h4.today_nowcard-location').text();
      const condition = $('.today_nowcard div.today_nowcard-phrase').text();
      const temperatureF = $('.today_nowcard div.today_nowcard-temp span').text();
      const convertTemperature = (parseFloat(temperatureF) - 32) * 5 / 9;
      const temperatureC = Math.round(convertTemperature);
      console.log('location: ', nowCardLocation);
      console.log('condition: ', condition);
      console.log('temperature: ', temperatureF + ' F --> ' + temperatureC + ' C');
    }
  });
};

main();
