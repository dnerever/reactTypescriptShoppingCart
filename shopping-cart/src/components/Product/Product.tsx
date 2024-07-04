import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useLocalStorageState from 'use-local-storage-state'

import { CurrencyFormatter  } from '../CurrencyFormatter'
import classes from './product.module.scss'
import { Loader } from '../Loader'

const API_URL = 'https://dummyjson.com/products'

export type Product = {
    id: number
    title: string
    price: number
    thumbnail: string
    image: string
    quantity: number
}

export interface CartProps {
    [productId: string]: Product
}

export const Prod: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>()
    const urlId = id

    const product1 = {
        id: 1,
        title: "string",
        price: 2.00,
        thumbnail: "string",
        image: "string",
        quantity: 1        
    }
    
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState<Product | null>(product1)
    const [error, setError] = useState(false)
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    
    useEffect(() => {
        fetchData(`${API_URL}/${urlId}`)  //need to make this a single item by appending "/{product_number}"
    }, [])  //empty array means that it will only use the effect on reload

    async function fetchData(url: string) {
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setProduct(data)
                setIsLoading(false)
            } else {
                setError(true)
                setIsLoading(false)
            }
        } catch (error) {
            setError(true)
            setIsLoading(true)
        }
    }


    const addToCart = (product: Product):void => {
        product.quantity = 1
        
        setCart((prevCart: any) => ({
            ...prevCart,
            [product.id]: product,
        }))
    }

    const isInCart = (productId: number): boolean => Object.keys(cart || {}).includes(productId.toString())

    if (error) {
        return <h3 className={classes.error}>An error occurred when fetching data. Please check the API and try again.</h3>
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className={classes.productPage}>
            <h1>Product</h1>

            <div className={classes.container}>
                {product && (
                    <div className={classes.product} key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p>Price: <CurrencyFormatter amount={product.price} /></p>
                        <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                )}
            </div>
        </section>
    )
}