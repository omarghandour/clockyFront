"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function AccessibleCollapse() {
  const [isOpen, setIsOpen] = useState(false);
  const collapseRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { name: "MALE", href: "/male" },
    { name: "FEMALE", href: "/female" },
    { name: "UNISEX", href: "/unisex" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collapseRef.current &&
        !collapseRef.current.contains(event.target as Node)
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
    <div className="w-full flex items-center justify-center">
      <div
        className="w-full relative"
        ref={collapseRef}
        onMouseEnter={() => {
          if (window.innerWidth >= 1024) setIsOpen(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 1024) setIsOpen(false);
        }}
      >
        <button
          ref={buttonRef}
          className="w-full flex justify-between items-center px-2 py-1 text-sm font-medium text-two rounded-md hover:bg-two hover:text-main focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="collapse-menu"
        >
          <span className="w-full text-center">GENDER</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Collapsible Content */}
        <div
          id="collapse-menu"
          className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
            isOpen ? "max-h-dvh" : "max-h-0"
          }`}
          role="region"
          onKeyDown={handleKeyDown}
        >
          <div className="py-2  text-center divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-sm text-two hover:bg-two hover:text-main focus:bg-two focus:text-main focus:outline-none"
                role="menuitem"
                tabIndex={0}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
