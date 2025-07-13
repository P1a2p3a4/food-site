
import OrderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

export const placeOrder = async (req, res) => {

  try {

    console.log('✅ PlaceOrder API hit');

    
    const { userId, items, amount, address, email } = req.body;

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new OrderModel({
      userId,
      items,
      amount,
      address,
      // status: "pending"  // optional if your model has a default!
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2000,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
      customer_email: email,
    });

    console.log('✅ Stripe session created:', session.id);

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("❌ placeOrder error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};






// ✅ You must export userOrders too:
export const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const orders = await OrderModel.find({ userId });
    res.json({ success: true, orders });

  } catch (error) {
    console.error("❌ userOrders error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
