//@ts-nocheck

import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

import Logo from '../../../doc/images/Innospine.png'

function Login({ onUserLoggedIn, onRegisterClick }) {
  const { showFeedback } = useContext()

  const handleSubmit = event => {
    event.preventDefault()

    const form = event.target

    const email = form.email.value
    const password = form.password.value

    logger.debug('Login -> handleSubmit', email, password)

    try {
      logic.loginUser(email, password)
        .then(() => {
          form.reset()

          onUserLoggedIn()
        })
        .catch(error => showFeedback(error, 'error'))
    } catch (error) {
      showFeedback(error)
    }
  }

  const handleRegisterClick = event => {
    event.preventDefault()

    onRegisterClick()
  }

  logger.debug('Login -> render')

  return (
    <div className='flex justify-center items-center h-screen bg-[#D1EFFA]'>
      <main className='container mx-auto mt-8'>
        <div className='w-full max-w-md mx-auto'>
          <h1 className='text-3xl font-bold text-center mb-4'>INNOSPINE</h1>
          <div className="drop-shadow-2x">
            <img
              className="w-[120px] m-auto"
              src={Logo}
              alt="logo"
            />

          </div>
          <div className='px-4'>
          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">E-mail</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" />
            </div>

            <div className='flex flex-col items-center justify-center pt-4'>
              <button className=" bg-sky-400 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
            </div>
            <div className="text-center">
              <a className='inline-block text-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' href="#" onClick={handleRegisterClick}>Go to Register</a>
            </div>
          </form>
          </div>


        </div>
      </main>
    </div>
  )
}

export default Login