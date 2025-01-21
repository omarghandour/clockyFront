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
          limit: 5,
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
                <div
                  ref={products.length === index + 1 ? lastProductRef : null}
                  key={index}
                  className={`rounded-md z-0 relative overflow-hidden mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col shadow transition-transform duration-300 transform w-full flex-grow`}
                >
                  <div
                    onClick={() => {
                      router.push(`product/${product._id}`);
                    }}
                    className="flex w-full flex-col h-full cursor-pointer"
                  >
                    <div className="relative overflow-hidden border-b-2 drop-shadow flex-grow-[1]">
                      <img
                        src={product.img}
                        loading="lazy"
                        alt={product.name}
                        className="w-full object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                      {/* <div className="card-img-background bg-cover bg-main"></div> */}
                    </div>
                    <div className="flex flex-col justify-between flex-grow-[2] px-2 pt-2">
                      <div className="pb-2">
                        <h2 className="text-main text-[20px] font-bold truncate w-full text-lines-1">
                          {product.name}
                        </h2>
                        <p className="text-main text-lines-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex pb-3">
                        <p className="text-two text-[16px] md:text-[20px] font-bold">
                          {product.price} L.E
                          {/* <span className="text-[#595959] inline-flex text-[16px] ps-1 font-light line-through align-bottom">
                            {product.before} L.E
                          </span> */}
                        </p>
                        <p className="text-[#595959] text-[14px] md:text-[16px] ps-1 line-through self-end">
                          {product.before} L.E
                        </p>
                      </div>
                      {/* <div
                        className={`absolute top-[8.5rem] md:top-[15.5rem] left-[0.25rem] text-main px-2 py-1 rounded-md text-xs`}
                      >
                        Stock: {product.countInStock}
                      </div> */}
                    </div>
                  </div>
                  <div className="pb-2 px-2">
                    <Button
                      onClick={() => addToCart(product)}
                      className="rounded-sm relative z-50 w-full bg-transparent text-main md:py-5 py-4 text-[14px] md:text-[16px] border border-main hover:font-bold hover:text-two hover:bg-main"
                    >
                      ADD TO CARD
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
