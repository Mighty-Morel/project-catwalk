import React from 'react';
//If the SKU is currently discounted, then the sale price should appear in red,
//followed by the original price which is struckthrough.

const Price = ({style}) => {
  if (product.sale_price > 0 ) {
    return (
      <span className='discounted'>{style.sale_price}</span>
      <span className='defaultPrice'>{style.original.price}</span>
    )
  } else {
    return (
      <span className='defaultPrice'>{style.original.price}</span>
    )
  }
}

export default Price;