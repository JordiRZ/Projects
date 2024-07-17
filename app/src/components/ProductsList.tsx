//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import Products from './Products'

import { useContext } from '../context'

function ProductsList() {
    const [products, setProducts] = useState([])

    const { showFeedback, stamp } = useContext()

    const loadProducts = () => {
        logger.debug('ProductsList -> loadProducts')

        try {
            logic.retrieveProducts()
                .then(setProducts)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }


    useEffect(() => {
        loadProducts()
    }, [stamp])




    logger.debug('ProductsList -> render')

    return <ul>
        {products.map(product => (
            <Products key={product.id} item={product} />))}
    </ul>
}

export default ProductsList