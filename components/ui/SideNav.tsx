"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMenuOpen } from "react-icons/md";
import { menuItems } from "@/data";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      className={`h-screen bg-blue-100 shadow-md duration-500 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div
        className={`px-3 py-2 h-20 flex items-center transition-all duration-500 ease-in-out ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {/* Logo */}
        <div
          className={`relative transition-all duration-500 ease-in-out ${
            isOpen ? "w-12 h-12 opacity-100" : "w-0 h-0 opacity-0"
          }`}
        >
          <Image src="/logo.png" alt="logo" fill className="object-contain" />
        </div>

        {/* Title */}
        <span
          className={`transition-all duration-500 ease-in-out font-bold overflow-hidden whitespace-nowrap ${
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
          }`}
        >
          Talisay MPS | RIS
        </span>

        {/* Toggle Button */}
        <MdMenuOpen
          size={50}
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-md cursor-pointer hover:bg-blue-300 p-1.5 transition-transform duration-500 ease-in-out ${
            isOpen && "rotate-180"
          }`}
        />
      </div>

      {/* Navigation Links */}
      <ul className="p-0 m-0 flex-1">
        {menuItems.map((item, idx) => (
          <li key={idx} className="transition-all duration-500 ease-in-out">
            <Link
              href={item.link}
              className={`flex items-center py-2 rounded-md hover:bg-blue-400 cursor-pointer relative group ${
                isOpen ? "px-3 space-x-2" : "px-0 space-x-0 justify-center"
              }`}
            >
              <div className="bg-blue-200 rounded-md p-2">{item.icon}</div>
              <span
                className={`transition-all duration-500 ease-in-out ${
                  isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                } overflow-hidden whitespace-nowrap`}
              >
                {item.label}
              </span>
              <span
                className={`absolute left-24 shadow-md rounded-md text-black bg-blue-400 whitespace-nowrap transition-all duration-500 ease-in-out overflow-hidden group-hover:w-fit group-hover:left-24 ${
                  isOpen ? "hidden" : "w-0"
                }`}
              >
                <span className="p-2">{item.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
