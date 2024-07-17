//@ts-nocheck

import { validate, errors } from 'com'
import { Surgery, User } from '../data/index.ts'
import mongoose from 'mongoose'

const { SystemError, NotFoundError } = errors

function updateSurgery(surgeryId: string, userId: string, productsIds: string[], surgeryDate: string, name: string, type: string, hospital: string, note: string): Promise<void> {
    validate.text(surgeryId, 'surgeryId', true)
    validate.text(userId, 'userId', true)
    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')
    validate.text(surgeryDate, 'surgeryDate')
    for (let i = 0; i < productsIds.length; i++) {
        validate.text(productsIds[i], 'productsIds[i]')
    }
    if (note)
        validate.text(note, 'note')
    
    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Surgery.findById(surgeryId)
                .catch(error => { throw new SystemError(error.message) })
                .then(surgery => {
                    if (!surgery)
                        throw new NotFoundError('surgery not found')

                    const productIdsFormatted = productsIds.map(productId => new mongoose.Types.ObjectId(productId))

                    const formattedDate = new Date(surgeryDate)

                    return Surgery.findByIdAndUpdate(
                        surgeryId,
                        {
                            $set: {
                                products: productIdsFormatted,
                                surgeryDate: formattedDate,
                                name,
                                type,
                                hospital,
                                note
                            }
                        },
                        { new: true } 
                    )
                    .then(updatedSurgery => {
                        if (!updatedSurgery) {
                            throw new SystemError('Error updating surgery')
                        }
                    })
                    .catch(error => { throw new SystemError(error.message) })
                })
        })

        .then(() => { })
}

export default updateSurgery