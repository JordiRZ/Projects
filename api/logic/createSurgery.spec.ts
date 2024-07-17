import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { Surgery, User, Product } from '../data/index.ts'

import logic from './index.ts'
import { expect, use } from 'chai'
import { errors } from 'com'
import chaiAsPromised from 'chai-as-promised'

const { Types: { ObjectId } } = mongoose

dotenv.config()

use(chaiAsPromised)

const { NotFoundError, ContentError } = errors

describe('createSurgery', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when a surgery is created while authorId matches with the surgery author, also productsId from frontend matches with products from your DB) ', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                // const currentDate = new Date()
                                                // const formattedDate = currentDate.toISOString().slice(0, 10)
                                                // formattedDate.toString()
                                                logic.createSurgery(user.id, product.id, '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')
                                                    .then(() =>
                                                        Surgery.findOne({})
                                                            .then(surgery => {
                                                                expect(surgery.author.toString()).to.equal(user.id)
                                                                expect(surgery.creationDate).to.be.instanceOf(Date)
                                                                expect(surgery.surgeryDate).to.be.instanceOf(Date)
                                                                expect(surgery.name).to.equal('Lumbar Posterior Artrodesis')
                                                                expect(surgery.author.toString()).to.equal(product.id)
                                                                expect(surgery.type).to.equal('Lumbar Posterior')
                                                                expect(surgery.hospital).to.equal('hospital')
                                                                expect(surgery.note).to.equal('we need more implants')
                                                            })
                                                    )
                                            })
                                    )
                            )
                    )
            )
    )
    it('fails when userId is not matching with authorId', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                expect(logic.createSurgery(new ObjectId().toString(), product.id, '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')).to.be.rejectedWith(NotFoundError, 'user not found')
                                            })
                                    )
                            )
                    )
            )
    )
    it('fails when the productId is not matching with the products in your DB', () =>
        User.deleteMany()
            .then(() =>
                Product.deleteMany()
                    .then(() =>
                        Surgery.deleteMany()
                            .then(() =>
                                User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' })
                                    .then((user) =>
                                        Product.create({ name: 'lumbar cage', type: 'implant', surgeryType: 'lumbar posterior', image: 'Image URL 1', description: 'Description', price: 200 })
                                            .then((product) => {
                                                expect(logic.createSurgery(user.id, [new ObjectId().toString()], '24/05/12', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')).to.be.rejectedWith(NotFoundError, ' not found')
                                            })
                                    )
                            )
                    )
            )
    )
    it('fails on non string surgery name', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', 123, 'Lumbar posterior', 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('name 123 is not a string')
    })
    it('fails on empty surgery name', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', '', 'Lumbar posterior', 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })
    it('fails on non string surgery type', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', 123, 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('type 123 is not a string')
    })
    it('fails on empty surgery type', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', '', 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('type >< is empty or blank')
    })
    it('fails on non string hospital', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 123, 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('hospital 123 is not a string')
    })
    it('fails on empty hospital', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', 'lumbar', '', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('hospital >< is empty or blank')
    })
    it('fails on non string surgery note', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 123)
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('note 123 is not a string')
    })
    it('fails on non string userId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(123, [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')
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
            logic.createSurgery('', [new ObjectId().toString()], '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('userId >< is empty or blank')
    })
    it('fails on non string productsIds', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [123,123], '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('productsIds[i] 123 is not a string')
    })
    it('fails on empty productsIds', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.createSurgery(new ObjectId().toString(), [''], '2024-05-10', 'Lumbar Posterior Artrodesis', 'Lumbar posterior', 'hospital', 'we need more implants')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('productsIds[i] >< is empty or blank')
    })
    after(() => mongoose.disconnect())
})
