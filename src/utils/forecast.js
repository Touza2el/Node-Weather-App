// 3rd Party Packages
const request = require('request');

// Declaring The Forecast Function
const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=86316bfda6a6d7893551704ec703e4d7&query=${longitude},${latitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable To Connect To Weather Stack Service.', undefined);
    } else if (body.error) {
      callback('Unable To Find Location', undefined);
    } else {
      const { temperature, feelslike } = body.current;

      callback(
        undefined,
        `It Is Currently ${temperature} degree, and it feels like ${feelslike}`
      );
    }
  });
};

module.exports = forecast; // Export The Forecast Function
