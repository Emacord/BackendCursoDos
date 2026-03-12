import { Router } from 'express';

import passport from "passport";

import ProductRepository from '../repositories/product.repository.js';
import ProductService from '../services/product.service.js';
import ProductController from '../controllers/product.controller.js';

import { productDBManager } from '../dao/productDBManager.js';
import { authorization } from '../middlewares/authorization.js';

const router = Router();




const productDAO = new productDBManager();


const productRepository = new ProductRepository(productDAO);


const productService = new ProductService(productRepository);


const productController = new ProductController(productService);


router.get(
  '/',
  passport.authenticate("jwt",{session:false}),
  productController.getProducts
);




router.get(
  '/:pid',
  passport.authenticate("jwt",{session:false}),
  productController.getProductById
);




router.post(
  '/',
  passport.authenticate("jwt",{session:false}),
  authorization("admin"),
  productController.createProduct
);




router.put(
  '/:pid',
  passport.authenticate("jwt",{session:false}),
  authorization("admin"),
  productController.updateProduct
);



router.delete(
  '/:pid',
  passport.authenticate("jwt",{session:false}),
  authorization("admin"),
  productController.deleteProduct
);



export default router;
