/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStyleId } from '../reducers/Style-Reducer';

const Style = ({ style }) => {
  // const [selected, toggleSelect] = useState(false);

  const dispatch = useDispatch();
  const styleId = style.style_id;

  const handleClick = () => {
    console.log(styleId);
    dispatch(updateStyleId(styleId));
    // toggleSelect(!selected);
  };

  const selectedStyleId = useSelector((state) => state.style.id);

  return (
    <span role="button" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      <img
        className={style.style_id === selectedStyleId ? 'style-selected' : 'style-unselected'}
        src={style.photos[0].thumbnail_url}
        alt={style.name}
      />
    </span>
  );
};

export default Style;
