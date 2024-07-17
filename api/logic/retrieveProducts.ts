//@ts-nocheck

import { validate, errors } from 'com'
import { Product, User, ProductType } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveProducts(userId: string): Promise<ProductType[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Product.find().lean()
                .catch(error => { throw new SystemError(error.message) })

        })
        .then(products => {
            if (!products) throw new NotFoundError('products not found')

            return products.map<ProductType>(({ _id, name, type, surgeryType, image, description, price }) => ({
                id: _id.toString(),
                name,
                type,
                surgeryType,
                image,
                description,
                price
            }))
        })
}




export default retrieveProducts