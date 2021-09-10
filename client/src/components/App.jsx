/* eslint-disable import/extensions */
import React from 'react';
import ProductInfo from './ProductInfo.jsx';
import ReviewList from './ReviewList.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
import RelatedItems from './RelatedItems.jsx';

// assume that App has the state with the default product Id
// clicking on another product from the Related Products component will change that id
// all other components will reference this product ID reflected in app
// so pass down this product ID as prop
// Using product id: 48432 temporarily

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 48432,
    };
  }

  render() {
    const { productId } = this.state;
    return (
      <>
        <div> Hello World!</div>
        <div><ProductInfo productId={productId} /></div>
        <div><QuestionsAndAnswers productId={productId} /></div>
        <div><ReviewList productId={productId} /></div>
        <div><RelatedItems productId={productId} /></div>
      </>
    );
  }
}

export default App;
