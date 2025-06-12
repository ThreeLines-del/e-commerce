import { Request, Response } from "express";
import Product from "../models/product.model.js";

// Add product
export const addProduct = async (req: Request, res: Response) => {
  try {
    let products = await Product.find({});

    let id: number = 0;

    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = await Product.create({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      description: req.body.description,
    });

    await product.save();

    res.status(200).json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Remove product
export const removeProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.body.id });

    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Get single product by id
export const getSingleProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });

    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});

    res.send(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
