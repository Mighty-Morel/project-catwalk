/* eslint-disable react/prop-types */
import React from 'react';

const StyleSelector = ({ allStyles, updateStyle }) => {
  const handleClick = (e) => {
    console.log('target', e.target);
    console.log('value', e.target.value);
    updateStyle(e.target.value);
  };

  return (
    allStyles.map((style) => (
      <span key={style.style_id} value={style.name} role="option" onClick={() => {}} onKeyPress={handleClick}>
        {style.id}
        <img className="thumbnail" src={style.photos[0].thumbnail_url} alt={style.name} />
      </span>
    ))
  );
};

export default StyleSelector;
