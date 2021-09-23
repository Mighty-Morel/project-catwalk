/* eslint-disable react/prop-types */
import React from 'react';
import './card.css';

const Price = (props) => {
  const { price, sale } = props;

  if (sale > 0) {
    return (
      <>
        <span className=".c-cardSale" data-testid="sale">
          $
          {sale}
        </span>
        <span className=".c-cardPrice-cross">
          $
          {price}
        </span>
      </>
    );
  }
  return (
    <span className=".c-cardPrice">
      $
      {price}
    </span>
  );
};

export default Price;
