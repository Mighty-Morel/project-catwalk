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

// Identifies properties of the request being sent
// app.use((req, res, next) => {
//   console.log('-----------------------------');
//   console.log(req.body);
//   console.log(req.url);
//   console.log(req.params);
//   console.log(req.method);
//   console.log('-----------------------------');
//   next();
// });

// gets all product information
app.get('/products', (req, res) => {
  axios.get('/products')
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// gets information for a single product
app.get('/products/:productId', (req, res) => {
  const { productId } = req.params;
  axios.get(`/products/${productId}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// gets all styles for a single product
app.get('/products/:productId/styles', (req, res) => {
  const { productId } = req.params;
  axios.get(`/products/${productId}/styles`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send('error in getting styles', err);
    });
});

// gets all related ids for a single product
app.get('/products/:productId/related', (req, res) => {
  const { productId } = req.params;
  axios.get(`/products/${productId}/related`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send('error in getting related items', err);
    });
});

// gets questions for a product
app.get('/qa/questions/:product_id', (req, res) => {
  axios.get('/qa/questions', { params: req.params })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send('error in getting questions', err);
    });
});

// gets answers for a question
app.get('/qa/questions/:question_id/answers', (req, res) => {
  axios.get(req.url)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send('error in getting answers', err);
    });
});

app.get('/api/reviews', (req, res) => {
  axios.get('/reviews', {
    params: req.query,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/api/reviews/meta', (req, res) => {
  axios.get('/reviews/meta', {
    params: req.query,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/api/reviews', (req, res) => {
  axios.post('/reviews', req.body)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put('/api/reviews/:review_id/helpful', (req, res) => {
  axios.put(`/reviews/${req.params.review_id}/helpful`)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put('/api/reviews/:review_id/report', (req, res) => {
  axios.put(`/reviews/${req.params.review_id}/report`)
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
