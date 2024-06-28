import { FunctionComponent, useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

import { CurrencyFormatter  } from '../CurrencyFormatter'
import classes from './product.module.scss'
import { Loader } from '../Loader'


export const Product: FunctionComponent = () => {
    //stuff here
    //? Do I want to pull data down here as well or reference the Products component
    // Figure out how to pull indivual prod data (maybe per request?)
}