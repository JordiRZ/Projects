import express from 'express'

import {
    registerUserHandler,
    authenticateUserHandler,
    retrieveUserHandler,

    createSurgeryHandler,
    removeSurgeryHandler,
    retrieveSurgeriesHandler,
    updateSurgeryHandler,

    retrieveProductsHandler,
} from './handlers/index.ts'

const { Router, json } = express

const products = Router()
const users = Router()
const surgeries = Router()

const jsonBodyParser = json()

users.post('/auth', jsonBodyParser, authenticateUserHandler)
users.post('/', jsonBodyParser, registerUserHandler)
users.get('/:targetUserId', retrieveUserHandler)

products.get('/', retrieveProductsHandler)

surgeries.post('/', jsonBodyParser, createSurgeryHandler)
surgeries.get('/', retrieveSurgeriesHandler)
surgeries.delete('/:id', removeSurgeryHandler)
surgeries.put('/:id',jsonBodyParser, updateSurgeryHandler)



export {
    users,
    surgeries,
    products
}   

        

        

       

      

  