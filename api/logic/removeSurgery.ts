//@ts-nocheck
import { validate, errors } from 'com'
import { Surgery, User } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function removeSurgery(surgeryId: string, userId: string): Promise<void> {
    validate.text(surgeryId, 'surgeryId', true)
    validate.text(userId, 'surgeryId', true)

    return Surgery.findOne({ _id: surgeryId })
        .catch(error => { throw new SystemError(error.message) })
        .then(surgery => {
            if (!surgery)
                throw new NotFoundError('surgery not found')

            return User.findById(userId)
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user)
                        throw new NotFoundError('user does not exist')

                    if (surgery.author._id.toString() !== user._id.toString())
                        throw new NotFoundError('surgery does not belong to user')

                    return Surgery.deleteOne({ _id: surgeryId, author: userId })
                        .catch(error => { throw new SystemError(error.message) })
                })

        })
        .catch(error => { throw new SystemError(error.message) })

}
export default removeSurgery