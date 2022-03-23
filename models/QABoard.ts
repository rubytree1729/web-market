import mongoose, { model, Schema } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);


export interface qaBoard {
    // qaid: number, AutoIncrement로 추가됨
    answer?: boolean,
    qacategory: string,
    title: string,
    content: string,
    userid: string,
    date: Date
}

//     get: userid = key
const qaBoardSchema = new Schema<qaBoard>({
    // qaid: { type: Number, required: true, unique: true },
    answer: { type: Boolean },
    qacategory: { type: String, required: true, }, //"교환", 환불, 배송, 상품문의, 주문취소, 주문/결제, 이벤트
    title: { type: String, required: true },
    content: { type: String, required: true },
    userid: { type: String, required: true },
    date: { type: Date, required: true }
})
if (!mongoose.models['qaBoard']) {
    qaBoardSchema.plugin(AutoIncrement, { id: "qaid", inc_field: "qaid" })
}
const QABoard = mongoose.models['qaBoard'] ? model<qaBoard>('qaBoard') : model<qaBoard>('qaBoard', qaBoardSchema, 'qaBoard')
export default QABoard