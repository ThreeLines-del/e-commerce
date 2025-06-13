import express from "express";
import { filterByCategory } from "../controllers/productcategory.controller.js";

export const productCategoryRouter = express.Router();

productCategoryRouter.get("/", filterByCategory);
