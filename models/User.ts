import mongoose, { model, Schema } from 'mongoose';


export interface fulladdress {
    zonecode: string,
    address: string,
    addressdetail: string
}

export interface user {
    id: string,
    password: string,
    role: string,
    name: string,
    email: string,
    gender: string,
    phonenumber: string,
    fulladdress: fulladdress,
    registerAt: Date,
    likelist: Array<string>
}

const userSchema = new Schema<user>({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // add validate
    role: { type: String, default: "user" },
    name: { type: String, required: true },
    email: { type: String, required: true }, // add validate,
    gender: { type: String, required: true },
    phonenumber: { type: String, required: true },
    fulladdress: {
        zonecode: { type: String, required: true },
        address: { type: String, required: true },
        addressdetail: { type: String, required: true }
    },
    registerAt: { type: Date, default: new Date() },
    likelist: { type: [Number], default: [] }
})
const User = mongoose.models['user'] ? model<user>('user') : model<user>('user', userSchema, 'user')
export default User