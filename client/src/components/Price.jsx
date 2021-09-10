/* eslint-disable react/prop-types */
import React from 'react';
// If the SKU is currently discounted, then the sale price should appear in red,
// followed by the original price which is struckthrough.

const Price = ({ style }) => {
  console.log(style);
  if (style.sale_price > 0) {
    return (
      <>
        <span>${style.sale_price}</span>
        <span className="price-discount">${style.original_price}</span>
      </>
    );
  }
  return (
    <span>${style.original_price}</span>
  );
};

export default Price;
