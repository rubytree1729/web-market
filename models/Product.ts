import mongoose, { model, Schema } from 'mongoose';

export interface product {
    id: number,
    name: string,
    price: number,
    category1: string,
    category2: string,
    category3?: string,
    category4?: string,
    imageUrl: string,
    description?: string,
    mallName: string,
    maker: string,
    brand: string
}
const productSchema = new Schema<product>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category1: { type: String, required: true },
    category2: { type: String, required: true },
    category3: { type: String },
    category4: { type: String },
    imageUrl: { type: String },
    description: { type: String, trim: true },
    mallName: { type: String },
    maker: String,
    brand: String,
})
const Product = mongoose.models['product'] ? model<product>('product') : model<product>('product', productSchema, 'product')
export default Product