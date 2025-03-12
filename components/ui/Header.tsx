"use client";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex justify-end md:justify-between items-center px-5 shadow-lg  h-20">
      {/* Title - Hidden on small screens */}
      <h1 className="text-xl font-bold hidden md:block">
        Case Records Information System
      </h1>

      {/* User Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-md hover:bg-blue-100 transition"
        >
          <FaUserCircle size={30} />
          <span className="text-lg font-bold">Admin</span>
          <MdKeyboardArrowDown size={20} />
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md overflow-hidden">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
              Change Password
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
