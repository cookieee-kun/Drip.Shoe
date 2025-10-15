import React from "react";
import shoeImage from "../assets/new-shoe.jpg";

const ShoeProductShowcase: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-8 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="w-1/2 pr-8">
        <h2 className="text-5xl font-extrabold font-rounded text-gray-900 mb-4">
          STEP INTO THE LATEST DRIP WITH{" "}
          <span className="text-blue-900">DRIP NXT Y</span>
        </h2>
        <p className="text-xl text-gray-700 mb-6">
          EXPERIENCE UNMATCHED COMFORT AND STYLE
        </p>
        <a
          href={`/order/`}
          className="inline-block px-6 py-3 bg-blue-900 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Order Now
        </a>
      </div>

      {/* Right Section */}
      <div className="w-1/2 pl-8">
        <img
          src={shoeImage}
          alt="shoe image"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default ShoeProductShowcase;
