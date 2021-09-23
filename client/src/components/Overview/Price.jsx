/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';

const Price = () => {
  const styleId = useSelector((state) => state.style.id);
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyle = useSelector(
    () => allStyles.find((style) => style.style_id === styleId),
  );

  if (!selectedStyle) {
    return <div>Updating latest prices...</div>;
  }
  if (selectedStyle.sale_price > 0) {
    return (
      <>
        <span className="overview-price-sale">
          $
          {selectedStyle.sale_price}
        </span>
        <span className="overview-price-original">
          $
          {selectedStyle.original_price}
        </span>
      </>
    );
  }
  return (
    <span>
      $
      {selectedStyle.original_price}
    </span>
  );
};

export default Price;
