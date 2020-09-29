// NPM Packages
const express = require('express');
const hbs = require('hbs');

// Node Core Modules
const path = require('path');

// Custom Modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Variables
const app = express();
const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');
// __dirname =Path To The Folder in Which The app.js File Lives in = The src Directory

app.set('view engine', 'hbs'); // Set The Type of View Engine That We are going to use
app.set('views', viewsDirectoryPath); // Set Views Directory Path
hbs.registerPartials(partialsDirectoryPath); // Set Partials Directory Path

app.use(express.static(publicDirectoryPath)); // Set Up Static Directory To Serve

// Set Routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Touza2el',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'ABOUT',
    name: 'Touza2el',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HELP',
    name: 'Touza2el',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: 'Address Must Be Provided' });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error: error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }
      res.send({
        address: address,
        location: location,
        forecast: forecastData,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Touza2el',
    error: 'Help Article Not Found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Touza2el',
    error: 'Page Not Found.',
  });
});

// Listen On a Port
app.listen(port, () => {
  console.log(`The Server is Runnig On Port : ${port}`);
});
