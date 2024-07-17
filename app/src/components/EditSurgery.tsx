//@ts-nocheck

import { logger } from '../utils'
import CancelButton from './library/CancelButton'
import logic from '../logic'
import SubmitButton from './library/SubmitButton'
import { useEffect, useState } from 'react'
import { useContext } from '../context'

import moment from 'moment'

function EditSurgery({ surgery, onSurgeryEdited, onCancelClick, onProductsClick }) {
    const { showFeedback } = useContext()
    const [products, setProducts] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [existingProductIds, setExistingProductIds] = useState([])


    useEffect(() => {
        logic.retrieveProducts()
            .then(products => {
                setProducts(products)

                const existingIds = products.map(product => product.id)
                setExistingProductIds(existingIds)

                const initialSelectedProducts = products.map(product => ({
                    product,
                    quantity: surgery.products.filter(initialProduct => initialProduct === product.name).length
                }))

                setSelectedProducts(initialSelectedProducts)
            })
            .catch(error => console.error(error))
    }, [])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const surgeryDate = form.surgeryDate.value
        const name = form.name.value
        const allSelectedProducts = selectedProducts.reduce((allProducts, { product, quantity }) => {
            for (let i = 0; i < quantity; i++) {
                allProducts.push(product)
            }
            return allProducts
        }, [])

        const productIds = allSelectedProducts.map(product => product.id)

        const type = form.type.value
        const hospital = form.hospital.value
        const note = form.note.value

        try {
            logic.updateSurgery(surgery.id, surgeryDate, name, productIds, type, hospital, note)
                .then(() => {

                    form.reset()
                    setSelectedProducts([])
                    onSurgeryEdited()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }


    const currentDate = new Date()
    const minDate = currentDate.toISOString().slice(0, 16)



    const countProducts = (products) => {
        const productCounts = {}

        products.forEach(product => {
            if (productCounts[product]) {
                productCounts[product]++
            } else {
                productCounts[product] = 1
            }
        })

        return productCounts
    }

    const productCounts = countProducts(surgery.products)

    const handleProductChange = (productId, event) => {
        const quantity = parseInt(event.target.value)

        if (isNaN(quantity) || quantity < 0) {
            return
        }

        const updatedSelectedProducts = selectedProducts.map(selectedProduct => {
            if (selectedProduct.product.id === productId) {
                return {
                    ...selectedProduct,
                    quantity: quantity
                }
            }

            return selectedProduct
        })


        setSelectedProducts(updatedSelectedProducts)
    }

    const handleCancelClick = () => onCancelClick()



    logger.debug('EditSurgery -> render')

    return (
        <section className="flex justify-center items-center flex-col">
            <div className="p-4 border rounded-lg shadow-md bg-white mb-4 grid grid-cols-2">
                <div className="col-span-1 pr-4">
                    <h2 className="text-lg font-semibold mb-2"><span className="font-bold">{surgery.name}</span></h2>
                    <p><span className="font-semibold">Surgery date:</span> <span className="font-bold">{moment(surgery.date).format('h:mm a, MMMM Do')}</span></p>
                    <p><span className="font-semibold">Product:</span></p>
                    <ul>
                        {Object.entries(productCounts).map(([product, count]) => (
                            <li className='font-bold' key={product}><span className="font-bold">{product}</span> ({count})</li>
                        ))}
                    </ul>
                    <p><span className="font-semibold">Hospital:</span> <span className="font-bold">{surgery.hospital}</span></p>
                    <p><span className="font-semibold">Type:</span> <span className="font-bold">{surgery.type}</span></p>
                    <p><span className="font-semibold">Creation date:</span> <span className="font-bold">{moment(surgery.creationDate).format('Do MMMM YYYY, h:mm a')}</span></p>
                </div>
                <div className="col-span-1 pl-4 border-l-2 border-blue-200 flex flex-col">
                    <div className="mb-2">
                        <span className="font-semibold">Note:</span> <span className="font-bold">{surgery.note}</span>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="w-[300px] flex flex-col  space-y-2 mb-8">
                <label className="text-lg font-semibold" htmlFor="surgeryDate">Surgery Date</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="datetime-local"
                    id="surgeryDate"
                    min={minDate}
                    defaultValue={surgery.surgeryDate ? moment(surgery.surgeryDate).format('YYYY-MM-DDTHH:mm') : ''}

                />

                <label className="text-lg font-semibold" htmlFor="name">Surgery Name</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="name"
                    defaultValue={surgery.name}

                />

                <label className="text-lg font-semibold" htmlFor="products">Products</label>
                {products.map(product => {
                    const quantityInDatabase = productCounts[product.name] || 0
                    return (
                        <div key={product.id} className="flex items-center justify-between">
                            <label htmlFor={`product-${product.id}`} className="uppercase mr-2">{product.name}</label>
                            <input
                                type="number"
                                id={`product-${product.id}`}
                                min="0"
                                defaultValue={quantityInDatabase}
                                onChange={event => handleProductChange(product.id, event)}
                                className="border border-blue-400 rounded px-2 py-1 w-16 text-center"
                            />
                        </div>
                    )
                })}


                <label className="text-lg font-semibold" htmlFor="type">Type</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="type"
                    defaultValue={surgery.type}

                />

                <label className="text-lg font-semibold" htmlFor="hospital">Hospital</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="hospital"
                    defaultValue={surgery.hospital}

                />

                <label className="text-lg font-semibold" htmlFor="note">Note</label>
                <input
                    className="border border-blue-400 rounded px-3 py-2"
                    type="text"
                    id="note"
                    defaultValue={surgery.note}

                />

                <SubmitButton className="bg-blue-100 text-white py-2 rounded hover:bg-blue-200 transition duration-300 font-bold">Save</SubmitButton>
                <CancelButton onClick={handleCancelClick} />
            </form>
        </section>
    )
}

export default EditSurgery