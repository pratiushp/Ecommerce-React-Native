import jwt from "jsonwebtoken";
import { AppError } from "../utils/error.js";
import userModel from "../models/user.model.js";

export const requireSignIn = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req,
  res,
  next
) => {
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
    // console.log(decode)
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userdet = await userModel.findOne({ where: { id: decode.userId } });
    if (userdet) req.user = userdet;
    next();
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const admin = req.user?.role;
    // console.log(admin)

    if (admin != "admin") {
      next();
    } else {
      return res.status(401).send("Unauthorized Access");
    }
  } catch (error) {
    console.log(error);
    return next(new AppError("Internal Server Error", 500));
  }
};

// export const isAuthenticated = async (req, res, next) => {
//   // const token = req.cookies.token;
//   //   console.log(req.cookies);

//   const { token } = req.cookies;

//   if (!token)
//     return res.status(401).json({
//       message: "Token Missing",
//     });

//   next();
// };
