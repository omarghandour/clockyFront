"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import logo from "../../public/search-alt-1-svgrepo-com.svg";
// import DropdownMenu from "./DropdownMenu";
import { AccessibleDropdown } from "@/components/accessible-dropdown";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import NavbarSide from "@/components/NavbarSide";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [storageValue, setStorageValue] = useState<string | null>(null);
  const { toast } = useToast();
  const router: any = useRouter();

  useEffect(() => {
    // Check local storage for token on mount
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("token");
      setStorageValue(value);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (searchValue.trim() === "") {
      toast({ title: "Please enter a search term." });
      return;
    }
    // Navigate to the search route with the search query
    router.push(`/search?value=${encodeURIComponent(searchValue)}`);
    setShowSearch(false);
  };

  useEffect(() => {
    // Initialize isScrolled state based on the current scroll position
    setIsScrolled(window.scrollY > 50);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setStorageValue(null);
    toast({ title: "Logged Out successfully" });
  };

  const handleNavigation = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    console.log(e, target);

    if (router.pathname !== "/") {
      router.push(`/?target=#${target}`);
    } else {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`mainFont top-0 shadow-lg text-two fixed w-full mx-auto z-50 flex justify-between items-center p-5 transition-colors duration-300 ${
        isScrolled ? "bg-main w-full" : "bg-transparent"
      }`}
    >
      <div>
        <Link href="/">
          <h1 className="text-[1.5rem] mainFont hover:text-white">Clocky</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="md:flex md:gap-3 lg:gap-8 items-center p-1 text-[15px] hidden">
        <div
          className="hover:text-white px-2"
          onClick={(e) => handleNavigation(e, "newarraival")}
        >
          NEW ARRIVAL
        </div>
        <Link prefetch={true} className="hover:text-white px-2" href="/shop">
          SHOP
        </Link>
        <div className="hover:text-white">
          <AccessibleDropdown />
        </div>
        <Link
          className="hover:text-white px-2"
          href="#contactus"
          onClick={(e) => handleNavigation(e, "contactus")}
        >
          CONTACT US
        </Link>
        {/* <Link className="hover:text-white px-2" href="/policy">
          POLICY
        </Link> */}
        <Link
          className={`hover:text-white px-2 ${storageValue ? "hidden" : ""}`}
          href="/login"
        >
          LOGIN
        </Link>
        <Link
          className={`hover:text-white px-2 ${storageValue ? "" : "hidden"}`}
          onClick={handleClick}
          href="/"
        >
          LOGOUT
        </Link>

        {/* Favorites Link with Heart Icon */}
        <Link className="hover:text-white flex items-center" href="/favorites">
          <FontAwesomeIcon icon={regularHeart} className=" mr-2 " />
        </Link>

        <Link className="hover:text-white" href="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#e3c578"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 11V6a3 3 0 116 0v4.967M10.4 21h3.2c2.24 0 3.36 0 4.216-.436a4 4 0 001.748-1.748C20 17.96 20 16.84 20 14.6v-2.4c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C18.48 9 17.92 9 16.8 9H7.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C4 10.52 4 11.08 4 12.2v2.4c0 2.24 0 3.36.436 4.216a4 4 0 001.748 1.748C7.04 21 8.16 21 10.4 21z"
            ></path>
          </svg>
        </Link>
      </div>

      {/* Search Icon and Input */}
      <div className="hidden relative md:flex justify-center items-center gap-5">
        <div
          className={`absolute bg-white p-1 rounded shadow-md transition-all duration-300 ease-in-out transform ${
            showSearch
              ? "opacity-100 scale-100 -left-[300px] "
              : "opacity-0 scale-75 left-0"
          }`}
        >
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border text-main bg-transparent rounded px-1 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 bg-main text-white px-3 rounded hover:bg-two"
            >
              Go
            </button>
          </form>
        </div>
        <Image
          className="w-6 h-6 cursor-pointer"
          src={logo}
          alt="Search Icon"
          onClick={toggleSearch}
        />
      </div>

      {/* Burger Menu for Mobile */}
      <div className="md:hidden">
        {/* <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className={`h-6 w-6 transform transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button> */}
        <NavbarSide />
      </div>

      {/* Mobile Navigation */}
      <div
        className={`text-center p-5 ${
          isOpen ? "block" : "hidden"
        } md:hidden absolute top-full left-0 w-full bg-main transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 flex flex-col gap-2"
            : "opacity-0 -translate-y-2"
        }`}
      >
        {router.pathname === "/" && (
          <div
            className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
            onClick={(e) => handleNavigation(e, "newarraival")}
          >
            NEW ARRIVAL
          </div>
        )}
        <Link
          prefetch={true}
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/shop"
          onClick={() => setIsOpen(false)}
        >
          SHOP
        </Link>
        <div className="block px-4 py-2 text-two hover:bg-two bg-[#0000004d]">
          <AccessibleDropdown />
        </div>

        <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="#contactus"
          onClick={(e) => handleNavigation(e, "contactus")}
        >
          CONTACT US
        </Link>
        {/* <Link
          className="block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d]"
          href="/policy"
          onClick={() => setIsOpen(false)}
        >
          POLICY
        </Link> */}
        <Link
          className={`hover:text-white block ${storageValue ? "hidden" : ""}`}
          href="/login"
        >
          LOGIN
        </Link>
        <Link
          className={`block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d] ${
            storageValue ? "" : "hidden"
          }`}
          onClick={handleClick}
          href="/"
        >
          LOGOUT
        </Link>
        {/* Search Icon and Input */}
        <div
          className={`flex w-full items-center px-4 py-2 text-two  bg-[#0000004d] ${
            showSearch ? "justify-between" : "justify-center"
          }`}
        >
          <div className="w-full">
            <form
              onSubmit={handleSearch}
              className="bg-transparent w-full p-1 rounded shadow-md"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="border w-4/5 text-main rounded px-1 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 bg-main text-white px-3 rounded hover:bg-two"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
