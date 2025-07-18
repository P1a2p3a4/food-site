 
 
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: {
      type: String,
      required: true,
      default: "pending",  
      enum: ["pending", "confirmed", "shipped", "delivered"],
    },
    note: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const OrderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default OrderModel;
