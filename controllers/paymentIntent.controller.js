import PaymentIntent from "../models/paymentIntent.model.js";
import Product from "../models/product.model.js";
import fetch from "node-fetch";

export const createPaymentIntent = async (req, res) => {
  try {
    const { products } = req.body;

    // Validate input
    if (!products) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    // Fetch product details by id
    const productData = await Product.findById(products);
    if (!productData) {
      return res.status(404).json({ message: `Product with ID ${products} not found.` });
    }

    const quantity = 1; // Default quantity, bisa disesuaikan
    const baseTotalAmount = productData.price * quantity;

    // Create payment intent
    const paymentIntent = new PaymentIntent({
      products: [
        {
          product: products,
          quantity,
        },
      ],
      totalAmount: baseTotalAmount,
      currency: "IDR",
      midtrans_token: "",
      midtrans_url: "",
      status: "pending",
    });

    await paymentIntent.save();

    // Midtrans payment intent configuration
    const transactionDetails = {
      transaction_details: {
        order_id: paymentIntent._id,
        gross_amount: baseTotalAmount,
      },
      credit_card: {
        secure: true,
      },
    };

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.MIDTRANS_SERVER_KEY,
      },
      body: JSON.stringify(transactionDetails),
    };

    // Fetch response from Midtrans
    const response = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      options
    );

    const paymentData = await response.json();

    if (paymentData.token && paymentData.redirect_url) {
      // Update payment intent with Midtrans details
      paymentIntent.midtrans_token = paymentData.token;
      paymentIntent.midtrans_url = paymentData.redirect_url;
      await paymentIntent.save();

      return res.status(200).json({
        message: "Order confirmed and payment intent created",
        paymentData,
      });
    } else {
      // Handle error from Midtrans response
      await PaymentIntent.findByIdAndDelete(paymentIntent._id);
      return res.status(500).json({
        message: "Failed to create payment intent with Midtrans.",
        error: paymentData.error_messages || "Unknown error",
      });
    }
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Route untuk menerima callback Midtrans
export const midtransCallback = async (req, res) => {
  try {
    const body = req.body;

    console.log("Midtrans callback received:", body);

    if (body.transaction_status === "settlement") {
      const payment = await PaymentIntent.findOne({ _id: body.order_id });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      payment.status = "completed";
      await payment.save();

      console.log("Payment status updated to completed for order_id:", body.order_id);

      return res.status(200).json({ message: "Notification received and payment updated" });
    }

    return res.status(200).json({ message: "Notification received but no action needed" });
  } catch (error) {
    console.error("Error handling Midtrans callback:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
