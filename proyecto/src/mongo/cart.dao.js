import { cartModel } from "../models/cart.model.js";

class CartsDaoMongo {
    constructor() {
        this.model = cartModel;
    }

    
    create = async (newCart) => {
        try {
            const createdCart = await this.model.create(newCart);
            return createdCart;
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            throw error;
        }
    };


    getById = async (id) => {
        try {
            const cart = await this.model.findById(id).populate("products.productId"); 
            return cart;
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            throw error;
        }
    };

    
    getAll = async () => {
        try {
            const carts = await this.model.find(); 
            return carts;
        } catch (error) {
            console.error("Error al obtener los carritos:", error);
            throw error;
        }
    };


    update = async (id, updatedCart) => {
        try {
            const cart = await this.model.findByIdAndUpdate(id, updatedCart, { new: true });
            return cart;
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            throw error;
        }
    };


    delete = async (id) => {
        try {
            await this.model.findByIdAndDelete(id);
            return { message: "Carrito eliminado correctamente." };
        } catch (error) {
            console.error("Error al eliminar el carrito:", error);
            throw error;
        }
    };
}

export const CartsDao = new CartsDaoMongo();
