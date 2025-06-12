import express from "express";
import {
  addProductToCart,
  authMiddleware,
  getAllCartProducts,
  removeFromCart,
} from "../controllers/cart.controller.js";

export const cartRouter = express.Router();

// Cart
// Add to cart
cartRouter.post("/add", authMiddleware, addProductToCart);

// Get cart contents
cartRouter.get("/:userId", getAllCartProducts);

// Remove cart item
cartRouter.post("/remove", removeFromCart);
