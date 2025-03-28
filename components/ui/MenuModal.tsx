"use client";
import { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";

interface MenuModalProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function MenuModal({ onView, onEdit, onDelete }: MenuModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
        <BsThreeDots className="text-xl" />
      </button>
      {isOpen && (
        <div className="absolute z-50 right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onView}
          >
            View
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
