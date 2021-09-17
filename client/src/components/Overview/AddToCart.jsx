/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';

const AddToCart = () => {
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyleId = useSelector((state) => state.style.id);

  // find the style selected
  const selectedStyle = allStyles.find((style) => selectedStyleId === style.style_id);

  // set up dropdown for available sizes
  const availableSkus = Object.entries(selectedStyle.skus).filter((sku) => sku[1].quantity > 0);

  // set default sku, quantity, and sizes
  const [selectSku, setSku] = useState(availableSkus[0]);
  const [selectQty, setQty] = useState(1);
  const [selectSize, setSize] = useState('Select Size');
  const [showSize, setSizeDisplay] = useState(false);
  const [showQty, setQtyDisplay] = useState(false);
  const [outOfStock, toggleStock] = useState(false);
  const [cart, addToCart] = useState([]);

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
      setSku(availableSkus[0]);
    } else {
      setSize(inputSize);
      // toggleSizes(false);
      const matchingSku = availableSkus.find((sku) => inputSize === sku[1].size);
      setSku(matchingSku);
      setQtyDisplay(true);
    }
  };

  const activeSizeSelector = (
    <select className="dropdown" name="activeSizeSelector" onChange={handleSizeChange}>
      <option defaultValue="Select Size">Select Size</option>
      {availableSizes}
    </select>
  );

  const openSizeSelector = (
    <select className="dropdown" id="openSizeSelector" name="activeSizeSelector" onChange={handleSizeChange}>
      <option defaultValue="Select Size">Select Size</option>
      {availableSizes}
    </select>
  );

  const disabledSizeSelector = (
    <select className="dropdown" name="disabledSizeSelector" disabled>
      <option defaultValue="OUT OF STOCK">OUT OF STOCK</option>
    </select>
  );

  // QUANTITY SELECTOR ========================================================
  const availableQty = selectSku[1].quantity;
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
    <select className="dropdown" name="activeQtySelector" onChange={handleQtyChange}>{qtySelector()}</select>
  );

  const disabledQtySelector = (
    <select className="dropdown" name="disabledQtySelector" disabled>
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

  // set default displays
  let displaySize = activeSizeSelector;
  let displayQty = disabledQtySelector;

  if (availableQty > 0) {
    displaySize = activeSizeSelector;
  } else {
    displaySize = disabledSizeSelector;
  }
  if (showQty) {
    displayQty = activeQtySelector;
  } else {
    displayQty = disabledQtySelector;
  }

  const button = <button className="addToCart" type="submit" onClick={handleClick}>Add to Cart</button>;

  const handleClick = () => {
    if (selectSize === 'Select Size') {
      // const sizeDropdown = document.getElementById('activeSizeSelector');
      // sizeDropdown.classList.toggle('open-dropdown');
      displaySize = openSizeSelector;
      // console.log('tried to open');
    } else {
      const item = {
        sku: selectSku[0],
        quantity: selectQty,
        size: selectSize,
      };
      addToCart([...cart, item]);
      resetDefault();
    }
  };

  // reset views on rendering new product
  const resetDefault = () => {
    setSku(availableSkus[0]);
    setSize('Select Size');
    setQtyDisplay(false);
  };

  useEffect(resetDefault, [selectedStyleId]);

  if (selectQty > 0) {
    return (
      <>
        {displaySize}
        {displayQty}
        <div>
          <button className="addToCart" type="submit" onClick={handleClick}>Add to Cart</button>
        </div>
      </>
    );
  }
  return (
    <>
      {displaySize}
      {displayQty}
    </>
  );
};

export default AddToCart;
