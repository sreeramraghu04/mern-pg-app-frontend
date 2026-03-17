import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-blue-100">
      {/* Main Title */}
      <h1 className="text-3xl font-bold">Home Page</h1>

      {/* Payment Gateway Topic */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 underline">Payment-Gateway</h2>
        <p className="text-gray-500 max-w-md">
          This project demonstrates secure online payments integration using a
          modern payment gateway.
        </p>
      </div>

      {/* Navigation */}
      <Link to="/products">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          Go to Products
        </button>
      </Link>
    </div>
  );
};

export default Home;
