"use client";
import React, { useState } from "react"; // ✅ Corrected import

const Navbar = ({ setSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-sm fixed top-0 left-0 w-full z-50 flex items-center px-6 py-3">
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
          className="text-base font-medium text-gray-600 hover:text-green-500"
        >
          Dashboard
        </button>
        <button
          onClick={() => setSelect("transactions")}
          className="text-base font-medium text-gray-600 hover:text-green-500"
        >
          Transactions
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
