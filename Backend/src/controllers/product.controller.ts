import type { Request, Response } from "express";
import Product, { type IProduct } from "../models/product.model.js";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Could not fetch products",
    });
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData: IProduct = req.body;

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to add product",
    });
  }
};
