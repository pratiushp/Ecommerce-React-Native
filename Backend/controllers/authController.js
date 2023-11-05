import { comparePasswords, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/user.model.js";
import { getDataUri, sendToken } from "../utils/sendToken.js";
import { successMiddleware } from "../utils/successResponse.js";
import cookie from "cookie";
import { cookieOptions } from "../utils/sendToken.js";
import cloudinary from "cloudinary";
import { sendEmail } from "../helper/sendEmail.js";

export const Register = async (req, res, next) => {
  try {
    const { name, email, password, country, address, city, pinCode } = req.body;

    let avatar = undefined;

    if (req.file) {
      //req file

      const file = getDataUri(req.file);

      //Cloudinary here
      const myCloud = await cloudinary.v2.uploader.upload(file.content);

      avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }

    const hashedpassword = await hashPassword(password);

    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedpassword,
      country: country,
      address: address,
      avatar: avatar,
      city: city,
      pinCode: pinCode,
    });

    successMiddleware(
      {
        success: true,
        message: "Registered Successfully",
        data: newUser,
      },
      req,
      res,
      next
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

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }

    const passwordMatches = await comparePasswords(password, user.password);

    if (passwordMatches === false) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    sendToken(user, res, "Login Success");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const user = await userModel.findOne(userId);

    return successMiddleware(
      {
        success: true,
        message: "User Profile",
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

export const logOut = (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      ...cookieOptions,
      expires: new Date(0),
    })
  );

  return successMiddleware(
    {
      success: true,
      message: "Logout successful",
    },
    req,
    res
  );
};

export const uploadpic = async (req, res) => {
  try {
    const userid = req.user?._id;
    const user = await userModel.findOne(userid);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const file = getDataUri(req.file);

    if (user.avatar && user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    }

    // Upload the new avatar to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(file.content);

    user.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    await user.save();

    return successMiddleware(
      {
        success: true,
        message: "Avatar Updated Successfully",
        data: null,
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

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const randomNumber = Math.random() * (999999 - 100000) + 100000;
    const otp = Math.floor(randomNumber);

    const otp_expire = 15 * 60 * 1000;

    user.otp = otp;
    user.otp_expire = new Date(Date.now() + otp_expire);
    await user.save();

    // Send the OTP via email
    try {
      // Replace the following object with your email content
      const emailOptions = {
        email: user.email,
        subject: "Password Reset OTP",
        message: `Dear ${user.name}, Your OTP for password reset is: ${otp}`,
      };

      await sendEmail(emailOptions);
    } catch (error) {
      user.otp = null;
      user.otp_expire = null;
      await user.save();
      return res.status(500).json({ message: "Error in sending email" });
    }

    return successMiddleware(
      {
        success: true,
        message: `Email Sent Successfully to ${user.name}`,
        data: null,
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

export const resetPassword = async (req, res) => {
  try {
    const { otp, password } = req.body;

    const user = await userModel.findOne({
      otp,
      otp_expire: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Incorrect OTP or OTP expire" });
    }

    if (!password) {
      return res.status(400).json({ message: "Enter Password" });
    }

    const hashedpassword = await hashPassword(password);

    user.password = hashedpassword;
    user.otp = undefined;
    user.otp_expire = undefined;

    await user.save();

    return successMiddleware(
      {
        success: true,
        message: "Password Successfully Reset",
        data: null,
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
