/* eslint-disable react/prop-types */
import React from 'react';

const GalleryThumbnail = ({
  photo, index, style, selectPhoto, mainPhotoIndex,
}) => {
  const handleClick = () => {
    selectPhoto(index);
  };

  const renderThumbnail = () => {
    if (index === mainPhotoIndex) {
      return (
        <>
          <img className="overview-image-thumbnail" id="overview-selected-thumbnail" src={photo.thumbnail_url} alt={`${style.name}_${index}`} />
          <hr />
        </>
      );
    }
    return <img className="overview-image-thumbnail" src={photo.thumbnail_url} alt={`${style.name}_${index}`} />;
  };

  return (
    <span role="menuitem" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
      {renderThumbnail()}
    </span>
  );
};

export default GalleryThumbnail;
