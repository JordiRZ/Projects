//@ts-nocheck

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { expect, use } from 'chai'
import { errors } from 'com'
import chaiAsPromised from 'chai-as-promised'

const { Types: { ObjectId } } = mongoose

dotenv.config()

use(chaiAsPromised)

import logic from './index.ts'
import { Surgery, User, Product } from '../data/index.ts'

const { ContentError } = errors

describe('removeSurgery', () => {


    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('removes a surgery from existing user', () =>
        User.deleteMany()
            .then(() =>
                Surgery.deleteMany()
                    .then(() =>
                        Product.deleteMany()

                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then(product =>
                                                Surgery.create({ author: user.id, creationDate: 1 / 5 / 2024, surgeryDate: 2 / 5 / 2024, name: 'kilombo', products: [product.id], type: 'lumbar', hospital: 'quiron', note: 'kilombo does not works at all' })
                                                    .then(surgery => {

                                                        return logic.removeSurgery(surgery.id, user.id)
                                                    })
                                                    .then(() => Surgery.find({}))
                                                    .then(surgery => {
                                                        expect(surgery).to.deep.equal([])
                                                    })
                                            )
                                    ))
                    )
            ))
    // it('fails on non string userId', () => {
    //     let errorThrown

    //     try {
    //         // @ts-ignore
    //         logic.removeSurgery(new ObjectId().toString(),123)
    //     } catch (error) {
    //         errorThrown = error
    //     }

    //     expect(errorThrown).to.be.instanceOf(TypeError)
    //     expect(errorThrown.message).to.equal('userId 123 is not a string')
    // })
    // it('fails on empty userId', () => {
    //     let errorThrown

    //     try {
    //         // @ts-ignore
    //         logic.removeSurgery(new ObjectId().toString(),'')
    //     } catch (error) {
    //         errorThrown = error
    //     }

    //     expect(errorThrown).to.be.instanceOf(ContentError)
    //     expect(errorThrown.message).to.equal('userId >< is empty or blank')
    // })

    // it('fails when surgeryId is not found', () =>
    //     User.deleteMany()
    //         .then(() =>
    //             Surgery.deleteMany()
    //                 .then(() =>
    //                     Product.deleteMany()

    //                         .then(() =>
    //                             User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '123qwe123' })
    //                                 .then((user) =>
    //                                     Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
    //                                         .then(product =>
    //                                             Surgery.create({ author: user.id, creationDate: new Date(),surgeryDate: new Date(), name: 'Test Surgery', products: [product.id], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
    //                                                 .then(surgery => {
    //                                                     return logic.removeSurgery(new ObjectId().toString(), user.id).to.be.rejected(NotFoundError, 'surgeryId not found')
    //                                                 })

    //                                         )
    //                                 ))
    //                 )
    //         ))
    // it('fails when userId is not found', () =>
    //     User.deleteMany()
    //         .then(() =>
    //             Surgery.deleteMany()
    //                 .then(() =>
    //                     Product.deleteMany()

    //                         .then(() =>
    //                             User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
    //                                 .then((user) =>
    //                                     Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
    //                                         .then(product =>
    //                                             Surgery.create({ author: user.id, creationDate: 1 / 5 / 2024, surgeryDate: 2 / 5 / 2024, name: 'kilombo', products: [product.id], type: 'lumbar', hospital: 'quiron', note: 'kilombo does not works at all' })
    //                                                 .then(surgery => {
    //                                                     return logic.removeSurgery(surgery.id, new ObjectId().toString()).to.be.rejectedWith(NotFoundError, 'userId not found')
    //                                                 })

    //                                         )
    //                                 ))
    //                 )
    //         ))
    it('fails on non string surgeryId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.removeSurgery(123, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('surgeryId 123 is not a string')
    })
    it('fails on empty surgeryId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.removeSurgery('', new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('surgeryId >< is empty or blank')
    })
    after(() => mongoose.disconnect())
})