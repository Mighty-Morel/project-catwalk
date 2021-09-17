/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import overviewStyling from './overview.css';

const GalleryThumbnail = ({photo, style}) => {
  const handleClick = (e) => {
    // const selectedImage = e.target.value;
    // setImage(selectedImage);
    // const mainImage = e.target.value;
    console.log(photo);
  };

  return (
    <span role="menuitem" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick} >
      <img
        className="image-thumbnail"
        src={photo.thumbnail_url}
        alt={style.name}
      />
    </span>

  );
};

export default GalleryThumbnail;