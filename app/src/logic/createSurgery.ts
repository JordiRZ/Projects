//@ts-nocheck

import { validate, errors } from 'com'

function createSurgery(surgeryDate: string, name: string, products: string[], type: string, hospital: string, note: string) {
    validate.text(name, 'name')
    validate.text(type, 'type')
    validate.text(hospital, 'hospital')


    if (note)
        validate.text(note, 'note')
    validate.text(surgeryDate, 'surgeryDate')
    validate.token(sessionStorage.token)

    const surgery = { surgeryDate, name, products, type, hospital, note }

    const json = JSON.stringify(surgery)

    return fetch(`${import.meta.env.VITE_API_URL}/surgeries`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) {
                return

            } else {
                return res.json()
                    .then(body => {
                        const { error, message } = body

                        const constructor = errors[error]

                        throw new constructor(message)
                    }
                    )
            }
        })

}


export default createSurgery