import dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import logger from './logger.ts'
import { users, surgeries, products } from './routes/index.ts'

dotenv.config()

const { MONGODB_URL, PORT } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.use('/users', users)
        api.use('/surgeries', surgeries)
        api.use('/products', products)

        api.listen(PORT, () => logger.info(`API listening on port ${PORT}`))
    })
    .catch(error => logger.error(error))