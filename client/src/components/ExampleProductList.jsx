import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItem } from '../reducers/Example-Reducer';
import { useGetProductsQuery } from '../reducers/Example-Api-Slice';

const ProductsList = () => {
  const currentId = useSelector((state) => state.product.id);

  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  const handleClick = (e) => {
    console.log('target', e.target);
    console.log('value', e.target.value);
    dispatch(updateItem(e.target.value));
  };

  let content;

  if (isLoading) {
    content = (
      <p>
        Loading
      </p>
    );
  } else if (isSuccess) {
    content = products.map((product) => (
      <p key={product.id} value='test' onClick={handleClick}>
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
