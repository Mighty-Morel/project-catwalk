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
      prev: false,
      next: true,
      counter: 0,
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    // original #48432, holder 48438, 48439, 48434
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
    this.myRef.current.scrollLeft -= 230;
    console.log(this.myRef.current.scrollLeft)
    if (this.myRef.current.scrollLeft < 230) {
      console.log('BEGINNING OF SCROLL')
    }
  }

  next() {
    const { productInfo, counter } = this.state;
    // console.log(productInfo.length);
    // console.log(this.myRef.current.scrollWidth)
    this.myRef.current.scrollLeft += 230;
    console.log(this.myRef.current.scrollLeft);
    // 230 * 6 === 1380 end of scroll
    // (productInfo.length - 3) * 230 === end of scroll!
    if ((productInfo.length - 3) * 230 === this.myRef.current.scrollLeft) {
      console.log('END OF SCROLL')
    }
    // 9 cards 6 clicks
    // 6 cards 3 clicks
    // 5 cards 2 clicks
    // productInfo.length - 3 clicks = end of flexbox
    // if counter === productInfo.length - 3 (end of flexbox)
    // change

    // this.setState((prevState) => ({
    //   counter: prevState.counter + 1,
    // }), () => {
    //   console.log(this.state.counter)
    //   if (counter === productInfo.length - 4) {
    //     console.log('end of flexbox!')
    //   }
    // });
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
                  <div className="image__container">
                    <img className="cardImage" src={product.pic} alt="" />
                    <img className="cardStar" src="./images/star.png" alt="" />
                  </div>

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

{/* <ul className="carousel__track" ref={this.myRef}> */ }


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
