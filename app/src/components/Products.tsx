//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import Confirm from './Confirm'

import { useContext } from '../context'
import { Routes, Route } from 'react-router-dom'

function Products({ item : product}) {
    const [products, setProducts] = useState([])

    const { showFeedback, showConfirm } = useContext()


    logger.debug('Products -> render')

    return  <article className="p-4 border rounded-lg shadow-md bg-white mb-4 grid grid-cols-2">
    <div className="col-span-1 pr-4">
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p><span className="font-semibold">Tipo:</span> {product.type}</p>
        <p><span className="font-semibold">Tipo de cirugía:</span> {product.surgeryType}</p>
        <p><span className="font-semibold">Precio:</span> {product.price}€</p>
        <div className="w-32 h-32">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
    </div>
    <div className="col-span-1 pl-4 border-l-2 border-blue-200 flex flex-col">
        <div className="mb-2">
            <span className="font-semibold"></span> {product.description}
        </div>
    </div>
</article>
    


}

export default Products













