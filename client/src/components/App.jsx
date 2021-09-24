/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductId } from '../reducers/Example-Reducer';
import QuestionsAndAnswers from './Q&A/QuestionsAndAnswers.jsx';
import ReviewsAndRatings from './Reviewlist/Review-list.jsx';
import ProductInfo from './Overview/ProductInfo.jsx';
import Gallery from './Overview/Gallery.jsx';
import RelatedItems from './Related/RelatedItems.jsx';

// assume that App has the state with the default product Id
// clicking on another product from the Related Products component will change that id
// all other components will reference this product ID reflected in app
// so pass down this product ID as prop
// Using product id: 48432 temporarily

const App = () => {
  const currentId = useSelector((state) => state.product.id);
  // const currentProduct = useSelector((state) => state.product);
  const selectedStyleId = useSelector((state) => state.style.id);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateProductId(48436)); // this is an example to show how update works
    // delete when understood
  };
  const expandedView = useSelector((state) => state.product.expandedView);

  return (
    <>
      <div data-testid="loadapp" onClick={handleClick}>
        Hello World! CurrentId is&nbsp;
        {currentId}
        &nbsp;and current Style is&nbsp;
        {selectedStyleId}
      </div>
      {/* <ProductList /> */}
      {/* <Router>
          <Route exact path="products/:productId" component={ProductInfo} />
          <Redirect to="/" />
        </Router> */}
      <div className={expandedView ? 'overview-container-expand' : 'overview-container'}>
        <div><Gallery /></div>
        <div><ProductInfo productId={currentId} /></div>
      </div>
      {/* <div><RelatedItems productId={currentId} /></div> */}
      <div className="questions-container"><QuestionsAndAnswers productId={currentId} /></div>
      <div id="reviews"><ReviewsAndRatings /></div>
    </>
  );
};

export default App;

// anytime you need to call a piece of state from the store, you can simply use useSelecter with a
// function that takes in state and calls the specfic component and state you'd like to access.
// see line 16

// to update state you can useDispatch where anything passed into the function will be the
// action.payload of the reducer
