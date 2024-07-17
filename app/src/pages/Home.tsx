//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'

import CreateSurgery from '../components/CreateSurgery'
import SurgeryList from '../components/SurgeryList'
import Surgery from '../components/Surgery'
import EditSurgery from '../components/EditSurgery'
import Products from '../components/Products'
import ProductsList from '../components/ProductsList'
import Navbar from '../components/NavBar'

import { Routes, Route } from 'react-router-dom'
import Profile from '../components/Profile'

import { useContext } from '../context'


function Home({ onUserLoggedOut, onCancelClick }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState('surgeryList')
    const [surgery, setSurgery] = useState(null)
    

    const { showFeedback, stamp, setStamp } = useContext()

    const onLogout = () => onUserLoggedOut()

    const onCancelSurgeryClick = () => setView('surgeryList')

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView('null')

    const handleSurgeryCreated = () => {
        clearView()
        setStamp(Date.now())
        setView('surgeryList')
    }


    const handleEditSurgeryClick = surgery => {
        setView('edit-surgery')
        setSurgery(surgery)
    }

    const handleSurgeryEdited = () => {
        clearView()
        setStamp(Date.now())
        setView('surgeryList')
    }
    const handleReturnToSurgeriesClick = () => {
        setView('surgeryList')
    }

    const handleProductsListClick = () => {
        setView('show-productsList')
    }

    const handleCreateSurgeryClick = () => {
        setView('create-surgery')
    }

    const handleShowProductsList = () => setView('show-productsList')

    const handleShowSurgeryList = () => setView('show-surgeryList')

    const handleEditSurgeryCancelClick = () => setView('surgeryList')

    const handleViewProductsList = () => setView('show-productsList')

    logger.debug('Home -> render')

    return <>

        <div className="bg-[#D1EFFA] flex flex-col h-screen w-screen">
            <div className="">

                <Navbar onUserLoggedOut={onLogout} showProductsList={handleShowProductsList} showSurgeriesList={handleShowSurgeryList} showProductsListClick={handleProductsListClick} returnToSurgeriesClick={handleReturnToSurgeriesClick} createSurgeryClick={handleCreateSurgeryClick} />
            </div>
            <main className="flex flex-col items-center my-[40px] px-[5vw] bg-[#D1EFFA] rounded-sm">

                <div className="">

                    {view === 'create-surgery' && <CreateSurgery onProductsClick={handleViewProductsList} onCancelClick={onCancelSurgeryClick} onSurgeryCreated={handleSurgeryCreated} />}

                    {view === 'surgeryList' && <SurgeryList stamp={stamp} onEditSurgeryClick={handleEditSurgeryClick} />}

                    {view === 'show-productsList' && <ProductsList onProductsList={handleShowProductsList} stamp={stamp} />}

                    {view === 'edit-surgery' && <EditSurgery surgery={surgery} onCancelClick={handleEditSurgeryCancelClick} onSurgeryEdited={handleSurgeryEdited} />}

                </div>
            </main>
        </div>
    </>
}

export default Home