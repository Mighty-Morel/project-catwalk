/* eslint-disable import/extensions */
import React from 'react';
import Style from './Style.jsx';
// eslint-disable-next-line no-unused-vars
import overviewStyling from './overview.css';

const StyleSelector = ({ allStyles }) => (
  allStyles.map((style) => (<Style key={style.style_id} style={style} />))
);

export default StyleSelector;
