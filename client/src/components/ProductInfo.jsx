/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { useGetProductInfoQuery, useGetStylesQuery } from '../reducers/Example-Api-Slice';
import { updateProductInfo } from '../reducers/Example-Reducer';
import { updateStyles } from '../reducers/Style-Reducer';

import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';

const ProductInfo = () => {
  // const [allStyles, getStyles] = useState([]);
  const productId = useSelector((state) => state.product.id);
  const product = useSelector((state) => state.product.productInfo);
  const allStyles = useSelector((state) => state.style.allStyles);

  const dispatch = useDispatch();

  const getAllStyles = () => {
    axios.get(`/products/${productId}/styles`)
      .then((response) => {
        // console.log(response.data.results);
        dispatch(updateStyles(response.data.results));
        // getStyles(response.data.results);
        // this.setState({
        //   allStyles: response.data.results,
        //   selectedStyle: response.data.results[styleIndex],
        // });
      })
      .catch((error) => console.log(error));
  };

  const updateProduct = () => {
    axios.get(`/products/${productId}`)
      .then((response) => {
        dispatch(updateProductInfo(response.data));
        // this.setState({
        //   selectedProduct: response.data,
        // });
      })
      .then(getAllStyles(productId))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // This will be invoked only once.
    updateProduct();
  }, []);

  if (allStyles.length === 0) {
    return <span data-testid="loading">Loading...</span>;
  }
  return (
    <>
      <div data-testid="resolved" className="overview">
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
      </div>
    </>
  );
};

export default ProductInfo;
