import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
  },

  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  //User Reference

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD",
  },

  paidAt: Date,

  paymentInfo: {
    id: String,
    status: String,
  },

  itemsPrice: {
    type: Number,
    required: true,
  },

  taxPrice: {
    type: Number,
    required: true,
  },
  shippingCharges: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Processing"],
    default: "Pending",
  },

  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Order", orderSchema);
