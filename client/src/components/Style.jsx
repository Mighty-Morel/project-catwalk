/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStyle } from '../reducers/Style-Reducer';

const Style = ({ style }) => {
  const dispatch = useDispatch();
  const styleId = style.style_id;

  const handleClick = () => {
    console.log(styleId);
    // dispatch(updateStyleId(styleId));
    dispatch(updateStyle(style));
  };

  const selectedStyleId = useSelector((state) => state.style.id);

  let imageStyle;
  if (style.style_id === selectedStyleId) {
    imageStyle = (
      <>
        <img className="checkmark-icon" src="https://img.icons8.com/material-rounded/30/000000/ok--v1.png" alt="selected" />
        <img
          className="style-selected"
          src={style.photos[0].thumbnail_url}
          alt={style.name}
          title={style.name}
        />
      </>
    );
  } else {
    imageStyle = (
      <img
        className="style-unselected"
        src={style.photos[0].thumbnail_url}
        alt={style.name}
        title={style.name}
      />
    );
  }

  return (
    <div role="button" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      <p className="style-name">{style.name}</p>
      <div className="thumbnail">
        {imageStyle}
      </div>
    </div>
  );
};

export default Style;
