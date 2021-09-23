/* eslint-disable react/prop-types */
import React from 'react';
// import { useSelector } from 'react-redux';

const Price = ( { style }) => {
  // const styleId = useSelector((state) => state.style.id);
  // const allStyles = useSelector((state) => state.style.allStyles);
  // const selectedStyle = useSelector(
  //   () => allStyles.find((style) => style.style_id === styleId),
  // );

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
