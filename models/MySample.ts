import mongoose, { model, Schema } from 'mongoose';

export interface mySample {
    name: String,
    done?: Boolean,
    description: String
}
const mySampleSchema = new Schema<mySample>({
    name: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true }
})
const MySample = mongoose.models['mysession'] ? model<mySample>('mysession') : model<mySample>('mysession', mySampleSchema, 'mysession') // 스키마로부터 생성된 모델 객체
export default MySample
