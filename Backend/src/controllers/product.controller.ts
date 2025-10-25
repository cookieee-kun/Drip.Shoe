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

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid product ID format" });
      return;
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({
      message: "Product details fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

