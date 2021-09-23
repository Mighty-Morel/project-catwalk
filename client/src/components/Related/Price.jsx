import React from 'react';
import PropTypes from 'prop-types';
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

Price.propTypes = {
  price: PropTypes.string.isRequired,
  sale: PropTypes.string.isRequired,
};

export default Price;
