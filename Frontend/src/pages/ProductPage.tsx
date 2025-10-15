import React, { useState } from "react";
import shoeImage from "../assets/new-shoe.jpg";
import Navbar from "@/components/NavBar";
const ProductDetails: React.FC = () => {
  const [mainImage, setMainImage] = useState(shoeImage);

  const thumbnails = [shoeImage, shoeImage];

  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Column: Main Image + Thumbnails */}
          <div className="w-full md:w-1/2 flex flex-col">
            <img
              src={mainImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 overflow-x-auto">
              {thumbnails.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition"
                  onClick={() => setMainImage(src)}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Premium Wireless Headphones</h1>
            <p className="text-gray-600">SKU: WH1000XM4</p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">$349.99</span>
              <span className="text-gray-500 line-through">$399.99</span>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="text-gray-600">4.5 (120 reviews)</span>
            </div>

            <p className="text-gray-700">
              Experience premium sound quality and industry-leading noise
              cancellation with these wireless headphones. Perfect for music
              lovers and frequent travelers.
            </p>

            {/* Color Options */}
            <div>
              <h3 className="font-semibold mb-2">Color:</h3>
              <div className="flex gap-2">
                <button className="w-8 h-8 bg-black rounded-full" />
                <button className="w-8 h-8 bg-gray-300 rounded-full" />
                <button className="w-8 h-8 bg-blue-500 rounded-full" />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-1">Quantity:</label>
              <input
                type="number"
                defaultValue={1}
                min={1}
                className="w-16 text-center border rounded-md"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-md">
                Add to Cart
              </button>
              <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
