import { Router } from 'express';
import passport from "passport";

import { productDBManager } from '../dao/productDBManager.js';
import { cartDBManager } from '../dao/cartDBManager.js';

import { ticketModel } from "../dao/models/ticketModel.js";
import productModel from "../dao/models/productModel.js";
import { cartModel } from "../dao/models/cartModel.js";

import { authorization } from "../middlewares/authorization.js";

const router = Router();

const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);



router.get('/:cid', async (req, res) => {

    try {

        const result = await CartService.getProductsFromCartByID(req.params.cid);

        res.send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(400).send({
            status: 'error',
            message: error.message
        });

    }
});




router.post('/', async (req, res) => {

    try {

        const result = await CartService.createCart();

        res.send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(400).send({
            status: 'error',
            message: error.message
        });

    }
});



router.post(
    '/:cid/product/:pid',
    passport.authenticate("jwt",{session:false}),
    authorization("user"),
    async (req, res) => {

        try {

            const result = await CartService.addProductByID(req.params.cid, req.params.pid)

            res.send({
                status: 'success',
                payload: result
            });

        } catch (error) {

            res.status(400).send({
                status: 'error',
                message: error.message
            });

        }

    }
);



router.delete('/:cid/product/:pid', async (req, res) => {

    try {

        const result = await CartService.deleteProductByID(req.params.cid, req.params.pid)

        res.send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(400).send({
            status: 'error',
            message: error.message
        });

    }
});



router.put('/:cid', async (req, res) => {

    try {

        const result = await CartService.updateAllProducts(req.params.cid, req.body.products)

        res.send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(400).send({
            status: 'error',
            message: error.message
        });

    }
});



router.put('/:cid/product/:pid', async (req, res) => {

    try {

        const result = await CartService.updateProductByID(
            req.params.cid,
            req.params.pid,
            req.body.quantity
        )

        res.send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(400).send({
            status: 'error',
            message: error.message
        });

    }
});



router.delete('/:cid', async (req, res) => {

    try {

        const result = await CartService.deleteAllProducts(req.params.cid)

        res.send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(400).send({
            status: 'error',
            message: error.message
        });

    }
});



router.post(
    "/:cid/purchase",
    passport.authenticate("jwt",{session:false}),
    authorization("user"),
    async (req,res)=>{

        try{

            const cid = req.params.cid;

            const cart = await cartModel.findById(cid).populate("products.product");

            if(!cart){

                return res.status(404).send({
                    status:"error",
                    message:"Cart not found"
                });

            }

            const productsNotPurchased = [];

            let amount = 0;


            for(const item of cart.products){

                const product = item.product;

                const quantity = item.quantity;


                if(product.stock >= quantity){

                    product.stock -= quantity;

                    await product.save();

                    amount += product.price * quantity;

                }
                else{

                    productsNotPurchased.push(product._id);

                }

            }

            const ticket = await ticketModel.create({

                code: Math.random().toString(36).substring(2),

                amount,

                purchaser: req.user.email

            });

            res.send({

                status:"success",

                ticket,

                productsNotPurchased

            });

        }
        catch(error){

            res.status(500).send({

                status:"error",

                message:error.message

            });

        }

    }
);

export default router;

