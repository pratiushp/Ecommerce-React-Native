import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,

    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validator: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  pinCode: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    public_id: String,
    url: String,
  },

  otp: Number,
  otp_expire: Date,
});

export default mongoose.model("users", userSchema);
