import React from 'react';
import { useGetProductsQuery } from '../reducers/Example-Api-Slice';

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
    content = (
      <p>
        Loading
      </p>
    );
  } else if (isSuccess) {
    content = products.map((product) => (
      <p key={product.id}>
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
