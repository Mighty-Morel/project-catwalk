import React from 'react';
//If the SKU is currently discounted, then the sale price should appear in red,
//followed by the original price which is struckthrough.

const Price = ({style}) => {
  if (style.sale_price > 0 ) {
    return (
      <>
      <span className='discounted'>{style.sale_price}</span><span className='defaultPrice'>{style.original_price}</span>
      </>
    )
  } else {
    return (
      <span className='defaultPrice'>{style.original_price}</span>
    )
  }
}

export default Price;