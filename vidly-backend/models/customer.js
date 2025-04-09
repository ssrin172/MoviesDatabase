import mongoose from "mongoose";

export const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: false,
  },
});
export const Customer = mongoose.model("Customers", customerSchema);
