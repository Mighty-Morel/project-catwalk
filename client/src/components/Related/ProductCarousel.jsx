/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import card from './card.css';

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
            .then((res) => {
              const relatedCategories = res.data;
              // console.log(relatedCategories)
              for (let j = 0; j < productInfo.length; j++) {
                if (productInfo[j].relatedId === res.data.id) {
                  productInfo[j] = { category: res.data.category, ...productInfo[j] };
                  productInfo[j] = { features: res.data.features, ...productInfo[j] };
                }
              }
              this.setState({
                productInfo,
              });
            });
          axios.get(`/products/${relatedId}/styles`)
            .then((res) => {
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
              this.setState({
                productInfo,
              });
            });
        }
      });
  }

  render() {
    const { productInfo } = this.state;
    if (productInfo.length === 0) {
      return 'loading...';
    }
    return (
      <>
        {productInfo.map((product, i) => (
          <div className="column" key={i}>
            <div className="card">
              <img className="cardImage" src={product.pic} alt="related product" />
              <ul className="cardCategory">{product.category}</ul>
              <ul className="cardTitle">{product.name}</ul>
              <ul className="cardPrice">${product.price}</ul>
              <ul className="cardRating">* star placeholder *</ul>
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default ProductCarousel;

{/* <div>
  {productInfo.map((product) => (
    <img src={product.pic} alt="related products" />
  ))}
</div> */}
