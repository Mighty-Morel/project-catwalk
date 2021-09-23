/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import GalleryThumbnail from './GalleryThumbnail.jsx';
import './overview.css';

const Gallery = () => {
  const selectedStyle = useSelector((state) => state.style.style);
  const stylePhotos = useSelector((state) => state.style.photos);
  const [mainPhotoIndex, setPhotoIndex] = useState(0);

  const mainImage = stylePhotos[mainPhotoIndex];

  // sets the main image based on index o thumbnail selected
  const selectPhoto = (index) => {
    setPhotoIndex(index);
  };

  const moveUp = () => {
    if (mainPhotoIndex > 0) {
      setPhotoIndex(mainPhotoIndex - 1);
    }
  };

  const moveDown = () => {
    if (mainPhotoIndex < stylePhotos.length - 1) {
      setPhotoIndex(mainPhotoIndex + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 37 || e.keyCode === 38) { // left or up
      moveUp();
    } else if (e.keyCode === 39 || e.keyCode === 40) { // right or down
      moveDown();
    }
  };

  const renderUpArrow = () => {
    if (stylePhotos.length > 7 && mainPhotoIndex > 0) {
      return (
        <span role="button" tabIndex="-1" onClick={moveUp} onKeyDown={handleKeyDown}>
          <img className="overview-thumbnail-arrow" alt="up arrow" src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-up-arrows-those-icons-fill-those-icons.png" />
        </span>
      );
    }
    return null;
  };

  const renderDownArrow = () => {
    if (stylePhotos.length > 7 && mainPhotoIndex < stylePhotos.length - 1) {
      return (
        <span role="button" tabIndex="-1" onClick={moveDown} onKeyDown={handleKeyDown}>
          <img className="overview-thumbnail-arrow" alt="down arrow" src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-down-arrows-those-icons-fill-those-icons-1.png" />
        </span>
      );
    }
    return null;
  };

  if (!mainImage) {
    return <div>Loading Images...</div>;
  }
  return (
    <>
      <div className="overview-gallery-container">
        <div className="overview-main-image-container">
          <img
            className="overview-main-image"
            src={mainImage.url}
            alt={selectedStyle.name}
            title={selectedStyle.name}
          />
        </div>
        <div className="overview-thumbnail-container">
          {renderUpArrow()}
          <div className="overview-thumbnail-image-container">
            {stylePhotos.map((photo, index) => (
              <GalleryThumbnail
                key={photo.url}
                style={selectedStyle}
                photo={photo}
                index={index}
                selectPhoto={selectPhoto}
                mainPhotoIndex={mainPhotoIndex}
              />
            ))}
          </div>
          {renderDownArrow()}
        </div>
        <div className="overview-main-arrow-container">
          <span role="button" tabIndex="-1" onClick={moveUp} onKeyDown={handleKeyDown}>
            <img className="overview-main-arrow left" alt="left arrow" src="https://img.icons8.com/ios-glyphs/30/ffffff/double-left--v1.png" />
          </span>
          <span role="button" tabIndex="-1" onClick={moveDown} onKeyDown={handleKeyDown}>
            <img className="overview-main-arrow right" alt="right arrow" src="https://img.icons8.com/ios-glyphs/30/ffffff/double-right--v1.png" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Gallery;
