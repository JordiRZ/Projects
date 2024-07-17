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

const { NotFoundError, ContentError } = errors

describe('updateSurgery', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('should update surgery with valid data', () => {
        User.deleteMany()
            .then(() => Product.deleteMany())
            .then(() => Surgery.deleteMany())
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                return Product.create({ name: 'Test Product', type: 'test', surgeryType: 'test', image: 'test.jpg', description: 'Test description', price: 10 })
                    .then(product => {
                        return Surgery.create({ author: user.id, surgeryDate: new Date(), name: 'Test Surgery', products: [product.id], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
                            .then(surgery => {
                                const updatedSurgeryDate = '5/2/2024, 1:00:00'
                                const updatedName = 'Updated Surgery'
                                const updatedType = 'Updated Type'
                                const updatedHospital = 'Updated Hospital'
                                const updatedNote = 'Updated note'

                                return logic.updateSurgery(surgery.id, user.id, [product.id], updatedSurgeryDate, updatedName, updatedType, updatedHospital, updatedNote)
                                    .then(() => Surgery.findById(surgery.id))
                                    .then(updatedSurgery => {
                                        expect(updatedSurgery.surgeryDate).to.be.instanceOf(Date)
                                        expect(updatedSurgery.name).to.equal(updatedName)
                                        expect(updatedSurgery.type).to.equal(updatedType)
                                        expect(updatedSurgery.hospital).to.equal(updatedHospital)
                                        expect(updatedSurgery.note).to.equal(updatedNote)
                                        expect(updatedSurgery.products.map(product => product.toString())).to.include(productId)
                                    })
                            })
                    })
            })

    })
    it('should throw NotFoundError when surgeryId does not exist', () => {
        User.deleteMany()
            .then(() => Product.deleteMany())
            .then(() => Surgery.deleteMany())
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                return Product.create({ name: 'Test Product', type: 'test', surgeryType: 'test', image: 'test.jpg', description: 'Test description', price: 10 })
                    .then(product => {
                        return Surgery.create({ author: user.id, surgeryDate: new Date(), name: 'Test Surgery', products: [product.id], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
                            .then(surgery => {
                                const updatedSurgeryDate = '5/2/2024, 1:00:00'
                                const updatedName = 'Updated Surgery'
                                const updatedType = 'Updated Type'
                                const updatedHospital = 'Updated Hospital'
                                const updatedNote = 'Updated note'

                                return logic.updateSurgery(new ObjectId().toString(), user.id, [product.id], updatedSurgeryDate, updatedName, updatedType, updatedHospital, updatedNote).to.be.rejectedWith(NotFoundError, 'surgeryId not found')
                                    
                            })
                    })
            })

    })
    it('should throw NotFoundError when userId does not match surgery author', () => {
        User.deleteMany()
            .then(() => Product.deleteMany())
            .then(() => Surgery.deleteMany())
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                return Product.create({ name: 'Test Product', type: 'test', surgeryType: 'test', image: 'test.jpg', description: 'Test description', price: 10 })
                    .then(product => {
                        return Surgery.create({ author: user.id, surgeryDate: new Date(), name: 'Test Surgery', products: [product.id], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
                            .then(surgery => {
                                const updatedSurgeryDate = '5/2/2024, 1:00:00'
                                const updatedName = 'Updated Surgery'
                                const updatedType = 'Updated Type'
                                const updatedHospital = 'Updated Hospital'
                                const updatedNote = 'Updated note'

                                return logic.updateSurgery(surgery.id, new ObjectId().toString(), [product.id], updatedSurgeryDate, updatedName, updatedType, updatedHospital, updatedNote).to.be.rejectedWith(NotFoundError, 'userId not found')
                                    
                            })
                    })
            })

    })
    it('fails when the productId is not matching with the products in your DB', () => {
        User.deleteMany()
            .then(() => Product.deleteMany())
            .then(() => Surgery.deleteMany())
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user => {
                return Product.create({ name: 'Test Product', type: 'test', surgeryType: 'test', image: 'test.jpg', description: 'Test description', price: 10 })
                    .then(product => {
                        return Surgery.create({ author: user.id, surgeryDate: new Date(), name: 'Test Surgery', products: [product.id], type: 'test', hospital: 'Test Hospital', note: 'Test note' })
                            .then(surgery => {
                                const updatedSurgeryDate = '5/2/2024, 1:00:00'
                                const updatedName = 'Updated Surgery'
                                const updatedType = 'Updated Type'
                                const updatedHospital = 'Updated Hospital'
                                const updatedNote = 'Updated note'

                                return logic.updateSurgery(surgery.id, user.id, [new ObjectId().toString()], updatedSurgeryDate, updatedName, updatedType, updatedHospital, updatedNote).to.be.rejectedWith(NotFoundError, 'productsIds not found')
                                
                            })
                    })
            })
    })
    it('fails on non string surgery name', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00',123, 'Updated Type', 'Updated Hospital', 'Updated note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','', 'Updated Type', 'Updated Hospital', 'Updated note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 123, 'Updated Hospital', 'Updated note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', '', 'Updated Hospital', 'Updated note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 123, 'Updated note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', '', 'Updated note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 123)
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
            logic.updateSurgery(new ObjectId().toString(),123, [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 'Updated Note')
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
            logic.updateSurgery(new ObjectId().toString(),'', [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 'Updated Note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [123,123], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 'Updated Note')
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
            logic.updateSurgery(new ObjectId().toString(),new ObjectId().toString(), [''], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 'Updated Note')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('productsIds[i] >< is empty or blank')
    })
    it('fails on non string surgeryId', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.updateSurgery(123,new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 'Updated Note')
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
            logic.updateSurgery('',new ObjectId().toString(), [new ObjectId().toString()], '5/2/2024, 1:00:00','Updated Name', 'Updated Type', 'Updated Hospital', 'Updated Note')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal('surgeryId >< is empty or blank')
    })
    after(() => mongoose.disconnect())
})