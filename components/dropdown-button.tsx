"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export function DropdownButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Option 1", href: "#" },
    { name: "Option 2", href: "#" },
    { name: "Option 3", href: "#" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium  rounded-md text-two hover:bg-two hover:text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => {
            if (window.innerWidth >= 1024) setIsOpen(true);
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 1024) setIsOpen(false);
          }}
        >
          <span>GENDER</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
