/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';

const AddToCart = () => {
  const allStyles = useSelector((state) => state.style.allStyles);
  const selectedStyleId = useSelector((state) => state.style.id);
  // const selectedStyle = useSelector((state) => state.style.style);
  // console.log(selectedStyle);

  // find the style selected and skus in stock
  const selectedStyle = allStyles.find((style) => selectedStyleId === style.style_id);
  const availableSkus = Object.entries(selectedStyle.skus).filter((sku) => sku[1].quantity > 0);

  // set initial sku, quantity, size, views and cart
  const [selectSku, setSku] = useState(availableSkus[0]);
  const [selectQty, setQty] = useState(1);
  const [selectSize, setSize] = useState('Select Size');
  const [isQtyShown, showQty] = useState(false);
  const [areSizesOpen, openSizes] = useState(false);
  const [cart, addToCart] = useState([]);

  // reset views when rendering new style
  const resetDefault = () => {
    setSku(availableSkus[0]);
    setSize('Select Size');
    showQty(false);
    openSizes(false);
    // document.getElementById('defaultSize').setAttribute('selected', '');
  };

  useEffect(resetDefault, [selectedStyleId]);

  // QUANTITY SELECTOR ========================================================
  // Should this account for multiple skus with the same size? I'm currently assuming all unique.
  // In default style, should sku 1702769 be 'XXL' instead?
  //   1702768: {quantity: 15, size: 'XL'}
  //   1702769: {quantity: 4, size: 'XL'}
  const availableQty = selectSku[1].quantity;

  const qtySelector = () => {
    // show max of 15 in dropdown
    const listedQty = availableQty > 15 ? 15 : availableQty;
    const options = [...Array(listedQty + 1).keys()].slice(1);
    return options.map((i) => <option key={selectSku[0] + i} className="dropdown-content" value={i}>{i}</option>);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  const renderQtySelector = () => {
    // only show Qty dropdown if size is selected and in stock
    if (isQtyShown && availableQty > 0) {
      return (
        <select className="dropdown" name="activeQtySelector" onChange={handleQtyChange}>{qtySelector()}</select>
      );
    } return (
      <select className="dropdown" name="disabledQtySelector" disabled>
        <option defaultValue="-">-</option>
      </select>
    );
  };

  // SIZE SELECTOR ========================================================
  const handleSizeInput = (inputSize) => {
    // const inputSize = e.target.value;
    if (inputSize === 'Select Size') {
      showQty(false);
      setSku(availableSkus[0]);
    } else {
      setSize(inputSize);
      const matchingSku = availableSkus.find((sku) => inputSize === sku[1].size);
      setSku(matchingSku);
      showQty(true);
      openSizes(false);
      console.log(selectSize);
    }
  };

  const availableSizes = availableSkus.map(
    (sku) => (
      <span
        key={sku[0]}
        className="sizes"
        role="menuitem"
        tabIndex="-1"
        onClick={() => handleSizeInput(sku[1].size)}
        onKeyPress={() => handleSizeInput(sku[1].size)}
      >
        {sku[1].size}
      </span>
    ),
  );

  const renderSizeSelecter = () => {
    // if no size is chosen, clicking Add to Cart opens Select Size Dropdown
    if (selectSize === 'Select Size' && availableQty > 0 && areSizesOpen) {
      return (
        <>
          <p className="help-text">Please select a size</p>
          <div className="size-dropdown" id="openSizeSelector">
            <button className="size-dropdown-btn" type="submit">{selectSize}</button>
            {/* <ul className="dropdown" id="openSizeSelector">
              <li className="dropdown-button">Select Size</li> */}
            {availableSizes}
          </div>
        </>
      );
    // Show OUT OF STOCK if no stock
    } if (availableQty === 0) {
      return (
        <>
          <div className="help-text-space" />
          <div className="size-dropdown" id="disabledSizeSelector">
            <button className="size-dropdown-btn" type="submit">{selectSize}</button>
            <span className="disabled-content">OUT OF STOCK</span>
          </div>
          {/* <ul className="dropdown" id="disabledSizeSelector" disabled>
            <li className="dropdown-content" defaultValue="OUT OF STOCK">OUT OF STOCK</li>
          </ul> */}
        </>
      );
    }
    return (
      <>
        <div className="help-text-space" />
        <div className="size-dropdown" id="openSizeSelector">
          <button className="size-dropdown-btn" type="submit">{selectSize}</button>
          {availableSizes}
        </div>
      </>
    );
  };

  // ADD TO CART BUTTON ========================================================
  const handleClick = () => {
    // if clicked without selecting size, trigger size dropdown
    if (selectSize === 'Select Size') {
      openSizes(true);
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

  // Hide Add to Cart button if no stock available
  const renderButton = () => {
    if (availableQty > 0) {
      return (
        <div>
          <button className="addToCart" type="submit" onClick={handleClick}>Add to Cart</button>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div className="addToCart-container">
      {renderSizeSelecter()}
      {renderQtySelector()}
      {renderButton()}
    </div>
  );
};

export default AddToCart;
