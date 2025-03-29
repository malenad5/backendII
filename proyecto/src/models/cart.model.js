import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: false }, 
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "products", required: true }, 
            quantity: { type: Number, required: true } 
        }
    ],
    createdAt: { type: Date, default: Date.now }, // Fecha de creación del carrito
    status: { type: String, default: "active", enum: ["active", "completed", "cancelled"] }
});

const cartModel = model("Cart", cartSchema);
export { cartModel };

