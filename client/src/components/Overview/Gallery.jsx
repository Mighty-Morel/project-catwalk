/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import overviewStyling from './overview.css';
import GalleryThumbnail from './GalleryThumbnail.jsx';

const Gallery = () => {
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyleId = useSelector((state) => state.style.id);
  const selectedStyle = useSelector((state) => state.style.style);
  const stylePhotos = useSelector((state) => state.style.photos);
  let mainImage = stylePhotos[0];

  console.log('allStyles', allStyles);
  console.log('selectedStyleId', selectedStyleId);
  console.log('selectedStyle', selectedStyle);
  console.log('stylePhotos', stylePhotos);
  console.log('mainImage', stylePhotos[0]);


  // const [mainImage, setImage] = useState(stylePhotos[0]);
  // const renderGallery = () => {
  //   if (selectedStyle) {
  //     useEffect(renderGallery, [selectedStyleId]);
  //     const allPhotos = selectedStyle.photos;
  //     console.log(selectedStyle.photos);
  //     console.log('stylePhotos', stylePhotos);
  //   }
  // };

  // useEffect(render, [mainImage]);

  const handleClick = (e) => {
    const selectedImage = e.target.value;
    // setImage(selectedImage);
    mainImage = e.target.value;
  };

  if (stylePhotos.length === 0) {
    // renderGallery();
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
            <GalleryThumbnail key={photo.url} style={selectedStyle} photo={photo} />
            // <span key={photo.url} role="menuitem" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
            //   <img
            //     className="image-thumbnail"
            //     src={photo.thumbnail_url}
            //     alt={selectedStyle.name}
            //   />
            // </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
