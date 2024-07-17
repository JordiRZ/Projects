import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { CredentialsError, NotFoundError } = errors

describe('authenticateUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds on existing user and correct credentials', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(user =>
                logic.authenticateUser('equipo@clavel.com', '1Z')
                    .then(user => {
                        expect(user.userId).to.be.a('string')
                    })
            )
    )
    it('fails on existing email and incorrect password', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(() => logic.authenticateUser('equipo@clavel.com', '1ZZ'))
            .catch(error => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal('wrong password')
            })
    )
    it('fails on existing user and incorrect name', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z' }))
            .then(() => logic.authenticateUser('timaes@clavel.com', '1Z'))
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user not found')
            })
    )
    it('fails on non-valid password', () => {
        let errorThrown

        try {
            logic.authenticateUser('equipo@clavel.com', 'I am not a valid password')
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('password is not acceptable')
    })

    after(() => mongoose.disconnect())
})

