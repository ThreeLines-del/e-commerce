import { Request, Response } from "express";
import Product from "../models/product.model.js";

export const searchProducts = async (req: Request, res: Response) => {
  const searchTerm = typeof req.query.q === "string" ? req.query.q : "";

  try {
    const results = await Product.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(results);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
