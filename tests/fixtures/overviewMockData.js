
const mockProductData = {
  id: 48432,
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
  category: 'Pants',
  default_price: '40',
};

const mockStyleData = {
  product_id: '48432',
  results: [
    {
      style_id: 293480,
      name: 'Desert Brown & Tan',
      original_price: '140.00',
    },
    {
      style_id: 123456,
      name: 'Testing only',
      original_price: '0',
    },
    {
      style_id: 654321,
      name: 'Testing 2',
      original_price: '10.00',
    },
  ],
};

const mockStyle = {
  style_id: 293480,
  name: 'Forest Green & Black',
  original_price: '140.00',
  sale_price: '120.00',
  'default?': true,
  photos: [{
    thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  },
  {
    thumbnail_url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    url: 'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80',
  }],
  skus: {
    1702764: { quantity: 8, size: 'XS' },
    1702765: { quantity: 16, size: 'S' },
    1702766: { quantity: 17, size: 'M' },
    1702767: { quantity: 10, size: 'L' },
    1702768: { quantity: 15, size: 'XL' },
  },
};

const mockCartData = [
  {
    sku_id: 1702764,
    count: '1',
  },
  {
    sku_id: 1702799,
    count: '3',
  },
  {
    sku_id: 1702925,
    count: '7',
  },
];


export default { mockProductData, mockStyle, mockCartData } = overviewMockData;
