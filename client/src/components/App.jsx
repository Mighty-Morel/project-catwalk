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

const App = () => {
  const currentId = useSelector((state) => state.product.id);
  const selectedStyleId = useSelector((state) => state.style.id);

  const dispatch = useDispatch();
  const expandedView = useSelector((state) => state.product.expandedView);

  return (
    <>
      <div className={expandedView ? 'overview-container-expand' : 'overview-container'}>
        <div><Gallery /></div>
        <div><ProductInfo productId={currentId} /></div>
      </div>
      <div><RelatedItems productId={currentId} /></div>
      <div><QuestionsAndAnswers productId={currentId} /></div>
      <div id="reviews"><ReviewsAndRatings /></div>
    </>
  );
};

export default App;
