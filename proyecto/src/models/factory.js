import { productModel } from "../models/products.model.js";
import { default as UsersDaoMongo } from "../mongo/users.dao.js";

const UsersDao = UsersDaoMongo;

class ProductDaoMongo {
    constructor(){
        this.model = productModel;
    }

    get = async () => await this.model.find();
    create = async newProduct => await this.model.create(newProduct);
    getBy = async filterObject => await this.model.findOne(filterObject);
    update = async (pid, productToUpdate) => await this.model.findByIdAndUpdate(
        { _id: pid }, 
        productToUpdate, 
        { new: true }
    );
    delete = async pid => await this.model.findByIdAndDelete({ _id: pid });
}

const ProductsDao = new ProductDaoMongo();

export { ProductsDao, UsersDao };















/*import { default as UsersDaoMongo } from "../mongo/users.dao.js";

const UsersDao = UsersDaoMongo;

export { UsersDao };
*/