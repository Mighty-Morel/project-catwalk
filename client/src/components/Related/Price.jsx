import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Price = (props) => {
  const { price, sale } = props;

  Price.propTypes = {
    price: PropTypes.string,
    sale: PropTypes.string,
  };

  Price.defaultProps = {
    price: null,
    sale: null,
  };

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
