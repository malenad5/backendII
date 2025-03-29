import { Router } from 'express';
import ProductController from '../controllers/products.controller.js';

const router = Router();
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = new ProductController();


router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:pid', getProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

export default router;
