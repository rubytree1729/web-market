import mongoose, { model, Schema } from 'mongoose';

export interface loginToken {
    userid: string,
    jti: string,
    ip: string,
    fingerprint: string,
    createdAt?: Date,
    expiredAt: Date
}
const loginTokenSchema = new Schema<loginToken>({
    userid: { type: String, required: true },
    jti: { type: String, required: true, unique: true, index: true },
    ip: { type: String, required: true }, // add validate
    fingerprint: { type: String, required: true },
    createdAt: { type: Date, expires: "30d", default: new Date() },
    expiredAt: { type: Date, required: true }
})
const LoginToken = mongoose.models['loginToken'] ? model<loginToken>('loginToken') : model<loginToken>('loginToken', loginTokenSchema, 'loginToken')
export default LoginToken