"use client";
import React, { useState } from "react";
import Image from "next/image";
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
        className={`px-3 py-2 h-20 flex ${
          isOpen ? "justify-between" : "justify-center"
        } items-center`}
      >
        <img
          className={`transition-all duration-500 ${
            isOpen ? "w-14" : "w-0 opacity-0"
          }`}
          src={"/logo.png"}
          alt={"logo"}
        />
        <MdMenuOpen
          size={50}
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-md cursor-pointer hover:bg-blue-300 p-1.5 transition-transform duration-500 ${
            isOpen && "rotate-180"
          }`}
        />
      </div>

      {/* Body */}
      <ul className="p-0 m-0 flex-1">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className={`px-3 py-2 space-x-2 rounded-md hover:bg-blue-400 cursor-pointer flex items-center relative group`}
          >
            <div className="bg-blue-200 rounded-md p-2">{item.icon}</div>
            <span
              className={`${
                !isOpen && "w-0 translate-x-24"
              } overflow-hidden whitespace-nowrap
              }`}
            >
              {item.label}
            </span>
            <span
              className={`${
                isOpen && "hidden"
              } absolute left-24 shadow-md rounded-md
              w-0 text-black bg-blue-400 whitespace-nowrap duration-100 overflow-hidden group-hover:w-fit  group-hover:left-24
             `}
            >
              <span className="p-2">{item.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
