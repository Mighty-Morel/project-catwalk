import React from 'react';
import sampleproducts from './sampleproducts.js';
import samplestyles from './samplestyles.js';
import Price from './Price.jsx';

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

    })
  }

  updateStyle(productid) {
    //refactor to pull from api
    axios.get()
    this.setState({
      product: updateProduct(productid)
    })

  }



  render() {
    const {product, discount, style} = this.state;
    return (
      <>
      <span>Social Media Placeholder</span>
      <h5>{product.category}</h5>
      <h4>{product.name}</h4>
      <Price style={style} />
      <br />
      <span>{product.description}</span>
      <br />
      <span>Social Media Placeholder</span>
      </>
    )
  }
}

export default ProductInfo;