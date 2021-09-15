/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductInfo } from '../reducers/Example-Reducer';
import { updateStyles } from '../reducers/Style-Reducer';

import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { updateStyleId } from '../reducers/Style-Reducer';

const Gallery = ({ style }) => {
  const dispatch = useDispatch();
  const styleId = style.style_id;

  const handleClick = () => {
    console.log(styleId);
    dispatch(updateStyleId(styleId));
  };

  const selectedStyleId = useSelector((state) => state.style.id);

  return (
    <span data-testid="click-style" role="button" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      <img
        className={style.style_id === selectedStyleId ? 'style-selected' : 'style-unselected'}
        src={style.photos[0].thumbnail_url}
        alt={style.name}
        title={style.name}
      />
      <p className="style-name">{style.name}</p>
    </span>
  );
};

export default Gallery;

