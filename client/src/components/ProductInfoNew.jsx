/* eslint-disable import/extensions */
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetProductInfoQuery, useGetStylesQuery } from '../reducers/Example-Api-Slice';
import Price from './Price.jsx';
import StyleSelector from './StyleSelector.jsx';


// const ProductInfo = ({ match }) => {
//   const { productId } = match.params

const ProductInfo = () => {
  const productId = useSelector((state) => state.product.id);

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductInfoQuery(productId);



  // console.log(styles);
  // const styleId = styles.results[0].id;

  // const product = useSelector(state =>
  //   state.products.find(product => product.id === productId),
  // )

  let content;

  if (isLoading) {
    content = (
      <span data-testid="noProduct">
        Loading
      </span>
    );
  } else if (isSuccess) {
    content = (
      <>
        <div data-testid="resolved" className="overview">
          <span data-testid="ratings" className="ratings">Star Ratings Placeholder</span>
          <br />
          <span data-testid="show-category" className="category">{product.category}</span>
          <br />
          <span data-testid="show-name" className="product-name">{product.name}</span>
          <br />
          <span data-testid="show-price" className="price"><Price /></span>
          <br />
          <span data-testid="show-description" className="description">{product.description}</span>
          <br />
          <span data-testid="social-media" className="social-media">Social Media Placeholder</span>
          <br />
          <div data-testid="style-selector" className="style-selector">
            <StyleSelector allStyles={allStyles} updateStyle={this.updateStyle} />
          </div>
        </div>
      </>
    );
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  return (
    <section>
      <h2> Product Overview </h2>
      {content}
    </section>

  );
};

export default ProductInfo;
