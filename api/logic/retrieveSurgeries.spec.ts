//@ts-nocheck

import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import { errors } from 'com'
import logic from './index.ts'
import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'


const { Types: { ObjectId } } = mongoose
dotenv.config()

use(chaiAsPromised)

const { NotFoundError, ContentError } = errors

describe('retrieveSurgeries', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you get all your surgeries from your DB', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then(user =>
                                        Promise.all([
                                            Surgery.create({ author: user.id, creationDate: '4/2/2024, 1:00', surgeryDate: '5/2/2024, 1:00', name: 'kilombo', products: ['66278dec16f309b63752bc30'], type: 'lumbar', hospital: 'quiron', note: 'kilombo does not works at all' }),
                                            Surgery.create({ author: user.id, creationDate: '4/3/2024,1:00', surgeryDate: '5/3/2024, 2:00', name: 'kilombo2', products: ['66278dec16f309b63752bc30'], type: 'cervical', hospital: 'safa', note: 'kilombo is working properly' })
                                        ])
                                            .then(([surgery1, surgery2]) =>
                                                logic.retrieveSurgeries(user.id)
                                                    .then(surgeries => {

                                                        expect(surgeries).to.have.lengthOf(2)

                                                        const surgery1b = surgeries.find(surgery => surgery.name === surgery1.name)

                                                        expect(surgery1b.author).to.equal(user.id)
                                                        expect(surgery1b.creationDate).to.be.instanceOf(Date)
                                                        expect(surgery1b.surgeryDate).to.be.instanceOf(Date)
                                                        expect(surgery1b.name).to.equal('kilombo')
                                                        expect(surgery1b.type).to.equal('lumbar')
                                                        expect(surgery1b.hospital).to.equal('quiron')
                                                        expect(surgery1b.note).to.equal('kilombo does not works at all')

                                                        const surgery2b = surgeries.find(surgery => surgery.name === surgery2.name)

                                                        expect(surgery2b.author).to.equal(user.id)
                                                        expect(surgery2b.creationDate).to.be.instanceOf(Date)
                                                        expect(surgery2b.surgeryDate).to.be.instanceOf(Date)
                                                        expect(surgery2b.name).to.equal('kilombo2')
                                                        expect(surgery2b.type).to.equal('cervical')
                                                        expect(surgery2b.hospital).to.equal('safa')
                                                        expect(surgery2b.note).to.equal('kilombo is working properly')
                                                    })
                                            )
                                    )
                            )
                    )
            )
    )
    it('fails when userId is not matching with authorId', () =>
        Promise.all([
            User.deleteMany(),
            Surgery.deleteMany()
        ])
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                expect(logic.retrieveSurgeries(new ObjectId().toString())).to.be.rejectedWith(NotFoundError)


            })

    )
    it('fails on non string userId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.retrieveSurgeries(123)
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('userId 123 is not a string')
    })
    it('fails on empty userId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.retrieveSurgeries('')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('userId >< is empty or blank')
    })

    after(() => mongoose.disconnect())
})

