/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateView } from '../../reducers/Example-Reducer';

import GalleryThumbnail from './GalleryThumbnail.jsx';
import './overview.css';

const Gallery = () => {
  const dispatch = useDispatch();
  const selectedStyle = useSelector((state) => state.style.style);
  const stylePhotos = useSelector((state) => state.style.photos);
  const expandedView = useSelector((state) => state.product.expandedView);

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
          <img className="overview-thumbnail-arrow" alt="up arrow" src="./images/up-arrow.png" />
        </span>
      );
    }
    return null;
  };

  const renderDownArrow = () => {
    if (stylePhotos.length > 7 && mainPhotoIndex < stylePhotos.length - 1) {
      return (
        <span role="button" tabIndex="-1" onClick={moveDown} onKeyDown={handleKeyDown}>
          <img className="overview-thumbnail-arrow" alt="down arrow" src="./images/down-arrow.png" />
        </span>
      );
    }
    return null;
  };

  const renderLeftArrow = () => {
    if (mainPhotoIndex > 0) {
      return (
        <span role="button" tabIndex="-1" onClick={moveUp} onKeyDown={handleKeyDown}>
          <img className="overview-main-arrow left" alt="left arrow" src="./images/double-left-arrow.png" />
        </span>
      );
    }
    return null;
  };

  const renderRightArrow = () => {
    if (mainPhotoIndex < stylePhotos.length - 1) {
      return (
        <span role="button" tabIndex="-1" onClick={moveDown} onKeyDown={handleKeyDown}>
          <img className="overview-main-arrow right" alt="right arrow" src="./images/double-right-arrow.png" />
        </span>
      );
    }
    return null;
  };

  const toggleView = () => {
    dispatch(updateView(!expandedView));
  };

  if (!mainImage) {
    return <div>Loading Images...</div>;
  }
  return (
    <>
      <div className="overview-gallery-container">
        <div className="overview-main-image-container" onClick={toggleView}>
          <img
            className={expandedView? "overview-main-image-expanded" : "overview-main-image"}
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
          {renderLeftArrow()}
          {renderRightArrow()}
        </div>
      </div>
    </>
  );
};

export default Gallery;
