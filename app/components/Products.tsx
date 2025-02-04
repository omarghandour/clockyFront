/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { WatchFiltersComponent } from "@/components/watch-filters";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Card from "./Card";
// import { FiFilter } from "react-icons/fi"; // Import an icon for the toggle button

type Product = {
  _id: string;
  name: string;
  brand: string;
  before: number;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};
type Filters = {
  selectedBrand: string;
  minPrice: number; // Ensure minPrice is a number here, as required.
  maxPrice: number;
  category: string;
  caseColor: string;
  dialColor: string;
};

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>(["All"]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [caseColors, setCaseColors] = useState<string[]>(["All"]);
  const [dialColors, setDialColors] = useState<string[]>(["All"]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    selectedBrand: "All",
    minPrice: 0,
    maxPrice: 100000,
    category: "All",
    caseColor: "All",
    dialColor: "All",
  });
  console.log(filters);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const { toast } = useToast();
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef: any = useCallback(
    (node: Element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = {
          page,
          limit: 20,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          caseColor:
            filters.caseColor !== "All" ? filters.caseColor : undefined,
          dialColor:
            filters.dialColor !== "All" ? filters.dialColor : undefined,
          brand:
            filters.selectedBrand !== "All" ? filters.selectedBrand : undefined,
          category: filters.category !== "All" ? filters.category : undefined,
        };

        const response = await axios.get(
          "https://express.clockyeg.com/api/products",
          {
            params: query,
            withCredentials: true,
          }
        );

        const newProducts = response.data;
        if (newProducts.length === 0) setHasMore(false);

        setProducts((prevProducts) =>
          page === 1 ? newProducts : [...prevProducts, ...newProducts]
        );
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (page === 1) {
      setProducts([]);
      setHasMore(true);
    }

    fetchProducts();
  }, [page, filters]);

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null);
    }, 1000);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast({
      title: product.name,
      description: "added to cart",
      action: (
        <Link href="/cart" className="p-[10px]">
          Go to cart
        </Link>
      ),
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const onApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-dvh pb-14 text-white flex flex-col  items-start w-full bg-white  text-center mx-auto xl:w-full">
      {/* Sidebar Toggle Button */}

      <div className="text-white md:pl-5 md:text-left backgroundd md:bg-right bg-main bg-contain bg-no-repeat bg-center w-full flex flex-col justify-end md:gap-12 h-[300px] ">
        <span className="mainFont text-two text-9xl shadow-lg w-full">
          Shop
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start items-center w-full md:px-5">
        <div className="w-1/5 mt-6">
          <WatchFiltersComponent onApplyFilters={onApplyFilters} />
        </div>
        {/* Product List */}
        <div
          className={`grid lg:grid-cols-5 grid-cols-2 md:grid-cols-3  gap-2 w-full px-5 pb-5 shadow ${
            isSidebarOpen ? "mt-4" : ""
          }`}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center p-4 gap-2 shadow-lg w-full"
                >
                  <Skeleton className="w-full h-40 md:h-64" />
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-1/2 h-5" />
                  <Skeleton className="w-1/3 h-7" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))
            : products.map((product, index) => (
                <Card product={product} key={index} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
