import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../reducers/Style-Reducer';

class Style extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { style } = this.props;
    const { selected } = this.state;
    const dispatch = useDispatch();
    const styleId = style.style_id;
    dispatch(updateItem(styleId));
    this.setState({
      selected: !selected,
    });
    console.log(styleId, selected);
  }

  // const styleId = useSelector((state) => state.style.id);

  render() {
    const { style } = this.props;
    const { selected } = this.state;

    return (
      <span className="thumbnail">
        <img
          className={this.state.selected
            ? 'style-selected'
            : 'style-unselected'}
          src={style.photos[0].thumbnail_url}
          alt={style.name}
          onClick={this.handleClick}
        />
      </span>
    );
  }
}

export default Style;
