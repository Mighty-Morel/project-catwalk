/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';

const GalleryThumbnail = ({ photo, style, changePhoto }) => {
  const handleClick = () => {
    changePhoto(photo);
  };

  return (
    <span role="menuitem" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      <img
        className="image-thumbnail"
        src={photo.thumbnail_url}
        alt={style.name}
      />
    </span>

  );
};

export default GalleryThumbnail;
