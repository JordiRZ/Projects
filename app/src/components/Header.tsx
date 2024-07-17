//@ts-nocheck
import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

import { useState, useEffect } from 'react'

import Logo from '../../../doc/images/innospine-icon.png'
import BurguerButton from './library/BurguerButton'
import Navbar from './NavBar'



function Header({ onUserLoggedOut, showCreateSurgery }) {
    // const [view, setView] = useState(null)
    // const [user, setUser] = useState(null)
    // const [menuOpen, setMenuOpen] = useState(false)

    // const handleCreateSurgeryClick = () => setView('create-surgery')

    // const handleShowToggleMenu = () => setView('toggle-menu')

    // useEffect(() => {
    //     logic.retrieveUser()
    //         .then(setUser)
    //         .catch(error => showFeedback(error, 'error'))

    // }, [])

    // const handleLogoutClick = () => {
    //     try {
    //         logic.logoutUser()
    //     } catch (error) {
    //         logic.cleanUpLoggedInUserId()
    //     } finally {
    //         onUserLoggedOut()
    //     }
    // }

    // const handleToggleMenu = () => {
    //     setMenuOpen(!menuOpen)
    // }

    // return (
        // <header className="px-[5vw] pb-[5vh]">
            {/* <div className="bg-[#13c4e3] drop-shadow-2x">
            
                <img
                    className="mx-auto w-10"
                    src={Logo}
                    alt="logo"
                />

            </div> */}
            
            
                {/* <div id="app" class="antialiased text-gray-900">
                    <div>
                        <Navbar />
                    </div>
                </div>
             */}


            {/* <nav className={`fixed top-0 right-0 flex flex-col items-end ${menuOpen ? 'visible' : 'hidden'}`}>
                <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border bg-white text-blue-700 font-semibold hover:bg-blue-100 rounded-md shadow-md mb-2" onClick={showCreateSurgery}>Surgery</button>
                <button className="w-full h-[50px] flex justify-center items-center p-[10px] box-border bg-white text-blue-700 font-semibold hover:bg-blue-100 rounded-md shadow-md" onClick={handleLogoutClick}>Logout</button> */}
            {/* </nav> */}
            {/* <BurguerButton handleClick={handleToggleMenu} clicked={menuOpen} /> */}
        // </header>
    // )
}

export default Header