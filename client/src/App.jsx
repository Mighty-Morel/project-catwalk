import React from 'react';
import ProductInfo from './components/ProductInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <ProductInfo />
      </div>
    )
  }
}

export default App;