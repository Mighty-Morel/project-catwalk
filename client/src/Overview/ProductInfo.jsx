import React from 'react';
import sampledata from './sampledata.js'

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: sampledata[0],
      style: sampledata[0].results[0], // style of the specific product
    }
    this.updateProduct = this.updateProduct.bind(this);
  }

  updateProduct() {
    //refactor to pull from api

    this.setState({
      product:
    })
  }

  updateStyle() {
    //refactor to pull from api
    this.setState({
      style:
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