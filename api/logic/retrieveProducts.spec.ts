import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect, use } from 'chai'
import { errors } from 'com'
import chaiAsPromised from 'chai-as-promised'

const { Types: { ObjectId } } = mongoose

dotenv.config()

const { NotFoundError, ContentError } = errors

use(chaiAsPromised)

describe('retrieveProducts', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when you get all your products', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then(user =>
                                        Promise.all([
                                            Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 }),
                                            Product.create(
                                                { name: 'cervical cage', type: 'implant', surgeryType: 'cervical anterior', image: 'Image URL 2', description: 'Description', price: 100 }),
                                            Product.create(
                                                { name: 'Screwdriver', type: 'Instrument', surgeryType: 'cervical anterior', image: 'Image URL 3', description: 'Description', price: 50 }),
                                            Product.create(
                                                { name: 'Cobb', type: 'Instrument', surgeryType: 'lumbar posterior', image: 'Image URL 4', description: 'Description', price: 70 })

                                        ])

                                            .then(([product1, product2, product3, product4]) =>
                                                logic.retrieveProducts(user.id)
                                                    .then(products => {
                                                        expect(products).to.have.lengthOf(4)

                                                        const product1b = products.find(product => product.name === product1.name)


                                                        expect(product1b.name).to.equal(product1.name)
                                                        expect(product1b.type).to.equal(product1.type)
                                                        expect(product1b.surgeryType).to.equal(product1.surgeryType)
                                                        expect(product1b.image).to.equal(product1.image)
                                                        expect(product1b.price).to.equal(product1.price)
                                                        expect(product1b.description).to.equal(product1.description)


                                                        const product2b = products.find(product => product.name === product2.name)

                                                        expect(product2b.name).to.equal(product2.name)
                                                        expect(product2b.type).to.equal(product2.type)
                                                        expect(product2b.surgeryType).to.equal(product2.surgeryType)
                                                        expect(product2b.image).to.equal(product2.image)
                                                        expect(product2b.price).to.equal(product2.price)
                                                        expect(product2b.description).to.equal(product2.description)

                                                        const product3b = products.find(product => product.name === product3.name)

                                                        expect(product3b.name).to.equal(product3.name)
                                                        expect(product3b.type).to.equal(product3.type)
                                                        expect(product3b.surgeryType).to.equal(product3.surgeryType)
                                                        expect(product3b.image).to.equal(product3.image)
                                                        expect(product3b.price).to.equal(product3.price)
                                                        expect(product3b.description).to.equal(product3.description)


                                                        const product4b = products.find(product => product.name === product4.name)

                                                        expect(product4b.name).to.equal(product4.name)
                                                        expect(product4b.type).to.equal(product4.type)
                                                        expect(product4b.surgeryType).to.equal(product4.surgeryType)
                                                        expect(product4b.image).to.equal(product4.image)
                                                        expect(product4b.price).to.equal(product4.price)
                                                        expect(product4b.description).to.equal(product4.description)
                                                    })
                                            )
                                    )
                            )
                    )
            )
    )
    it('fails when UserId is not found', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '123qwq123' })
                                    .then(user =>
                                        Promise.all([
                                            Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 }),
                                            Product.create(
                                                { name: 'cervical cage', type: 'implant', surgeryType: 'cervical anterior', image: 'Image URL 2', description: 'Description', price: 100 }),
                                            Product.create(
                                                { name: 'Screwdriver', type: 'Instrument', surgeryType: 'cervical anterior', image: 'Image URL 3', description: 'Description', price: 50 }),
                                            Product.create(
                                                { name: 'Cobb', type: 'Instrument', surgeryType: 'lumbar posterior', image: 'Image URL 4', description: 'Description', price: 70 })
                                        ])
                                            .then(([product1, product2, product3, product4]) =>
                                                expect(logic.retrieveProducts(new ObjectId().toString())).to.be.rejectedWith(NotFoundError, 'user not found')
                                                    
                                            )
                                    )
                            )
                    )
            )
    )

    it('fails on non string userId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.retrieveProducts(123)
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
            logic.retrieveProducts('')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('userId >< is empty or blank')
    })
    

    after(() => mongoose.disconnect())
})
