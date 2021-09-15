/* eslint-disable import/extensions */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyleId = useSelector((state) => state.style.id);

  // find the style selected
  const selectedStyle = allStyles.find((style) => selectedStyleId === style.style_id);
  const allPhotos = selectedStyle.photos;

  const [mainImage, setImage] = useState(allPhotos[0].url);

  const handleClick = (e) => {
    const selectedImage = e.target.value;
    setImage(selectedImage.url);
  };

  return (
    <>
      <div className="main-image-area">
        <img
          className="main-image"
          src={mainImage.url}
          alt={selectedStyle.name}
          title={selectedStyle.name}
        />
      </div>
      <div className="thumbnails">
        {allPhotos.map((photo) => (
          <span role="menuitem" tabIndex="-1" onClick={handleClick} onKeyPress={handleClick}>
            <img
              src={photo.thumbnail_url}
              alt={selectedStyle.name}
            />
          </span>
        ))}
      </div>
    </>
  );
};

export default Gallery;
