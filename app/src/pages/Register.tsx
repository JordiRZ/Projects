//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

import Logo from '../../../doc/images/Innospine.png' 

function Register({ onUserRegistered, onLoginClick }) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const confirmedPassword = form.confirm.value

        try {
            logic.registerUser(name, email, password, confirmedPassword)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    logger.debug('Register -> render')

    return <div className='flex justify-center items-center h-screen bg-[#D1EFFA]'>
        <main className=' container mx-auto mt-8'>
            <div className='w-full max-w-md mx-auto px-4'>
                <h1 className='text-3xl font-bold text-center mb-4'>INNOSPINE</h1>
                <div className="drop-shadow-2x">
                <img
                    className="w-[120px] m-auto"
                    src={Logo}
                    alt="logo"
                />

            </div>

                <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-10 pt-6  mb-4'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Name</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="name" />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">E-mail</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="confirm">Confirm password</label>
                        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="confirm" />
                    </div>

                    <div className='flex flex-col items-center justify-center pt-4'>
                        <button className=" bg-sky-400 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button>
                        <a className='inline-block text-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' href="#" onClick={handleLoginClick}>Go to Login</a>
                    </div>




                </form>


            </div>
        </main>
    </div>

}

export default Register