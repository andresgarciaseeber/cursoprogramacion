import './ProductCard.css'

function ProductCard ( props ) {
    // Extraer los valores de props
    const { title, currentSymbol, price, isInCart, isOnsale } = props
    console.log(props)


    return (

        <div className="product-card">
            <h2>{title}</h2>
            <span className="price">{currentSymbol} {price}</span>

            {
            isInCart
            ? <button className="remove">Quitar del carrito</button>
            : <button>Comprar</button>
            }
            {
            isOnsale
            ? <span className="oferta">Oferta</span>
            : <span className="no-oferta">Sin oferta</span>
            }
        </div>
    )

}



export default ProductCard