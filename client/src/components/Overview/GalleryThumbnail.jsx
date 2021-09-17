/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';

const GalleryThumbnail = ({ photo, style, selectPhoto }) => {
  const selectedPhotoUrl = useSelector((state) => state.style.mainPhoto.url);

  const handleClick = () => {
    selectPhoto(photo);
  };

  const renderThumbnail = () => {
    if (selectedPhotoUrl === photo.url) {
      return (
        <>
          <img className="image-thumbnail" id="selected-thumbnail" src={photo.thumbnail_url} alt={style.name} />
          <hr />
        </>
      );
    }
    return <img className="image-thumbnail" src={photo.thumbnail_url} alt={style.name} />;
  };

  return (
    <span role="menuitem" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      {renderThumbnail()}
    </span>
  );
};

export default GalleryThumbnail;
