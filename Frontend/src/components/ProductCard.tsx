import React from "react";
import ShoeImage from "../assets/new-shoe.jpg";

const ProductCardUI: React.FC = () => {
  return (
    <div className="bg-whit shadow-lg rounded-xl overflow-hidden w-70 hover:shadow-2xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700">
        <img
          src={ShoeImage}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <h3 className="uppercase text-gray-900 font-bold text-lg truncate">
            PRODUCT NAME
          </h3>
          <div className="flex items-center mt-2">
            {/* Rating Stars */}
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            {/* Price */}
            <span className="text-gray-700 dark:text-gray-300 ml-2 font-semibold">
              $99.99
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCardUI;
