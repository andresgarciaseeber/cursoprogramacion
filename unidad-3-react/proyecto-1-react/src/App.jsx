import React from 'react'
import './App.css'
import ProductCard from './components/ProductCard/ProductCard.jsx'

// Componente App - componente principal
function App() {
  return (
    <div className="App">
      <h1>Productos</h1>

      <div className="products-container">
        <ProductCard title={'Tv Samsung 60"'} currentSymbol={'u$s'} price={'500'} isInCart={true} isOnsale={true}/>
        <ProductCard title={'Tv Samsung 80"'} currentSymbol={'u$s'} price={'700'} isInCart={false} isOnsale={true}/>
        <ProductCard title={'Tv Samsung 90"'} currentSymbol={'$'} price={'9.000.000'} isInCart={true} isOnsale={false}/>
      </div>

    </div>
  )
}
export default App