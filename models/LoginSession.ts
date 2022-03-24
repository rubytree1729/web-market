import mongoose, { model, Schema } from 'mongoose';

export interface loginSession {
    sessionId: string,
    ip: string,
    expiredDate: Date,
    reqUrl?: string,
    action?: string
}
const loginSessionSchema = new Schema<loginSession>({
    sessionId: { type: String, required: true, unique: true },
    ip: { type: String, required: true }, // add validate
    expiredDate: { type: Date, required: true, expires: 0 }, // add expired
    reqUrl: { type: String },
    action: { type: String }
}, {})
const LoginSession = mongoose.models['loginSession'] ? model<loginSession>('loginSession') : model<loginSession>('loginSession', loginSessionSchema, 'loginSession')
export default LoginSession