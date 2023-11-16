import Order from "../models/order.js";
import Product from "../models/product.js";
import { stripe } from "../server.js";
import { successMiddleware } from "../utils/successResponse.js";

export const processPayement = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const { client_secret } = await stripe.paymentIntents.create({
      amount: Number(totalAmount * 100),
      currency: "inr",
    });

    return successMiddleware(
      {
        success: true,
        message: "Payment Success",
        data: client_secret,
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
        messsage: "Order  Retrieve Successfully",
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

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const orderDetial = await Order.findById(orderId);

    if (!orderDetial)
      return res.status(400).json({ message: "No Order Found" });
    return successMiddleware(
      {
        success: true,
        messsage: "Order  get Successfully",
        data: orderDetial,
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

export const processOrder = async (req, res) => {
  try {
    const orderid = req.params.id;

    const order = await Order.findById(orderid);

    if (!order) return res.status(400).json({ message: "No Order Found" });

    if (order.orderStatus === "Pending") order.orderStatus = "Processing";
    else if (order.orderStatus === "Processing") order.orderStatus = "Shipped";
    else if (order.orderStatus === "Shipped") {
      order.orderStatus = "Delivered";
      order.deliveredAt = new Date(Date.now());
    } else return res.status(400).json({ message: " Order Delivered Already" });

    await order.save();

    return successMiddleware(
      {
        success: true,
        messsage: "Order  Status Changed Successfully",
        data: order,
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

export const getAdminOrers = async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length === 0) {
      return res.status(400).json({ message: "No Order Found" });
    }

    return successMiddleware(
      {
        success: true,
        messsage: "Order  Retrieve Successfully",
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
