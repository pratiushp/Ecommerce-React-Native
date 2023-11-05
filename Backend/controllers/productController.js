import product from "../models/product.js";
import { getDataUri } from "../utils/sendToken.js";
import { successMiddleware } from "../utils/successResponse.js";
import cloudinary from "cloudinary";
import Category from "../models/category.js";

export const getAllProduct = async (req, res) => {
  try {
    //Search and category query

    const { keyword, category } = req.query;
    const products = await product
      .find({
        name: {
          $regex: keyword ? keyword : "",
          $options: "i",
        },
        category: category ? category : undefined,
      })
      .populate("category");

    if (products.length === 0) {
      return res.status(400).json({
        message: "No Product Found",
      });
    }

    return successMiddleware(
      {
        success: true,
        message: "Product Get Successfully",
        data: products,
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

export const getProductDetails = async (req, res) => {
  try {
    const productid = req.params.id;

    if (!productid) {
      return res.status(400).json({
        message: "No Product Found",
      });
    }

    const products = await product.find({ productid }).populate("category");

    if (products.length === 0) {
      return res.status(400).json({
        message: "No Product Found",
      });
    }

    return successMiddleware(
      {
        success: true,
        message: "Product Get Successfully",
        data: products,
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

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: "Category not found" });
    }

    const file = getDataUri(req.file);

    const myCloud = await cloudinary.v2.uploader.upload(file.content);

    const image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    const details = await product.create({
      name,
      description,
      price,
      category,
      stock,
      images: [image],
    });

    return successMiddleware(
      {
        success: true,
        message: "Product Created Successfully",
        data: details,
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

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, stock, category } = req.body;

    const productToUpdate = await product.findById(productId);

    if (!productToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if a new image is provided
    // if (req.file) {
    //   // Delete the previous image from Cloudinary
    //   if (productToUpdate.images && productToUpdate.images.length > 0) {
    //     const previousImage = productToUpdate.images[0];
    //     try {
    //       await cloudinary.v2.uploader.destroy(previousImage.public_id);
    //     } catch (imageDeleteError) {
    //       console.error("Error deleting previous image:", imageDeleteError);
    //     }

    //     // Upload the new image to Cloudinary
    //     const file = getDataUri(req.file);
    //     const myCloud = await cloudinary.v2.uploader.upload(file.content);

    //     const newImage = {
    //       public_id: myCloud.public_id,
    //       url: myCloud.secure_url,
    //     };

    //     // Update the product's images array with the new image
    //     productToUpdate.images = [newImage];
    //   }
    // }

    // Update other product details
    if (name) productToUpdate.name = name;
    if (description) productToUpdate.description = description;
    if (price) productToUpdate.price = price;
    if (stock) productToUpdate.stock = stock;

    // Check if the category ID is provided and validate that it exists
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ message: "Category not found" });
      }
      productToUpdate.category = category;
    }

    await productToUpdate.save();

    return successMiddleware(
      {
        success: true,
        message: "Product Updated Successfully",
        data: productToUpdate,
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

export const addProductImage = async (req, res) => {
  try {
    const picture = req.file;
    if (!picture) {
      return res.status(400).json({ message: "Please Add Image" });
    }
    const productId = req.params.id;

    const productFind = await product.findById(productId);

    if (!productFind) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const file = getDataUri(req.file);

    const myCloud = await cloudinary.v2.uploader.upload(file.content);

    const image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    productFind.images.push(image);

    await productFind.save();

    return successMiddleware(
      {
        success: true,
        message: "Images Added Successfully",
        data: productFind,
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

export const deleteProductImage = async (req, res) => {
  try {
    const productId = req.params.id;

    const id = req.query.id;

    if (!id) {
      return res.status(400).json({
        message: "Enter Image Id",
      });
    }

    const productFind = await product.findById(productId);

    if (!productFind) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    let isExist = -1;

    productFind.images.forEach((item, index) => {
      if (item._id.toString() === id.toString()) isExist = index;
    });

    if (isExist < 0) {
      return res.status(400).json({ message: "Image Doesnot Exist" });
    }

    await cloudinary.v2.uploader.destroy(productFind.images[isExist].public_id);

    productFind.images.splice(isExist, 1);

    await productFind.save();

    return successMiddleware(
      {
        success: true,
        message: "Images Deleted Successfully",
        data: productFind,
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

export const deleProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const productFin = await product.findById(productId);

    for (let index = 0; index < productFin.images.length; index++) {
      await cloudinary.v2.uploader.destroy(productFin.images[index].public_id);
    }

    await productFin.deleteOne();

    return successMiddleware(
      {
        success: true,
        message: "Product Deleted Successfully",
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

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const categoryDetail = await Category.create({
      category,
    });
    return successMiddleware(
      {
        success: true,
        message: "Category Created Successfully",
        data: categoryDetail,
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

export const getAllCategory = async (req, res) => {
  try {
    console.log("Guff");
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(400).json({ message: "No Category Found" });
    }
    return successMiddleware(
      {
        success: true,
        message: "Category Retrieve Successfully",
        data: categories,
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

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    const products = await product.find({ category: category._id });

    for (let i = 0; i < products.length; i++) {
      const productFin = products[i];
      product.category = undefined;

      await product.save();
    }

    await category.deleteOne();

    return successMiddleware(
      {
        success: true,
        message: "Category Deleted Successfully",
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

export const getAdminProduct = async (req, res) => {
  try {
    const productFind = await product.find().populate("category");

    if (productFind.length === 0) {
      return res.status(400).json({ message: "No Category Found" });
    }
    return successMiddleware(
      {
        success: true,
        message: "Product Retrieve Successfully",
        data: productFind,
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
