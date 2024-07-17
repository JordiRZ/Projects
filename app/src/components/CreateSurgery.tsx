//@ts-nocheck

import { logger } from '../utils'
import CancelButton from './library/CancelButton'
import logic from '../logic'
import SubmitButton from './library/SubmitButton'
import { useEffect, useState } from 'react'
import { useContext } from '../context'


function CreateSurgery({ onCancelClick, onSurgeryCreated, onProductsClick }) {
    const { showFeedback } = useContext()
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        logic.retrieveProducts()
            .then(products => setProducts(products))
            .catch(error => console.error(error))
    }, [])

    const handleProductChange = (event, product) => {
        const quantity = parseInt(event.target.value)

        if (isNaN(quantity) || quantity < 0) {
            console.error("Invalid quantity input")
            return
        }

        const existingProductIndex = selectedProducts.findIndex(selected => selected.product.id === product.id)
        if (existingProductIndex !== -1) {
            const updatedSelectedProducts = [...selectedProducts]
            updatedSelectedProducts[existingProductIndex].quantity = quantity 
            setSelectedProducts(updatedSelectedProducts)
        } else {
            setSelectedProducts([...selectedProducts, { product, quantity }])
        }
    }

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const surgeryDate = form.surgeryDate.value
        const name = form.name.value
        const productIds = selectedProducts.reduce((ids, { product, quantity }) => {
            for (let i = 0; i < quantity; i++) {
                ids.push(product.id)
            }

            return ids
        }, [])

        const type = form.type.value
        const hospital = form.hospital.value
        const note = form.note.value

        logic.createSurgery(surgeryDate, name, productIds, type, hospital, note)
            .then(() => {
                form.reset()
                onSurgeryCreated()
            })
            .catch(error => {
                showFeedback(error, 'error')
            })
    }

    const handleProductsClick = () => onProductsClick()

    const currentDate = new Date()
    const minDate = currentDate.toISOString().slice(0, 16)

    logger.debug('CreateSurgery -> render')

    return (
        <section className="bg-[#D1EFFA] flex justify-center w-screen">
            <form onSubmit={handleSubmit} className="w-[300px] flex flex-col space-y-2">
                <label className="text-lg font-semibold" htmlFor="surgeryDate">Surgery Date</label>
                <input className="border border-blue-400 rounded px-3 py-2" type="datetime-local" id="surgeryDate" min={minDate} />

                <label className="text-lg font-semibold" htmlFor="name">Surgery Name</label>
                <input className="border border-blue-400 rounded px-3 py-2" type="text" id="name" />

                <label className="text-lg font-semibold" htmlFor="products">Products</label>
                {products.map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                        <label htmlFor={`product-${product.id}`} className="uppercase mr-2">{product.name}</label>
                        <input
                            type="number"
                            id={`product-${product.id}`}
                            min="0"
                            defaultValue="0"
                            onChange={event => handleProductChange(event, product)}
                            className="border border-blue-400 rounded px-2 py-1 w-16 text-center"
                        />
                    </div>
                ))}
                <div className="border border-blue-400 rounded p-2">
                    <h2 className="text-lg font-semibold mb-2">Selected Products</h2>
                    {selectedProducts.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center justify-between">
                            <span className="mr-2">{product.name}</span>
                            <span className="font-semibold">{quantity}</span>
                        </div>
                    ))}
                </div>
                {/* <button className="rounded-[5px] border-[1px] border-black my-[10px] p-2 bg-[#83d3f5] font-bold py-2 hover:bg-blue-400 transition duration-300" onClick={handleProductsClick}>Go to products list</button> */}

                <label className="text-lg font-semibold" htmlFor="type">Type</label>
                <input className="border border-blue-400 rounded px-3 py-2" type='text' id="type" />

                <label className="text-lg font-semibold" htmlFor="hospital">Hospital</label>
                <input className="border border-blue-400 rounded px-3 py-2" type="text" id="hospital" />

                <label className="text-lg font-semibold" htmlFor="note">Note</label>
                <input className="border border-blue-400 rounded px-3 py-2" type="text" id="note" />
                

                <SubmitButton className="bg-blue-100 text-white font-semibold py-2 rounded hover:bg-blue-200 transition duration-300">Create</SubmitButton>
                <CancelButton
                    className="mt-4 bg-blue-300 text-blue-800 font-semibold py-2 rounded hover:bg-blue-400 transition duration-300"
                    onClick={onCancelClick}
                    
                />
                
            </form>
        </section>
    )
}

export default CreateSurgery