import express from "express";
import { searchProducts } from "../controllers/productsearch.controller.js";

export const searchRouter = express.Router();

searchRouter.get("/search", searchProducts);
