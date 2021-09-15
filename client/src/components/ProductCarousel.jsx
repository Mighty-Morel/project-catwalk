/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: [],
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    // axios.get('/products/${current product id}/related')
    axios.get('/products/48432/related')
      .then((res) => {
        // console.log('list of related ids', res.data);
        const relatedIds = res.data;
        const ids = [];
        for (let i = 0; i < relatedIds.length; i++) {
          const relatedId = relatedIds[i];
          ids[i] = { relatedId };
        }
        this.setState({
          productInfo: ids,
        });
        const { productInfo } = this.state;
        for (const id in productInfo) { // [{relatedId: 48433}, {…}, {…}, {…}]
          const { relatedId } = productInfo[id]; // [48433, 48434, 48439, 48438]
          axios.get(`/products/${relatedId}`)
            .then((res) => { // add each category to each id
              // if relatedid is same as response product related id
              for (let j = 0; j < productInfo.length; j++) {
                if (productInfo[j].relatedId === res.data.id) {
                  productInfo[j] = { category: res.data.category, ...productInfo[j] };
                  productInfo[j] = { features: res.data.features, ...productInfo[j] };
                }
              }
            });
          axios.get(`/products/${relatedId}/styles`)
            .then((res) => {
              // console.log(res.data);
              for (let k = 0; k < productInfo.length; k++) {
                if (productInfo[k].relatedId === Number(res.data.product_id)) {
                  productInfo[k] = { name: res.data.results[0].name, ...productInfo[k] };
                  productInfo[k] = { price: res.data.results[0].original_price, ...productInfo[k] };
                  productInfo[k] = { sale: res.data.results[0].sale_price, ...productInfo[k] };
                  productInfo[k] = {
                    pic: res.data.results[0].photos[0].thumbnail_url, ...productInfo[k],
                  };
                }
              }
            });
        }
        // console.log(productInfo);
      });
  }

  render() {
    const { productInfo } = this.state;
    if (productInfo.length === 0) {
      return 'loading...';
    }
    return (
      <>
        {productInfo.map((product) => (
        <Card className="card">
          <div>
            <Card.Img className="cardImage" variant="top"
              src="https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80" />

            <Card.Body className="cardBody">
              <Card.Text className="cardCategory">
                {product.relatedId}
              </Card.Text>
              <Card.Title className="cardTitle">
                {product.name}
              </Card.Title>
              <Card.Text className="cardPrice">
                ${product.price}
              </Card.Text>
              {/* <Card.Text className="cardRating"> STARS </Card.Text> */}
            </Card.Body>
          </div>
          {/* star button to show product comparison on click */}
          <Button className="compareProduct" variant="primary"> * </Button>
        </Card>
        ))}
      </>
    );
  }
}

export default ProductCarousel;

// getProductInfo() {
//   // get current product id in product overview
//   // const { productId } = this.props;
//   axios.get('/products/48432')
//     .then((res) => {
//       this.setState({
//         productInfo: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log('failed to get product info', err);
//     });
// }

// getRelatedProducts() {
//   // get all related product ids to current product id
//   axios.get('/products/48432/related')
//     .then((res) => {
//       this.setState({
//         productRelated: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log('failed to get related products', err);
//     });
// }

// getProductStyle() {
//   // iterate through related product ids to get styles
//   // const { productId } = this.props;
//   axios.get('/products/48432/styles')
//     .then((res) => {
//       this.setState({
//         productStyles: res.data.idss,
//       });
//     })
//     .catch((err) => {
//       console.log('failed to get product style', err);
//     });
// }

// for (let i = 0; i < relatedIds.length; i++) {
//   const relatedId = relatedIds[i];
//   console.log(relatedId);
//   axios.get(`/products/${relatedId}`)
//     .then((res) => {
//       console.log('product info', res.data.category);
//       const { category } = this.state;
//       this.setState({
//         categories: [...categories, res.data.category],
//         // add features later
//       });
//     });
//   axios.get(`/products/${relatedId}/styles`)
//     .then((res) => {
//       console.log('styles info', res.data.idss[0]);
//       const { name, price, sale, pic } = this.state;
//       this.setState({
//         name: [...name, res.data.idss[0].name],
//         price: [...price, res.data.idss[0].original_price],
//         sale: [...sale, res.data.idss[0].sale_price],
//         pic: [...pic, res.data.idss[0].photos[0].thumbnail_url],
//       });
//     });
// }

// {productStyles.map((product) => {
//   console.log(product.name)
// })}

// {productStyles.map((product) => (
//   <div>{product.name}</div>
// ))}

