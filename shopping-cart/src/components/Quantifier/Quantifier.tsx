import { FunctionComponent, useState } from 'react'
import classes from './quantifier.module.scss'

export type Operation = 'decrease' | 'increase'

interface Props {
    removeProductCallback: (productId: number) => void
    handleUpdateQuantity: (productId: number, operation: Operation) => void
    productId: number
    initialQuantity: number
}

export const Quantifier: FunctionComponent<Props> = ({ removeProductCallback, handleUpdateQuantity, productId, initialQuantity }) => {
    const [value, setValue] = useState<number>(initialQuantity)

    // const checkRealValue = ():void => {

    // }
    
    const reduce = ():void => {
        handleUpdateQuantity(productId, 'decrease')

        setValue(prevState => {
            const updatedValue = prevState - 1
            if (updatedValue <= 0) {
                removeProductCallback(productId)
            }
            return updatedValue
        })
    }

    const increase = ():void => {
        handleUpdateQuantity(productId, 'increase')
        setValue(prevState => prevState + 1)
    }

    return (
        <div className={classes.quantifier}>
            <input type="button" value="-" className={classes.buttonMinus} onClick={reduce} />
            <input type="number"
                step="1"
                max=""
                value={value}
                onChange={e => setValue(parseInt(e.target.value))}
                className={classes.quantityField}
            />
            <input type="button" value="+" className={classes.buttonPlus} onClick={increase} />
        </div>
    )
}