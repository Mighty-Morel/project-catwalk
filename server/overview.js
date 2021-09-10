/* eslint-disable import/extensions */
const axios = require('axios');
const app = require('./index.js');
const AUTH_TOKEN = require('../config/config.js');

axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;


app.get('/products');

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  res.send((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log('successful get request for product id', productId);
      res.status(200).send(data);
    }
  });
});

app.get('/products/:id/styles');
