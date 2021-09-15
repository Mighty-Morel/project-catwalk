/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductInfo } from '../reducers/Example-Reducer';
import { updateStyles } from '../reducers/Style-Reducer';

import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';

const AddToCart = () => {
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyleId = useSelector((state) => state.style.id);

  // find the style selected
  const selectedStyle = allStyles.find((style) => selectedStyleId === style.style_id);

  // set up dropdown for available sizes
  const availableSkus = Object.entries(selectedStyle.skus).filter((sku) => sku[1].quantity > 0);
  // console.log('entries', Object.entries(selectedStyle.skus));
  // console.log('available skus', availableSkus);

  // set default sku, quantity, and sizes
  const [selectSku, setSku] = useState(availableSkus[0]);
  console.log('select sku', selectSku);
  // const [selectQuantity, setQuantity] = useState(selectSku.quantity)
  // const [selectSize, setSize] = useState(selectSku.size)

  const sizeSelector = () => (
    availableSkus.map((sku) => <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>)
  );

  // // update quantity based on sku
  const availableQty = selectSku[1].quantity;
  console.log(availableQty);
  // for (sku in style.skus) {
  //   if (sku.size === inputSize) {
  //     let quantity = sku.quantity;
  //   }
  // }

  // should this account for duplicate sizes? for example, 2 diff skus with XL size:
  //   1702768: {quantity: 15, size: 'XL'}
  //   1702769: {quantity: 4, size: 'XL'}
  // or assume that is a typo?
  const qtySelector = () => {
    const listedQty = availableQty > 15 ? 15 : availableQty;
    const options = [...Array(listedQty + 1).keys()];
    console.log(options);
    return options.map((i) => <option key={selectSku[0] + i} value={i}>{i}</option>);
  };

  const handleSizeChange = (e) => {
    console.log('value', e.target.value);
    const selectSize = e.target.value;
    // find the style selected
    setSku(availableSkus.find((sku) => selectSize === sku[1].size));
  };

  const handleQtyChange = () => {

  };

  return (
    <>
      <select className="sizeSelector" name="sizeSelector" onChange={handleSizeChange}>{sizeSelector()}</select>
      <select className="qtySelector" name="qtySelector" onChange={handleQtyChange}>{qtySelector()}</select>
      <button className="addToCart" type="submit">Add to Bag</button>
    </>
  );
};

export default AddToCart;
