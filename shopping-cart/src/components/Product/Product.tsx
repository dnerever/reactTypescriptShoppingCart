import React, { FunctionComponent, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { CurrencyFormatter  } from '../CurrencyFormatter'
import classes from './product.module.scss'
import { Loader } from '../Loader'
// import { Products } from '../Products'

const API_URL = 'https://dummyjson.com/products/1'

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
    //stuff here
    //? Do I want to pull data down here as well or reference the Products component
    // Figure out how to pull indivual prod data (maybe per request?)
    
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState(false)
    const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})
    

    useEffect(() => {
        fetchData(API_URL)  //need to make this a single item by appending "/{product_number}"
    })

    async function fetchData(url: string) {
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setProduct(data.product)
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
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>Price: <CurrencyFormatter amount={product.price} /></p>
                        <button disabled={isInCart(product.id)} onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                )}
            </div>
        </section>
    )
}