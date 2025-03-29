import { Router } from 'express';
import { ticketModel } from "../models/ticket.model.js";
import { ProductsDao } from "../mongo/products.dao.js";
import { CartsDao } from "../mongo/cart.dao.js";

const router = Router();
router.post('/:cid/purchase', async (req, res) => {
    try {
        const cartId = req.params.cid; 
        const cart = await CartsDao.getById(cartId); 

        
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado." });
        }

        
        if (cart.products.length === 0) {
            return res.status(400).json({ status: "error", message: "El carrito está vacío. No hay productos para procesar." });
        }

    
        const purchasedProducts = [];
        const failedProducts = [];
        let totalAmount = 0;

        
        for (const item of cart.products) {
            console.log(`Procesando producto con ID: ${item.productId}`);
            const product = await ProductsDao.getById(item.productId);

            if (!product) {
                console.error(`Producto no encontrado: ${item.productId}`);
                failedProducts.push(item.productId); 
                continue; 
            }

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity; 
                await ProductsDao.update(product._id, { stock: product.stock }); 
                purchasedProducts.push(item); 
                totalAmount += product.price * item.quantity; 
            } else {
                failedProducts.push(item.productId); 
            }
        }

    
        const cleanFailedProducts = failedProducts.filter(productId => productId !== null);

        
        if (purchasedProducts.length > 0) {
            const ticket = await ticketModel.create({
                code: `TCK-${Date.now()}`,
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: req.user?.email || "sin-email@example.com" 
            });

            return res.status(200).json({ status: "success", ticket, failedProducts: cleanFailedProducts });
        }

        
        return res.status(400).json({
            status: "error",
            message: "No se pudo completar la compra.",
            failedProducts: cleanFailedProducts
        });

    } catch (error) {
        console.error("Error al procesar la compra:", error.message);
        return res.status(500).json({ status: "error", message: "Error interno del servidor." });
    }


});



router.get("/", async (req, res) => {
    try {
        const carts = await CartsDao.getAll(); 
        res.status(200).json({ status: "success", payload: carts });
    } catch (error) {
        console.error("Error al obtener los carritos:", error);
        res.status(500).json({ status: "error", message: "Error interno al obtener los carritos." });
    }
});


router.post("/:cid/purchase", async (req, res) => {
    try {
        const cartId = req.params.cid; 
        const cart = await CartsDao.getById(cartId); 

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado." });
        }

        if (cart.products.length === 0) {
            return res.status(400).json({ status: "error", message: "El carrito está vacío. No hay productos para procesar." });
        }

        const purchasedProducts = [];
        const failedProducts = [];
        let totalAmount = 0;

        
        for (const item of cart.products) {
            const product = await ProductsDao.getById(item.productId);

            if (!product) {
                console.error(`Producto no encontrado: ${item.productId}`);
                failedProducts.push(item.productId); 
                continue; 
            }

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await ProductsDao.update(product._id, { stock: product.stock }); 
                purchasedProducts.push(item); 
                totalAmount += product.price * item.quantity; 
            } else {
                failedProducts.push(product.productId); 
            }
        }

        
        if (purchasedProducts.length > 0) {
            const ticket = await ticketModel.create({
                code: `TCK-${Date.now()}`,
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: req.user?.email || "sin-email@example.com" 
            });

            return res.status(200).json({ status: "success", ticket, failedProducts });
        }

        return res.status(400).json({
            status: "error",
            message: "No se pudo completar la compra.",
            failedProducts
        });
    } catch (error) {
        console.error("Error al procesar la compra:", error.message);
        return res.status(500).json({ status: "error", message: "Error interno del servidor." });
    }

});


router.post("/", async (req, res) => {
    try {
        const newCart = await CartsDao.create({ products: [] });
        res.status(201).json({ status: "success", payload: newCart });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ status: "error", message: "Error interno al crear el carrito." });
    }
});

router.get("/:cid/products", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartsDao.getById(cartId); 

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado." });
        }

        res.status(200).json({ status: "success", payload: cart.products }); 
    } catch (error) {
        console.error("Error al obtener productos del carrito:", error);
        res.status(500).json({ status: "error", message: "Error interno del servidor." });
    }
});

router.post("/:cid/products", async (req, res) => {
    try {
        const cartId = req.params.cid; 
        const { productId, quantity } = req.body; 

    
        if (!productId || !quantity) {
            return res.status(400).json({ status: "error", message: "Faltan datos obligatorios: 'productId' y 'quantity'." });
        }

        
        const cart = await CartsDao.getById(cartId);
        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado." });
        }

        
        cart.products.push({ productId, quantity });
        const updatedCart = await CartsDao.update(cartId, { products: cart.products });

        res.status(200).json({ status: "success", payload: updatedCart.products });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ status: "error", message: "Error interno al agregar producto." });
    }
});



export default router;