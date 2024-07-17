//@ts-nocheck

import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import Confirm from './Confirm'

import { useContext } from '../context'

import moment from 'moment'

function Surgery({ item: surgery, onEditClick, onDeleted, surgeryShow }) {
    const { showFeedback, showConfirm } = useContext()
    // && Date.now() > surgery.surgeryDate
    const handleDeleteClick = surgeryId =>
        showConfirm('Are you sure to delete the surgery?', (confirmed) => {
            if (confirmed) {
                try {
                    logic.removeSurgery(surgeryId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
            }
        })

    const handleEditClick = surgery => onEditClick(surgery)

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

    logger.debug('Surgery -> render')

    return <article className="p-4 border rounded-lg shadow-md bg-white mb-4 grid grid-cols-2">
        <div className="col-span-1 pr-4">
            <h2 className="text-lg font-semibold mb-2"><span className="font-bold">{surgery.name}</span></h2>
            <p><span className="font-semibold">Surgery date:</span> <span className="font-bold">{moment(surgery.surgeryDate).format('Do MMMM YYYY, h:mm a')}</span></p>
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
        <div className="col-span-2 flex flex-col justify-center mt-2">
            <button className="bg-sky-200 hover:bg-blue-300 text-blue-700  font-bold py-2 px-4 rounded" onClick={() => handleEditClick(surgery)}>Edit</button>
            <button className="bg-[#ffffff] hover:bg-red-300 text-red-600 font-bold py-2 px-4 rounded" onClick={() => handleDeleteClick(surgery.id)}>Delete</button>
        </div>
    </article>
}

export default Surgery