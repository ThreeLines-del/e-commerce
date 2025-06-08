import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
