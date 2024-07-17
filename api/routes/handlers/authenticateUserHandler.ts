import logic from '../../logic/index.ts'
import { errors } from 'com'
import jwt from 'jsonwebtoken'
import logger from '../../logger.ts'

const {
    ContentError,
    SystemError,
    TypeError,
    CredentialsError,
    NotFoundError
} = errors

export default (req, res) => {
    try {
        const { email, password } = req.body

        logic.authenticateUser(email, password)
            .then(user => {
                const { JWT_SECRET, JWT_EXP } = process.env
                const { userId} = user
                const token = jwt.sign({ sub: userId}, JWT_SECRET, { expiresIn: JWT_EXP })

                res.json(token)
            })
            .catch(error => {
                if (error instanceof SystemError) {
                    logger.error(error.message)

                    res.status(500).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof CredentialsError) {
                    logger.warn(error.message)

                    res.status(401).json({ error: error.constructor.name, message: error.message })
                } else if (error instanceof NotFoundError) {
                    logger.warn(error.message)

                    res.status(404).json({ error: error.constructor.name, message: error.message })
                }
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof ContentError) {
            logger.warn(error.message)

            res.status(406).json({ error: error.constructor.name, message: error.message })
        } else {
            logger.warn(error.message)

            res.status(500).json({ error: SystemError.name, message: error.message })
        }
    }
}
