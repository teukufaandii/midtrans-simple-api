import mongoose from "mongoose";

const paymentIntentSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: "IDR" },
    midtrans_token: { type: String },
    midtrans_url: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const PaymentIntent = mongoose.model("PaymentIntent", paymentIntentSchema);

export default PaymentIntent;
