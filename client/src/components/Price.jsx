/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
// import { useGetStylesQuery } from '../reducers/Example-Api-Slice';

// If the SKU is currently discounted, then the sale price should appear in red,
// followed by the original price which is struckthrough.

const Price = ({selectedStyle}) => {
  // // // ATTEMPT AT REDUX REFACTORING - USE WITH ProductInfoNew.jsx
  // const styleId = useSelector((state) => state.style.id);
  // const allStyles = useSelector((state) => state.style.allStyles);

  // console.log(styleId);
  // // const styles = useSelector(state => state.style);
  // const selectedStyle = useSelector(state =>
  //   state.style.allStyles.find((style) => style.id === styleId));
  // // =======================================================END

  if (selectedStyle.sale_price > 0) {
    return (
      <>
        <span>
          $
          {selectedStyle.sale_price}
        </span>
        <span className="price-discount">
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
