import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: String,
    code: {
        type: String,
        unique: true,
        required: true
    },
    category: String,
    price: Number,
    stock: {
        type: Number,
        required: true,
        default: 0
    }
});

const productModel = model('products', productSchema);

export { productModel };
