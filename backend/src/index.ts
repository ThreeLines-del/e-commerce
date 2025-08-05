import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { productRouter } from "../routes/product.route.js";
import { signUpLogInRouter } from "../routes/signuplogin.route.js";
import { cartRouter } from "../routes/cart.route.js";
import { productCategoryRouter } from "../routes/productcategory.route.js";
import { searchRouter } from "../routes/productsearch.route.js";
import Product from "../models/product.model.js";

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

// Routes
app.use("/api/", productRouter);
app.use("/api/", signUpLogInRouter);
app.use("/api/cart/", cartRouter);
app.use("/api/products/", productCategoryRouter);
app.use("/api/products/", searchRouter);

app.get("/api/new", async (req, res) => {
  try {
    const newProducts = await Product.find().sort({ createdAt: -1 }).limit(8);

    res.status(200).json(newProducts);
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
