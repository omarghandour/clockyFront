import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AccessibleDropdown } from "./accessible-dropdown";
import { AccessibleCollapse } from "./AccessibleCollapse";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarSide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [storageValue, setStorageValue] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
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

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setStorageValue(null);
    toast({ title: "Logged Out successfully" });
  };
  useEffect(() => {
    // Check local storage for token on mount
    if (typeof window !== "undefined") {
      const value = localStorage.getItem("token");
      setStorageValue(value);
    }
  }, []);
  return (
    <div className="flex flex-row-reverse center gap-5">
      <button onClick={() => setIsOpen(true)} className="flex text-two rounded">
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
      </button>
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
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-5 bg-main border-none">
          <SheetHeader className="my-2">
            {/* <SheetTitle className="text-two text-lg"></SheetTitle> */}
            <SheetClose asChild className="text-two"></SheetClose>
          </SheetHeader>

          <nav className="flex flex-col gap-2 mt-5">
            <Link
              href="#newarraival"
              className="block px-4 text-center py-2 text-two hover:bg-gray-700 bg-[#0000004d] rounded"
              onClick={() => setIsOpen(false)}
            >
              NEW ARRIVAL
            </Link>
            <Link
              href="/shop"
              className="block px-4 text-center py-2 text-two hover:bg-gray-700 bg-[#0000004d] rounded"
              onClick={() => setIsOpen(false)}
            >
              SHOP
            </Link>
            <div className="block px-4 py-2 text-two  bg-[#0000004d] rounded">
              <AccessibleCollapse />
            </div>
            <Link
              href="#contactus"
              className="block text-center px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d] rounded"
              onClick={() => setIsOpen(false)}
            >
              CONTACT US
            </Link>
            <Link
              href="/login"
              className={`text-center px-4 py-2 text-two hover:bg-two bg-[#0000004d] rounded block ${
                storageValue ? "hidden" : ""
              }`}
            >
              LOGIN
            </Link>
            <Link
              href="/"
              onClick={handleClick}
              className={`text-center block px-4 py-2 text-two hover:bg-gray-700 bg-[#0000004d] ${
                storageValue ? "" : "hidden"
              }`}
            >
              LOGOUT
            </Link>
          </nav>

          {/* Search Section */}
          <div
            className={`flex w-full items-center text-two ${
              showSearch ? "justify-between" : "justify-center"
            } mt-5`}
          >
            <form
              onSubmit={handleSearch}
              className="bg-transparent flex w-full p-1 rounded shadow-md"
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
                className="ml-2 bg-two text-main px-3 rounded hover:bg-main hover:text-two"
              >
                Go
              </button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarSide;
