import mongoose, { model, Schema } from 'mongoose';


type fulladdress = {
    zonecode: string,
    address: string,
    addressdetail: string
}

export interface user {
    id: string,
    password: string,
    name: string,
    email: string,
    gender: string,
    phonenumber: string,
    fulladdress: fulladdress
}

const userSchema = new Schema<user>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // add validate
    name: { type: String, required: true },
    email: { type: String, required: true }, // add validate,
    phonenumber: { type: String, required: true },
    fulladdress: {
        zonecode: { type: String, required: true },
        address: { type: String, required: true },
        addressdetail: { type: String, required: true }
    }
})
const User = mongoose.models['user'] ? model<user>('user') : model<user>('user', userSchema, 'user')
export default User