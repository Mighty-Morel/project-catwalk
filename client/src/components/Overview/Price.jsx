/* eslint-disable react/prop-types */
import React from 'react';

const Price = ({ style }) => {
  if (!style) {
    return <div>Updating latest prices...</div>;
  }
  if (style.sale_price > 0) {
    return (
      <>
        <span className="overview-price-sale">
          $
          {style.sale_price}
        </span>
        <span className="overview-price-original">
          $
          {style.original_price}
        </span>
      </>
    );
  }
  return (
    <span>
      $
      {style.original_price}
    </span>
  );
};

export default Price;
