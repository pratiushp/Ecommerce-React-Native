import Order from "../models/order.js";
import Product from "../models/product.js";
import { successMiddleware } from "../utils/successResponse.js";

export const createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingCharges,
      totalAmount,
    } = req.body;

    const orderDetails = await Order.create({
      user: req.user?._id,
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingCharges,
      totalAmount,
    });

    for (let i = 0; i < orderItems.length; i++) {
      const product = await Product.findById(orderItems[i].product);
      product.stock -= orderItems[i].quantity;
      await product.save();
    }

    return successMiddleware(
      {
        success: true,
        messsage: "Order  Placed Successfully",
        data: orderDetails,
      },
      req,
      res
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user?._id });

    if (orders.length === 0) {
      return res.status(400).json({ message: "No Order Found" });
    }

    return successMiddleware(
      {
        success: true,
        messsage: "Order  Placed Successfully",
        data: orders,
      },
      req,
      res
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
