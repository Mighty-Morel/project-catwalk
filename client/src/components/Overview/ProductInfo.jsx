/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductInfo } from '../../reducers/Example-Reducer';
import { updateStyles, updateStyle } from '../../reducers/Style-Reducer';
import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';
import 'regenerator-runtime/runtime';


const ProductInfo = () => {
  const productId = useSelector((state) => state.product.id);
  const product = useSelector((state) => state.product.productInfo);
  const allStyles = useSelector((state) => state.style.allStyles);

  const dispatch = useDispatch();

  const getAllStyles = async () => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        // console.log(response.data.results);
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
      <div data-testid="resolved" className="product-info-container">
        <span data-testid="ratings" className="ratings">Star Ratings Placeholder</span>
        <br />
        <span data-testid="show-category" className="category">{product.category}</span>
        <br />
        <span data-testid="show-name" className="product-name">{product.name}</span>
        <br />
        <span data-testid="show-price" className="price"><Price /></span>
        <br />
        <span data-testid="show-description" className="description">{product.description}</span>
        <br />
        <span data-testid="social-media" className="social-media">Social Media Placeholder</span>
        <br />
        <div data-testid="style-selector" className="style-selector">
          <StyleSelector allStyles={allStyles} />
        </div>
        <br />
        <AddToCart allStyles={allStyles} />
      </div>
    </>
  );
};

export default ProductInfo;
