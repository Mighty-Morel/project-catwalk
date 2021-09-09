import React from 'react';
import sampleproducts from './sampleproducts.js';
import samplestyles from './samplestyles.js';

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: sampleproducts[0],
      style: samplestyles.results[0], // an object with a style of the specific product
    }
    this.updateProduct = this.updateProduct.bind(this);
    this.updateStyle = this.updateStyle.bind(this);

  }

  updateProduct(productid) {
    //refactor to pull from api - run this when style changes
    //product will be chosen based on the style
    this.setState({
      product:
    })
  }

  updateStyle() {
    //refactor to pull from api
    axios.get()
    this.setState({
      style:
      product: updateProduct(productid)
    })

  }



  render() {
    const {product, discount, style} = this.state;
    <>
    <StarRating />
    <h5>{product.category}</h5>
    <h3>{product.name}</h4>
    <Price style={style} />
    <span>{product.description}</span>
    <span>Social Media Placeholder</span>
    </>
  }
}

export default ProductInfo;