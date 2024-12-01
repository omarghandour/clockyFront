import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
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
  }, [dropdownRef]);

  return (
    <div className="relative group" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        className=" bg-transparent focus:outline-none lg:hover:bg-transparent w-full hover:text-main"
        onClick={() => setIsOpen(!isOpen)} // For smaller screens, allow click
      >
        GENDER
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute left-[-15px] mt-2 w-[110%] md:w-[150%] bg-main border border-gray-200 shadow-lg rounded-lg opacity-0 lg:group-hover:opacity-100 lg:group-hover:visible transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible " : "invisible"
        } lg:invisible lg:opacity-0 lg:group-hover:opacity-100 lg:group-hover:visible`}
      >
        <ul className="py-2 text-white text-center">
          <li className="px-4 py-2 text-two hover:bg-two hover:text-main cursor-pointer">
            <Link href={"/male"}>MALE</Link>
          </li>
          <li className="px-4 py-2 text-two hover:bg-two hover:text-main cursor-pointer">
            <Link href={"/female"}>FEMALE</Link>
          </li>
          <li className="px-4 py-2 text-two hover:bg-two hover:text-main cursor-pointer">
            <Link href={"/unisex"}>UNISEX</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
