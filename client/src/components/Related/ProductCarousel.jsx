/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import card from './card.css';
import carousel from './carousel.css';

class ProductCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productInfo: [],
      index: 0,
      prev: false,
      next: true,
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    // original #48432
    axios.get('/products/48438/related')
      .then((res) => {
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

  prev() {
    console.log('check previous button');
    this.myRef.current.scrollLeft -= 230;
    // set the state of prev to be false
    // change state of prev to true when next is clicked
    // when state of prev is false button is hidden
    // when state of prev is true button is displayed
  }

  // click right button, move slides to the left by one card
  next() {
    console.log(this.myRef);
    this.myRef.current.scrollLeft += 230;
    if (this.myRef.current.scrollLeft === 0) {
      console.log('current state is 0')
    }
    this.setState({
      prev: true,
    });
    // if scroll state is 0 hide the prev button
    // on next click unhide prev button
    // get length of how many cards to find around how much scroll should be
    // if scroll number hits the scroll end length
    // hide the next button
  }

  render() {
    const { productInfo } = this.state;
    if (productInfo.length === 0) {
      return 'loading...';
    }
    return (
      <div className="carousel">
        <div>RELATED PRODUCTS</div>

        <button className="carousel__button carousel__button--left" type="button" onClick={() => this.prev()}>
          <img src="./images/arrow-left.png" alt="" />
        </button>

        <div className="carousel__track-container">
          <ul className="carousel__track" ref={this.myRef}>
            {productInfo.map((product, i) => (
              <li className="carousel__slide" key={i}>
                <div className="card">
                  <img className="cardImage" src={product.pic} alt="" />
                  <dl className="cardCategory">{product.category}</dl>
                  <dl className="cardTitle">{product.name}</dl>
                  <dl className="cardPrice">${product.price} ${product.sale}</dl>
                  <dl className="cardRating">* star placeholder *</dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="carousel__button carousel__button--right" type="button" onClick={() => this.next()}>
          <img src="./images/arrow-right.png" alt="" />
        </button>

      </div>
    );
  }
}

export default ProductCarousel;

{/* <ul className="carousel__track" ref={this.myRef}> */}


// return (
//   <>
//     {productInfo.map((product, i) => (
//       // eslint-disable-next-line react/no-array-index-key
//       <div className="column" key={i}>
//         <div className="card">
//           <img className="cardImage" src={product.pic} alt="related product" />
//           <ul className="cardCategory">{product.category}</ul>
//           <ul className="cardTitle">{product.name}</ul>
//           <ul className="cardPrice">${product.price}</ul>
//           <ul className="cardRating">* star placeholder *</ul>
//         </div>
//       </div>
//     ))}
//   </>
// );
