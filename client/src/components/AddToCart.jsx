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
  const [selectQty, setQty] = useState(0);
  const [selectSize, setSize] = useState('Select Size');
  const [activeQty, setQtyDisplay] = useState(false);

  const availableQty = selectSku[1].quantity;
  // console.log('sku1', selectSku[1]);
  // console.log('availableQty', availableQty);

  // SIZE SELECTOR ========================================================
  const availableSizes = availableSkus.map(
    (sku) => <option key={sku[0]} value={sku[1].size}>{sku[1].size}</option>,
  );

  const handleSizeChange = (e) => {
    console.log('value', e.target.value);
    console.log('availableSkus', availableSkus);
    const inputSize = e.target.value;
    if (inputSize === 'Select Size') {
      setQtyDisplay(false);
    } else {
      setSize(inputSize);
      // console.log('find sku', availableSkus.find((sku) => e.target.value === sku[1].size));
      const matchingSku = availableSkus.find((sku) => inputSize === sku[1].size);
      setSku(matchingSku);
      setQtyDisplay(true);
    }
  };

  const activeSizeSelector = (
    <select className="sizeSelector" name="sizeSelector" onChange={handleSizeChange}>
      <option defaultValue="Select Size">Select Size</option>
      {availableSizes}
    </select>
  );

  const disabledSizeSelector = (
    <select className="sizeSelector" name="sizeSelector" disabled>
      <option defaultValue="OUT OF STOCK">OUT OF STOCK</option>
    </select>
  );

  // QUANTITY SELECTOR ========================================================
  // update quantity based on sku
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
    // const options = [...Array(listedQty + 1).keys()];
    const options = [...Array(listedQty + 1).keys()].slice(1);
    console.log(options);
    return options.map((i) => <option key={selectSku[0] + i} value={i}>{i}</option>);
  };

  const handleQtyChange = (e) => {
    console.log('value', e.target.value);
    setQty(e.target.value);
  };

  const activeQtySelector = (
    <select className="qtySelector" name="qtySelector" onChange={handleQtyChange}>{qtySelector()}</select>
  );

  const disabledQtySelector = (
    <select className="qtySelector" name="qtySelector" disabled>
      <option defaultValue="-">-</option>
    </select>
  );

  // if Select Size is selected:
  // Clicking Add to Cart triggers Select Size Dropdown
  // Qty should be hidden (-) (disable Qty)

  // If no stock:
  // Hide Add to Cart Button (disable Add)
  // Show OUT OF STOCK in size selector (disable Size)
  // Qty should be hidden (-) (disable Qty)

  // If valid size and qty:
  // show Add to Cart Button
  // show qty
  // show sizes
  // after button click, clear display

  return (
    <>
      {availableQty > 0 ? activeSizeSelector : disabledSizeSelector}
      {activeQty ? activeQtySelector : disabledQtySelector}
      <div>
        <button className="addToCart" type="submit">Add to Cart</button>
      </div>
    </>
  );
};

export default AddToCart;
