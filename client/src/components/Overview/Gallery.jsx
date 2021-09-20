/* eslint-disable import/extensions */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePhoto } from '../../reducers/Style-Reducer';

// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';
import GalleryThumbnail from './GalleryThumbnail.jsx';

const Gallery = () => {
  const dispatch = useDispatch();

  const selectedStyle = useSelector((state) => state.style.style);
  const stylePhotos = useSelector((state) => state.style.photos);
  const mainImage = useSelector((state) => state.style.mainPhoto);

  const selectPhoto = (photo) => {
    dispatch(updatePhoto(photo));
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
          {stylePhotos.map((photo) => (
            <GalleryThumbnail
              key={photo.url}
              style={selectedStyle}
              photo={photo}
              selectPhoto={selectPhoto}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
