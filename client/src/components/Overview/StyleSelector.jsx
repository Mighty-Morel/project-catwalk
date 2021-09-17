/* eslint-disable import/extensions */
import React from 'react';
import Style from './Style.jsx';
import overviewStyling from './overview.css';


const StyleSelector = ({ allStyles }) => (
  allStyles.map((style) => (<Style key={style.style_id} style={style} />))
);

export default StyleSelector;
