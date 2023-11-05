import jwt from "jsonwebtoken";

export const generateToken = (userId, name, role) => {
  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId, name, role }, jwtSecret, {
    expiresIn: "7d",
  });
  return token;
};
