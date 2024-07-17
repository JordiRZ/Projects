import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../data/index.ts'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'


dotenv.config()

const { DuplicityError, CredentialsError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds when create a new user', () =>
        User.deleteMany()
            .then(() => logic.registerUser('equipo clavel', 'equipo@clavel.com', '1Z','1Z' ))
            .then(() => User.findOne({ email: 'equipo@clavel.com' }))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.name).to.equal('equipo clavel')
                expect(user.email).to.equal('equipo@clavel.com')
                expect(user.password).to.equal('1Z')
            })
    )

    it('fails on existing users', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z'}))
            .then(() =>
                logic.registerUser('equipo clavel', 'equipo@clavel.com', '1Z', '1Z')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            )
    )

    it('fails on non string name', () => {
        let errorThrown

        try {
            // @ts-ignore
            logic.registerUser(123, 'equipo@clavel.com',  '1Z', '1Z')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('name 123 is not a string')
    })

    it('fails on empty name', () => {
        let errorThrown

        try {
            logic.registerUser('', 'equipo@clavel.com',  '1Z', '1Z')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })
    it('fails on non-valid email', () => {
        let errorThrown

        try {
            logic.registerUser('equipo clavel', 'I am not an email', '1Z', '1Z')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('email I am not an email is not an email')
    })
    it('fails on non-valid password', () => {
        let errorThrown

        try {
            logic.registerUser('equipo clavel', 'equipo@clavel.com', '18', '18')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('password is not acceptable')
    })


    it('fails on non-matching passwords', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'equipo clavel', email: 'equipo@clavel.com', password: '1Z'}))
            .then(() => {
                let errorThrown

                try {
                    logic.registerUser('equipo clavel', 'equipo@clavel.com', '1Z', '1ZZ')
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('passwords do not match')
            })
    )

    after(() => mongoose.disconnect())
})