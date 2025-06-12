import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProductById,
  removeProduct,
} from "../controllers/product.controller.js";

export const productRouter = express.Router();

// Add product
productRouter.post("/addproduct", addProduct);

// Remove product
productRouter.post("/removeproduct", removeProduct);

// Get single product by id
productRouter.get("/product/:id", getSingleProductById);

// Get all products
productRouter.get("/allproducts", getAllProducts);
