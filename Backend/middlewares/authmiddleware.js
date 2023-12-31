import jwt from "jsonwebtoken";
import { AppError } from "../utils/error.js";
import userModel from "../models/user.model.js";

export const requireSignIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    token = token.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    const decode = jwt.verify(token, jwtSecret);

    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const userDet = await userModel.findById(decode.userId);

    if (userDet) req.user = userDet;

    next();
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const admin = req.user?.role;

    if (admin !== "admin") {
      return res.status(401).send("Unauthorized Access");
    }

    next();
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
};
