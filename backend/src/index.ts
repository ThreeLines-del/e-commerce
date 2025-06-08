import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Cart from "../models/cart.model.js";

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to frontend
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use("/api/images", express.static("upload/images"));

app.post("/api/upload", upload.single("product"), (req, res) => {
  res.status(200).json({
    success: 1,
    image_url: `http://localhost:${port}/api/images/${req.file?.filename}`,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

// Add product
app.post("/api/addproduct", async (req, res, next) => {
  try {
    let products = await Product.find({});

    let id;

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
});

// Remove product
app.post("/api/removeproduct", async (req, res, next) => {
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
});

// Get all products
app.get("/api/allproducts", async (req, res) => {
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
});

// Create user/signup
app.post("/api/signup", async (req, res) => {
  let check = await User.findOne({ email: req.body.email });

  if (check) {
    res.status(400).json({ success: false, errors: "existing email" });
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.status(200).json({ success: true, token });
});

// User login
app.post("/api/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      const passwrodCompare = req.body.password === user.password;

      if (passwrodCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const token = jwt.sign(data, "secret_ecom");

        res.json({
          success: true,
          token,
        });
      } else {
        res.json({
          success: false,
          errors: "Wrong Password",
        });
      }
    } else {
      res.json({
        success: false,
        errors: "Wrong Email Id or Password",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
});

// Cart
// Add to cart
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
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
    } else {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.post("/api/cart/add", authMiddleware, async (req, res) => {
  const userId = req.body.userId;
  const product = req.body.product;

  console.log(product);

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
});

// Connect to database and run server
if (!mongoUri) {
  console.error("MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to database");

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("failed to connect to database");
  });
