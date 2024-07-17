

import { validate, errors } from 'com'


import { User, Surgery } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

import mongoose from 'mongoose'


function createSurgery(userId: string, productsIds: string[], surgeryDate: string, name: string, type: string, hospital: string, note: string): Promise<void> {

    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(userId, 'userId', true)
    for (let i = 0; i < productsIds.length; i++){
        validate.text (productsIds[i], 'productsIds[i]')
    }
    if (note)
        validate.text(note, 'note')
    validate.text(surgeryDate, 'surgeryDate')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const productIdsFormatted = productsIds.map(productId => new mongoose.Types.ObjectId(productId))

            const formattedDate = new Date(surgeryDate)

            const newSurgery = {
                author: user._id,
                products: productIdsFormatted,
                creationDate: new Date(),
                surgeryDate: formattedDate,
                name,
                type,
                hospital,
                note
            }


            return Surgery.create(newSurgery)
                .catch(error => { throw new SystemError(error.message) })


        })
        .then(surgery => { })

}


export default createSurgery











