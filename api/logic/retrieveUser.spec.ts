import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError, ContentError, TypeError } = errors

describe('retrieveUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => logic.retrieveUser(user.id, user2.id))
                    .then(user => {
                        expect(user.name).to.equal('equipo pepas')
                    })
            )

    )

    it('does no retrieve by non-existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => logic.retrieveUser(new ObjectId().toString(), user2.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            )
    )

    it('does no retrieve a non-existing target user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => logic.retrieveUser(user.id, new ObjectId().toString()))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('target user not found')
                    })
            )
    )
    it('fails on non-string userId', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => {
                        //@ts-ignore
                        logic.retrieveUser(123, user2.id)

                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                        expect(error.message).to.equal('userId 123 is not a string')
                    })
            )
    )

    it('fails on empty userId', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => logic.retrieveUser('', user2.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(ContentError)
                        expect(error.message).to.equal('userId >< is empty or blank')
                    })
            )
    )

    it('fails on non-string targetUserId', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => {
                        //@ts-ignore
                        logic.retrieveUser(user.id, 123)
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(TypeError)
                        expect(error.message).to.equal('targetUserId 123 is not a string')
                    })
            )
    )

    it('fails on non-string targetUserId', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                User.create({ name: 'equipo pepas', email: 'equipo@pepas.com', password: '1Z' })
                    .then(user2 => {
                        //@ts-ignore
                        logic.retrieveUser(user.id,'')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(ContentError)
                        expect(error.message).to.equal('targetUserId >< is empty or blank')
                    })
            )
    )
    after(() => mongoose.disconnect())
})