import { generateToken } from "../helper/jwtToken.js";
import cookie from "cookie";
import { successMiddleware } from "./successResponse.js";
import path from "path";
import DataUriParser from "datauri/parser.js";

export const sendToken = (user, res, message, req, next) => {
  const token = generateToken(user._id, user.name, user.role);

  // Set the token as a cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
  );
  return successMiddleware(
    {
      success: true,
      message: "Login Success",
      data: token,
    },
    req,
    res
  );
};

export const cookieOptions = {
  secure: true,
  httpOnly: true, // Only accessible via HTTP(S)
};

export const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extname = path.extname(file.originalname).toString();
  return parser.format("", file.buffer);
};
