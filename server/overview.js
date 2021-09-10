const app = require('./index.js');

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
