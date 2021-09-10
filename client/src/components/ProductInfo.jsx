/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import AUTH_TOKEN from '../config/config.js';
import Price from './Price.jsx';
// import sampleproducts from '../data/sampleproducts.js';
// import samplestyles from '../data/samplestyles.js';

axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
axios.defaults.headers.common.Authorization = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      productIndex: 0,
      // selectedProduct: sampleproducts[0],
      selectedProduct: {},
      allStyles: [],
      styleIndex: 0,
      // selectedStyle: samplestyles.results[0], // an object with a style of the specific product
      selectedStyle: {},
    }; // an object with a style of the specific product
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getAllStyles = this.getAllStyles.bind(this);
    // this.updateProduct = this.updateProduct.bind(this);
  }

  // renders the info of the specific product on load
  componentDidMount() {
    console.log(AUTH_TOKEN);
    const { allProducts, productIndex } = this.state;
    this.getAllProducts();
    // this.getAllStyles(48432);
    // console.log(allProducts[productIndex]);
    // this.updateProduct(allProducts[productIndex].id);
  }

  // componentDidUpdate(prevState) {
  //   const { allStyles, styleIndex } = this.state;
  //   if (prevState.allStyles !== allStyles) {
  //     this.state.selectedStyle = allStyles[styleIndex];
  //   }
  // }

  getAllProducts() {
    const { allProducts, productIndex } = this.state;
    axios.get('/products')
      .then((response) => {
        console.log('get all Products');
        this.setState({
          allProducts: response.data,
          selectedProduct: response.data[productIndex],
        });
      })
      .then(() => {
        console.log(allProducts.length);
        this.getAllStyles(allProducts[0].id);
      })
      .catch((error) => console.log(error));
  }

  getAllStyles(productId) {
    const { allStyles, styleIndex } = this.state;
    // refactor to pull from api
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        console.log('get all styles', response.data);
        this.setState({ allStyles: response.data.results });
      })
      // .then(this.setState({ selectedStyle: allStyles[styleIndex] }))
      .catch((error) => console.log(error));
  }

  // updateProduct(productId) {
  //   console.log('productId', productId);
  //   axios.get(`/products/${productId}`)
  //     .then((response) => {
  //       console.log('get product info', response.data);
  //       this.setState({
  //         selectedProduct: response.data,
  //       });
  //     })
  //     .then(this.getAllStyles(productId))
  //     .catch((error) => console.log(error));
  // }

  render() {
    const {
      selectedProduct, selectedStyle, allProducts, productIndex,
    } = this.state;
    // if (!selectedProduct) {
    //   this.getAllProducts(allProducts[productIndex]);
    //   return (
    //     <>
    //       <span>Loading 1</span>
    //     </>
    //   );
    // }
    // if (!selectedStyle) {
    //   this.getAllStyles(selectedProduct.id);
    //   return (
    //     <>
    //       <span>Loading 2</span>
    //     </>
    //   );
    // }
    return (
      <>
        <span>Star Ratings</span>
        <h5>{selectedProduct.category}</h5>
        <h4>{selectedProduct.name}</h4>
        <Price style={selectedStyle} />
        <br />
        <span>{selectedProduct.description}</span>
        <br />
        <span>Social Media Placeholder</span>
      </>
    );
  }
}

export default ProductInfo;
