import { productModel } from "../models/products.model.js";

class ProductDaoMongo {
    constructor() {
        this.model = productModel; 
    }

    get = async () => await this.model.find(); 
    create = async (newProduct) => await this.model.create(newProduct); 
    getBy = async (filterObject) => await this.model.findOne(filterObject); 
    update = async (pid, productToUpdate) => await this.model.findByIdAndUpdate(
        { _id: pid },
        productToUpdate,
        { new: true }
    ); 
    delete = async (pid) => await this.model.findByIdAndDelete({ _id: pid });

    
    getById = async (id) => {
        try {
            const product = await this.model.findById(id); 
            return product; 
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
            throw error; 
        }
    };
}

export const ProductsDao = new ProductDaoMongo(); 
