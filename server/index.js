const express = require('express');
const axios = require('axios');
const AUTH_TOKEN = require('../config/config');

axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;

const app = express();
const port = 3005;
const path = require('path');

const staticUrl = path.join(__dirname, '../public');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticUrl));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/products', (req, res) => {
  axios.get('/products')
    .then((response) => {
      console.log('response.data here', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('error in getting products', err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
