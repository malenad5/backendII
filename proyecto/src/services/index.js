import { UsersDao } from "../models/factory.js";
import { UserRepository } from "./users.repository.js";
import ProductRepository from './products.repository.js';
import { ProductsDao } from '../mongo/products.dao.js';



const usersService = new UserRepository(new UsersDao());
const productService = new ProductRepository(ProductsDao);

export { usersService };
export {productService};