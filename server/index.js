const express = require('express');
const axios = require('axios');
const path = require('path');
const AUTH_TOKEN = require('../config/config');

axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

const app = express();
const port = 3005;

const staticUrl = path.join(__dirname, '../public');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticUrl));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// gets all product information
app.get('/products', (req, res) => {
  axios.get('/products')
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send('error in getting products', err);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
