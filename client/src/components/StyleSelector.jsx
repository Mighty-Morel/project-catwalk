/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../reducers/Style-Reducer';

const StyleSelector = ({ allStyles }) => {

  const dispatch = useDispatch();

  const handleClick = (e) => {
    console.log('target', e.target);
    console.log('value', e.target.value);
    // updateStyle(e.target.value);
    dispatch(updateItem(e.target.value));
  };

  const styleId = useSelector((state) => state.style.id);

  console.log(styleId);

  return (
    allStyles.map((style) => (
      <div key={style.style_id} onClick={handleClick}>
        <img className="thumbnail" src={style.photos[0].thumbnail_url} alt={style.name} />
      </div>
    ))
  );
};

export default StyleSelector;
