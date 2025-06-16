import { NextFunction, Request, Response } from "express";
import Cart from "../models/cart.model.js";
import jwt from "jsonwebtoken";

// Add to cart
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secret_ecom");

    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "user" in decoded &&
      typeof (decoded as any).user === "object" &&
      (decoded as any).user !== null &&
      "id" in (decoded as any).user
    ) {
      req.body.userId = (decoded as any).user.id;
    }
  }

  next();
};

export const addProductToCart = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const product = req.body.product;

  try {
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({ userId: userId, items: [product] });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId === product.productId
      );

      if (index >= 0) {
        cart.items[index].quantity += product.quantity;
      } else {
        cart.items.push(product);
      }
    }

    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Get cart contents
export const getAllCartProducts = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json({ success: true, cart: cart || { items: [] } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Remove cart item
export const removeFromCart = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      res.status(404).json({ success: false });
    } else {
      cart.items.pull({ productId: productId });

      await cart.save();
    }

    const updatedCart = await Cart.findOne({ userId: userId });

    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Update quantity by 1
export const updateQuantityByOne = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      res.status(404).json({ success: false });
    } else {
      const item = cart.items.find((item) => item.productId === productId);

      if (item) {
        item.quantity = (item.quantity ?? 0) + 1;
        await cart.save();
      }
    }

    const updatedCart = await Cart.findOne({ userId: userId });

    res.status(200).json({ success: true, updatedCart });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

// Reduce quantity by 1
export const reduceQuantityByOne = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      res.status(404).json({ success: false });
    } else {
      const item = cart.items.find((item) => item.productId === productId);

      if (item) {
        item.quantity = (item.quantity ?? 0) - 1;
        await cart.save();
      }
    }

    const updatedCart = await Cart.findOne({ userId: userId });

    res.status(200).json({ success: true, updatedCart });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
