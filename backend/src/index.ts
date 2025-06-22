import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { productRouter } from "../routes/product.route.js";
import { signUpLogInRouter } from "../routes/signuplogin.route.js";
import { cartRouter } from "../routes/cart.route.js";
import { productCategoryRouter } from "../routes/productcategory.route.js";
import Product from "../models/product.model.js";

dotenv.config();

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
const claudeApi = process.env.CLAUDE_API || "";
const anthropic = new Anthropic({
  apiKey: claudeApi,
});
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

app.get("/api/products/search", async (req, res) => {
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
});

// Search with Claude

function parseClaudeJson(raw: string): any | null {
  try {
    // Step 1: Strip triple backticks and language hints
    raw = raw
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

    // Step 2: Convert smart quotes (often returned by Claude)
    raw = raw
      .replace(/[“”]/g, '"') // double quotes
      .replace(/[‘’]/g, "'"); // single quotes

    // Step 3: Parse JSON
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse Claude JSON:", err);
    return null;
  }
}

app.get("/api/claude", async (req, res) => {
  const products = await Product.find({});

  const msg = await anthropic.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1000,
    temperature: 1,
    system: ` 
            You are a function that returns raw JSON only.
            Do not repeat or echo the response.
            Do not include any explanation or commentary.
            Do not add triple backticks, markdown formatting, or explanatory text.
            Only output valid JSON. Use standard double quotes only.
            Your output should look exactly like:
            {"items":[{"_id":"abc","name":"Product Name"}]}
            Return an empty array if nothing matches.
            Input string should be related to the items in the product list else return empty array.
            `,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `These are the products: ${JSON.stringify(products)}. 
                    Find only items related to ${
                      req.body.searchTerm
                    } using values in the objects.
                    Respond only with raw JSON.`,
          },
        ],
      },
    ],
  });

  const rawClaudeOutput = msg.content[0]?.text || "";
  const data = parseClaudeJson(rawClaudeOutput);
  console.log(rawClaudeOutput);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(500).json({ error: "Invalid response from Claude" });
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
