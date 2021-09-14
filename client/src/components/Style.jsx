import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../reducers/Style-Reducer';

const Style = ({ style }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const styleId = style.style_id;
    console.log(styleId);
    dispatch(updateItem(styleId));
  };

  const styleId = useSelector((state) => state.style.id);

  return (
    <span className="thumbnail">
      <img
        className={style.style_id === styleId
          ? 'style-selected'
          : 'style-unselected'}
        src={style.photos[0].thumbnail_url}
        alt={style.name}
        onClick={handleClick}
      />
    </span>
  );
};

export default Style;
