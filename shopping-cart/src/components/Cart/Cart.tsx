import { FunctionComponent, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import useLocalStorageState from "use-local-storage-state"

import { Quantifier } from '../Quantifier'
import { CartProps } from '../Products/Products.tsx'
import { TotalPrice } from '../TotalPrice'
import { Operation } from '../Quantifier/Quantifier.tsx'
import classes from './cart.module.scss'

export const Cart: FunctionComponent = () => {
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0,0)
    }, [location])

    const handleRemoveProduct = (productId: number): void => {
        setCart((prevCart: CartProps) => {
            const updatedCart = { ...prevCart }
            delete updatedCart[productId]
            return updatedCart
        })
    }

    const handleUpdateQuantity = (productId: number, operation: Operation) => {
        setCart((prevCart: CartProps) => {
            const updatedCart = { ...prevCart }
            if (updatedCart[productId]) {
                if (operation === 'increase') {
                    updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity + 1}
                } else {
                    updatedCart[productId] = { ...updatedCart[productId], quantity: updatedCart[productId].quantity - 1}
                }
            }
            return updatedCart
        })
    }
    
    const getProducts = () => Object.values(cart || {})
    
    const totalPrice = getProducts().reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)
    
    return (
        <section className={classes.cart}>
            <h1>Cart</h1>
        <div className={classes.container}>
            {getProducts().map(product => (
                <div className={classes.product} key={product.id}>
                    <Link to={{pathname: `/product/${product.id}`}}>
                        <img src={product.thumbnail} alt={product.title} />
                    </Link>
                        <h3>{product.title}</h3>
                    <Quantifier
                        initialQuantity={product.quantity}
                        removeProductCallback={() => handleRemoveProduct(product.id)}
                        productId={product.id}
                        handleUpdateQuantity={handleUpdateQuantity} />
                </div>
            ))}
        </div>
        <TotalPrice amount={totalPrice} />
        </section>
    )
}