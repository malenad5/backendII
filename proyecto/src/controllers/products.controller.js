import { productService } from '../services/index.js';



class ProductController {
    constructor(){
        this.service = productService;
    }

    createProduct = async (req, res, next) => {
        try {
            const result = await this.service.createProduct(req.body);
            res.status(201).json({status: 'success', payload: result}); // 201 Created
        } catch (error) {
            next(error);
        }
    };

    getProducts = async (req, res, next) => {
        try {
            const products = await this.service.getProducts();
            res.status(200).json({status: 'success', payload: products});
        } catch (error) {
            next(error);
        }
    };

    getProduct = async (req, res) => {
        const { pid } = req.params;
        try {
            const product = await this.service.getProduct({_id: pid});
            res.send({status: 'success', payload: product});
        } catch (error) {
            console.log(error);
        }
    };

    updateProduct = async (req, res, next) => {
        try {
            const updatedProduct = await this.service.updateProduct(req.params.pid, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    };

    deleteProduct = async (req, res, next) => {
        try {
            const deletedProduct = await this.service.deleteProduct(req.params.pid);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(204).send(); 
        } catch (error) {
            next(error);
        }
    };
}

export default ProductController;
