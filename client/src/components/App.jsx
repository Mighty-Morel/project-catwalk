/* eslint-disable import/extensions */
import React from 'react';
import { useSelector } from 'react-redux';
// import ProductInfo from './ProductInfo.jsx';
// import ReviewList from './ReviewList.jsx';
// import QuestionsAndAnswers from './QuestionsAndAnswers.jsx';
// import RelatedItems from './RelatedItems.jsx';

// assume that App has the state with the default product Id
// clicking on another product from the Related Products component will change that id
// all other components will reference this product ID reflected in app
// so pass down this product ID as prop
// Using product id: 48432 temporarily

const App = () => {
  const currentId = useSelector((state) => state.product.id);
  return (
    <>
      <div>
        Hello World! CurrentId is
        {currentId}
      </div>
      {/* <div><ProductInfo productId={productId} /></div> */}
      {/* <div><QuestionsAndAnswers productId={productId} /></div>
    <div><ReviewList productId={productId} /></div>
    <div><RelatedItems productId={productId} /></div> */}
    </>
  );
};

export default App;

// anytime you need to call a piece of state from the store, you can simply use useSelecter with a
// function that takes in state and calls the specfic component and state you'd like to access.
// see line 16
