import { FunctionComponent, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { CurrencyFormatter  } from '../CurrencyFormatter'
import classes from './product.module.scss'
import { Loader } from '../Loader'

const API_URL = 'https://dummyjson.com/products'

export const Product: FunctionComponent = () => {
    //stuff here
    //? Do I want to pull data down here as well or reference the Products component
    // Figure out how to pull indivual prod data (maybe per request?)

    useEffect(() => {
        fetchData(API_URL)  //need to make this a single item by appending "/{product_number}"
    })

    async function fetchData(url: string) {
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                // setProducts
                // stopping here. need to decide how to store data
            }
        }
    }
}