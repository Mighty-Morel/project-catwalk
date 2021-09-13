import React from 'react';
import { useGetProductsQuery } from '../reducers/exampleApiSlice';

const ProductsList = () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  let content;

  if (isLoading) {
    content = <p text="Loading..." />;
  } else if (isSuccess) {
    content = products.map((product) => (
      <p>
        {product.id}
      </p>
    ));
  } else if (isError) {
    content = (
      <p>
        {error.toString()}
      </p>
    );
  }

  return (
    <section>
      <h2> Products </h2>
      {content}
    </section>

  );
};

export default ProductsList;
