"use client";
import React, { useState } from "react"; // ✅ Corrected import

const Navbar = ({ setSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-200 shadow-sm fixed top-0 left-0 w-full z-50 flex items-center px-6  text-[#245a28]">
      <div className="flex items-center">
        <button
          onClick={() => setSelect("dashboard")}
          className="btn btn-ghost text-xl"
        >
          <img
            src="https://m.media-amazon.com/images/I/614y4xnqgdL.png"
            alt="Logo"
            className="w-15 h-15"
          />
        </button>
      </div>

      <div className="ml-auto flex items-center space-x-6">
        {/* ✅ Change Link to button to update state */}
        <button
          onClick={() => setSelect("dashboard")}
          className="text-lg font-medium  hover:text-green-500"
        >
          Dashboard
        </button>
        <button
          onClick={() => setSelect("transactions")}
          className="text-lg font-medium  hover:text-green-500"
        >
          Transactions
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
