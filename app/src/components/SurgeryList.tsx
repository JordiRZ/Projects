//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import Surgery from './Surgery'

import { useContext } from '../context'

function SurgeryList({ onEditSurgeryClick }) {
    const [surgeries, setSurgeries] = useState([])

    const { showFeedback, stamp } = useContext()

    const loadSurgeries = () => {
        logger.debug('SurgeryList -> loadSurgeries')

        try {
            logic.retrieveSurgeries()
                .then(setSurgeries)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }


    useEffect(( ) => {
        loadSurgeries()
    }, [stamp])

    const handleSurgeryDeleted = () => loadSurgeries()

    const handleEditClick = surgery => onEditSurgeryClick(surgery)

    logger.debug('SurgeryList -> render')

    return <ul>
        {surgeries.map(surgery => (
            <Surgery key={surgery.id} item={surgery} onEditClick={handleEditClick} onDeleted={handleSurgeryDeleted} onClick={() => handleSelectedSurgery(surgery)} />))}
    </ul>
}

export default SurgeryList