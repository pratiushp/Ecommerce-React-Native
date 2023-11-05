import { app } from "./app.js";
import Cloudinary from "cloudinary";

Cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running on PORT ${process.env.PORT}`);
});
