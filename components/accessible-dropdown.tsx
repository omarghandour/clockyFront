"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { name: "MALE", href: "/male" },
    { name: "FEMALE", href: "/female" },
    { name: "UNISEX", href: "/unisex" },
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className="relative w-full center"
        ref={dropdownRef}
        onMouseEnter={() => {
          if (window.innerWidth >= 1024) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 1024) setIsOpen(false);
        }}
      >
        <button
          ref={buttonRef}
          className=" w-full  center space-x-2 px-2 py-1 text-sm font-medium text-two rounded-md hover:bg-two hover:text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span>GENDER</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div
            className="absolute top-10 md:top-7 md:left-0 md:w-56 w-80 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            onKeyDown={handleKeyDown}
          >
            <div className="py-1">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-two hover:text-main focus:bg-two focus:text-white focus:outline-none"
                  role="menuitem"
                  tabIndex={0}
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
