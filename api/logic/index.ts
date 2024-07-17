import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import createSurgery from './createSurgery.ts'
import retrieveProducts from './retrieveProducts.ts'
import retrieveSurgeries from './retrieveSurgeries.ts'
import removeSurgery from './removeSurgery.ts'
import updateSurgery from './updateSurgery.ts'




const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    createSurgery,
    retrieveProducts,
    retrieveSurgeries,
    removeSurgery,
    updateSurgery,
   
}

export default logic