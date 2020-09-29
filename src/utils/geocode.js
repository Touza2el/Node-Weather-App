// 3rd Party Packages
const request = require('request');

// Declaring The Geocode Function
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidG91emEyZWwiLCJhIjoiY2tmbGpqZ3dtMGttejJ6cGk0aWZ2bWl3OCJ9.JACHfSI8ciQV6pfJ_LToXQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable To Connect To Geocoding Service.', undefined);
    } else if (body.features.length === 0) {
      callback(
        'Unable To Find Location, Try Again With Different Search Term.',
        undefined
      );
    } else {
      const [longitude, latitude] = body.features[0].center;
      const location = body.features[0].place_name;

      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode; // Export The Geocode Function
