import { Request, Response } from "express";
import Product from "../models/product.model.js";

export const filterByCategory = async (req: Request, res: Response) => {
  const categoryQuery = req.query.categories;

  try {
    let products;

    if (categoryQuery) {
      let categories: string[] = [];
      if (typeof categoryQuery === "string") {
        categories = categoryQuery.split(",");
      } else if (Array.isArray(categoryQuery)) {
        categories = categoryQuery.flatMap((q) =>
          typeof q === "string" ? q.split(",") : []
        );
      }
      products = await Product.find({ category: { $in: categories } });
    } else {
      products = await Product.find({});
    }

    res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
