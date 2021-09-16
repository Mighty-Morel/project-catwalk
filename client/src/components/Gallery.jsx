/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Gallery = () => {
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyleId = useSelector((state) => state.style.id);
  const selectedStyle = useSelector((state) => state.style.style);
  const stylePhotos = useSelector((state) => state.style.photos);
  const mainImage = stylePhotos[0];

  console.log('allStyles', allStyles);
  console.log('selectedStyleId', selectedStyleId);
  console.log('selectedStyle', selectedStyle);
  console.log('stylePhotos', stylePhotos);
  console.log('mainImage', stylePhotos[0]);


  const renderGallery = () => {
    if (selectedStyle) {
      // useEffect(renderGallery, [selectedStyleId]);
      // const allPhotos = selectedStyle.photos;
      // const [mainImage, setImage] = useState(allPhotos.url);
      console.log(selectedStyle.photos);
      console.log('stylePhotos', stylePhotos);
    }
  };


  const handleClick = (e) => {
    const selectedImage = e.target.value;
    setImage(selectedImage.url);
  };

  if (stylePhotos.length === 0) {
    // renderGallery();
    return <div>Loading Images...</div>;
  }
  return (
    <>
      <div>Hello</div>
      <div className="main-image-area">
        <img
          className="main-image"
          src={mainImage.url}
          alt={selectedStyle.name}
          title={selectedStyle.name}
        />
      </div>
      <div className="thumbnails">
        {stylePhotos.map((photo) => (
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

// const allStyles = useSelector((state) => state.style.allStyles);
// const selectedStyleId = useSelector((state) => state.style.id);

// // find the style selected
// const selectedStyle = allStyles.find((style) => selectedStyleId === style.style_id);

// // set up dropdown for available sizes
// const availableSkus = Object.entries(selectedStyle.skus).filter((sku) => sku[1].quantity > 0);

// // set default sku, quantity, and sizes
// const [selectSku, setSku] = useState(availableSkus[0]);
// const [selectQty, setQty] = useState(1);
// const [selectSize, setSize] = useState('Select Size');
// const [showSize, setSizeDisplay] = useState(false);
// const [showQty, setQtyDisplay] = useState(false);
// const [outOfStock, toggleStock] = useState(false);
// const [cart, addToCart] = useState([]);

// // SIZE SELECTOR ========================================================
// const availableSizes = availableSkus.map(
//   (sku) => <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>,
// );
