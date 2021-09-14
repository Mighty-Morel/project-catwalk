/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      selectedProduct: {},
      allStyles: [],
      styleIndex: 0,
      selectedStyle: {},
    };
    this.getAllProducts = this.getAllProducts.bind(this);
    this.getAllStyles = this.getAllStyles.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  // renders the info of the specific product on load
  componentDidMount() {
    const { productId } = this.props;
    this.updateProduct(productId);
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
    const { styleIndex } = this.state;
    // refactor to pull from api
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        console.log(response.data.results);
        this.setState({
          allStyles: response.data.results,
          selectedStyle: response.data.results[styleIndex],
        });
      })
      .catch((error) => console.log(error));
  }

  updateProduct(productId) {
    axios.get(`/products/${productId}`)
      .then((response) => {
        this.setState({
          selectedProduct: response.data,
        });
      })
      .then(this.getAllStyles(productId))
      .catch((error) => console.log(error));
  }

  updateStyle(styleId) {
    const { allStyles } = this.state;
    const newStyle = allStyles.find((style) => style.id === styleId);
    this.setState({
      selectedStyle: newStyle,
    });
  }

  render() {
    const { selectedProduct, selectedStyle, allStyles } = this.state;
    if (!selectedProduct) {
      return <span data-testid="loading">Loading...</span>;
    }
    return (
      <>
        <div data-testid="resolved" className="overview">
          <span data-testid="ratings" className="ratings">Star Ratings Placeholder</span>
          <br />
          <span data-testid="show-category" className="category">{selectedProduct.category}</span>
          <br />
          <span data-testid="show-name" className="product-name">{selectedProduct.name}</span>
          <br />
          <span data-testid="show-price" className="price"><Price selectedStyle={selectedStyle} /></span>
          <br />
          <span data-testid="show-description" className="description">{selectedProduct.description}</span>
          <br />
          <span data-testid="social-media" className="social-media">Social Media Placeholder</span>
        </div>
        <br />
        <div data-testid="style-selector" className="style-selector">
          <StyleSelector allStyles={allStyles} updateStyle={this.updateStyle} />
        </div>
      </>
    );
  }
}

export default ProductInfo;
