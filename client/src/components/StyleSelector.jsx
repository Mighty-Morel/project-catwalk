/* eslint-disable react/prop-types */
import React from 'react';
import Style from './Style.jsx'

const StyleSelector = ({ allStyles }) => (
  // const styleId = useSelector((state) => state.style.id);
  <div>
    {allStyles.map((style) => (<Style key={style.style_id} style={style} />))}
  </div>
);

export default StyleSelector;
