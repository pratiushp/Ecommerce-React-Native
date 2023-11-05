import { comparePasswords, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/user.model.js";
import { getDataUri } from "../utils/sendToken.js";
import { successMiddleware } from "../utils/successResponse.js";
import cloudinary from "cloudinary";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, email, address, city, country, pinCode } = req.body;

    const user = await userModel.findOne(userId);

    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (pinCode) user.pinCode = pinCode;

    await user.save();

    return successMiddleware(
      {
        success: true,
        message: "Profile Update Successfully",
        data: user,
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

export const changePassword = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { oldPassword, newPassword } = req.body;

    const user = await userModel.findOne(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const password = user.password;

    // Compare the old password with the stored hashed password
    const passwordMatches = await comparePasswords(oldPassword, password);

    if (!passwordMatches) {
      return res.status(400).json({ message: "Incorrect Old Password" });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    return successMiddleware(
      {
        success: true,
        message: "Password Changed Successfully",
        data: user,
      },
      req,
      res
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
