/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductInfo } from '../../reducers/Example-Reducer';
import { updateStyles, updateStyle } from '../../reducers/Style-Reducer';
import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCartFeatures from './AddToCart.jsx';
import StarRatings from './StarRatings.jsx';
import 'regenerator-runtime/runtime';
import './overview.css';

const ProductInfo = () => {
  const productId = useSelector((state) => state.product.id);
  const product = useSelector((state) => state.product.productInfo);
  const allStyles = useSelector((state) => state.style.allStyles);
  const style = useSelector((state) => state.style.style);

  const dispatch = useDispatch();

  const getAllStyles = async () => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        dispatch(updateStyles(response.data.results));
        dispatch(updateStyle(response.data.results[0]));
      })
      .catch((error) => console.log('Error getting all styles:', error));
  };

  const updateProduct = async () => {
    axios.get(`/products/${productId}`)
      .then((response) => {
        dispatch(updateProductInfo(response.data));
      })
      .then(getAllStyles(productId))
      .catch((error) => console.log('Error getting product info:', error));
  };

  useEffect(updateProduct, [productId]);

  if (allStyles.length === 0) {
    return <span data-testid="loading">Loading...</span>;
  }
  return (
    <>
      <div data-testid="resolved" className="overview-product-info-container">
        <span data-testid="ratings" className="overview-ratings">
          ★★★★☆
          <StarRatings productId={productId} />
          {/* <a href="#reviews" className="overview-ratings-link">Read all reviews</a> */}
        </span>
        <br />
        <span data-testid="show-category" className="overview-category">{product.category}</span>
        <br />
        <span data-testid="show-name" className="overview-product-name">{product.name}</span>
        <br />
        <span data-testid="show-price" className="overview-price"><Price /></span>
        <br />
        <span data-testid="show-description" className="overview-description">{product.description}</span>
        <br />
        {/* <span data-testid="social-media" className="social-media">Social Media Placeholder</span>
        <br /> */}
        <p className="overview-style-name">
          <b>
            STYLE
            {' > '}
            &nbsp;
          </b>
          {style.name}
        </p>
        <div data-testid="style-selector" className="overview-style-selector">
          <StyleSelector allStyles={allStyles} />
        </div>
        <br />
        <AddToCartFeatures style={style} />
      </div>
    </>
  );
};

export default ProductInfo;
