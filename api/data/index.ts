import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    email: string
    password: string
}

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

type ProductType = {
    _id: ObjectId
    name: string
    type: string
    surgeryType: string
    image: string
    description: string
    price: number
}

const product = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    surgeryType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

type SurgeryType = {
    _id: ObjectId
    author: ObjectId
    creationDate: Date
    surgeryDate: Date
    name: string
    products: ObjectId[]
    type: string
    hospital: string
    note: string
}

const surgery = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    surgeryDate: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    products: [
        {
            type: ObjectId,
            ref: 'Product'
        }
    ],
    type: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    }, note: {
        type: String,
    }
})

const User = model<UserType>('User', user)
const Product = model<ProductType>('Product', product)
const Surgery = model<SurgeryType>('Surgery', surgery)


export {
    UserType,
    User,
    ProductType,
    Product,
    Surgery,
    SurgeryType
}






