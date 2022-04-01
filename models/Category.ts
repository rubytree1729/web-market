import mongoose, { model, Schema } from 'mongoose';

export interface category {
    category1: string,
    category2: Array<string>
}
const categorySchema = new Schema<category>({
    category1: String,
    category2: [String]
})

const Category = mongoose.models['category'] ? model<category>('category') : model<category>('category', categorySchema, 'category')
export default Category