/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
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
  const [zoomView, setZoomView] = useState(false);

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
        <span role="button" tabIndex="-1" onClick={() => moveUp()} onKeyDown={() => handleKeyDown()}>
          <img className="overview-thumbnail-arrow" alt="up arrow" src="./images/up-arrow.png" />
        </span>
      );
    }
    return null;
  };

  const renderDownArrow = () => {
    if (stylePhotos.length > 7 && mainPhotoIndex < stylePhotos.length - 1) {
      return (
        <span role="button" tabIndex="-1" onClick={() => moveDown()} onKeyDown={() => handleKeyDown()}>
          <img className="overview-thumbnail-arrow" alt="down arrow" src="./images/down-arrow.png" />
        </span>
      );
    }
    return null;
  };

  const renderLeftArrow = () => {
    if (mainPhotoIndex > 0) {
      return (
        <div className="overview-main-arrow-container left">
          <span role="button" tabIndex="-1" onClick={() => moveUp()} onKeyDown={() => handleKeyDown()}>
            <img className="overview-main-arrow left" alt="left arrow" src="./images/double-left-arrow.png" />
          </span>
        </div>
      );
    }
    return null;
  };

  const renderRightArrow = () => {
    if (mainPhotoIndex < stylePhotos.length - 1) {
      return (
        <div className="overview-main-arrow-container right">
          <span role="button" tabIndex="-1" onClick={() => moveDown()} onKeyDown={() => handleKeyDown()}>
            <img className="overview-main-arrow right" alt="right arrow" src="./images/double-right-arrow.png" />
          </span>
        </div>
      );
    }
    return null;
  };

  const toggleView = () => {
    dispatch(updateView(!expandedView));
    if (zoomView) {
      setZoomView(false);
    }
  };

  const toggleZoom = () => {
    dispatch(setZoomView(!zoomView));
  };

  const imageClass = () => {
    if (zoomView) {
      return 'overview-main-image-zoom';
    }
    if (expandedView) {
      return 'overview-main-image-expanded';
    }
    return 'overview-main-image';
  };

  const renderMainImage = () => {
    if (zoomView || expandedView) {
      return (
        <img
          className={imageClass()}
          onClick={() => toggleZoom()}
          onKeyPress={() => toggleZoom()}
          role="link"
          tabIndex="-1"
          src={mainImage.url}
          alt={selectedStyle.name}
          title={selectedStyle.name}
        />
      );
    }
    return (
      <img
        className={imageClass()}
        src={mainImage.url}
        alt={selectedStyle.name}
        title={selectedStyle.name}
      />
    );
  };

  const renderGalleryView = () => {
    if (expandedView) {
      return (
        <>
          <div className="overview-main-image-container-expanded">
            {renderMainImage()}
          </div>
          <div className="overview-collapse-gallery">
            <span role="button" tabIndex="-1" onClick={() => toggleView()} onKeyDown={() => toggleView()}>
              <img className="overview-collapse-icon" alt="collapse" src="./images/collapse-icon.png" />
            </span>
          </div>
        </>
      );
    }
    return (
      <div
        className="overview-main-image-container"
        onClick={() => toggleView()}
        onKeyPress={() => toggleView()}
        role="link"
        tabIndex="-1"
      >
        {renderMainImage()}
      </div>
    );
  };

  if (!mainImage) {
    return <div>Loading Images...</div>;
  }
  if (zoomView) {
    return (
      <div className="overview-gallery-container">
        {renderGalleryView()}
      </div>
    );
  }
  return (
    <>
      <div className="overview-gallery-container">
        {renderGalleryView()}
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
        {renderLeftArrow()}
        {renderRightArrow()}
      </div>
    </>
  );
};

export default Gallery;
