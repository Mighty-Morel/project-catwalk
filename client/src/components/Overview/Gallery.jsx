/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePhoto } from '../../reducers/Style-Reducer';

// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';
import GalleryThumbnail from './GalleryThumbnail.jsx';

const Gallery = () => {
  const dispatch = useDispatch();

  const selectedStyle = useSelector((state) => state.style.style);
  const stylePhotos = useSelector((state) => state.style.photos);
  // const mainImage = useSelector((state) => state.style.mainPhoto);
  const [mainPhotoIndex, setPhotoIndex] = useState(0);
  // const [mainImage, setMainImage] = useState(stylePhotos[photoIndex])
  const [downArrow, toggleDownArrow] = useState(false);

  const mainImage = stylePhotos[mainPhotoIndex];
  // limit to show only up to 7 thumbnails
  let displayedPhotos = [];
  const limitPhotos = () => {
    if (stylePhotos.length > 7) {
      displayedPhotos = stylePhotos.slice(0, 7);
      toggleDownArrow(true);
    }
    displayedPhotos = stylePhotos;
    toggleDownArrow(false);
    console.log('limit photos', displayedPhotos);
  };

  useEffect(limitPhotos, [mainImage]);

  const selectPhoto = (index) => {
    setPhotoIndex(index);
  };

  if (!mainImage) {
    return <div>Loading Images...</div>;
  }
  return (
    <>
      <div className="gallery-container">
        <div className="main-image-container">
          <img
            className="main-image"
            src={mainImage.url}
            alt={selectedStyle.name}
            title={selectedStyle.name}
          />
        </div>
        <div className="thumbnail-container">
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
      </div>
    </>
  );
};

export default Gallery;
