/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../reducers/Style-Reducer';

const Style = ({ style }) => {
  const dispatch = useDispatch();
  const styleId = style.style_id;

  const handleClick = () => {
    console.log(styleId);
    dispatch(updateItem(styleId));
  };

  const selectedStyleId = useSelector((state) => state.style.id);

  return (
    <span role="button" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      <img
        className={styleId === selectedStyleId
          ? 'style-selected'
          : 'style-unselected'}
        src={style.photos[0].thumbnail_url}
        alt={style.name}
      />
    </span>
  );
};

export default Style;
