/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductInfo } from '../../reducers/Example-Reducer';
import { updateStyles, updateStyle } from '../../reducers/Style-Reducer';


const StarRatings = () => {
  const productId = useSelector((state) => state.product.id);
  const product = useSelector((state) => state.product.productInfo);
  const allStyles = useSelector((state) => state.style.allStyles);
  const style = useSelector((state) => state.style.style);


  export default StarRatings;