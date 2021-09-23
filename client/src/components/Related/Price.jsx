/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import './card.css';

const Price = (props) => {
  const { price, sale } = props;

  if (sale > 0) {
    return (
      <>
        <span className=".cardSale" data-testid="sale">
          $
          {sale}
        </span>
        <span className=".cardPrice-cross">
          $
          {price}
        </span>
      </>
    );
  }
  return (
    <span className=".cardPrice">
      $
      {price}
    </span>
  );
};

export default Price;
