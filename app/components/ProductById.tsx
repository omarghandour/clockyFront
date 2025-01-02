/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Mytable from "./Mytable";
import axiosInstance from "@/lib/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faStar,
  faHeart as regularHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import { CarouselDApiDemo } from "@/components/imagesSlider";
import Card from "./Card";
import debounce from "lodash.debounce";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ProductById = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    fetchUserRating();
    const userID = localStorage.getItem("userId");
    setUserId(userID);

    if (userID && id) {
      checkIfFavorite(userID);
    }
    fetchProduct();
    fetchRatings();
  }, [id]);

  const fetchRatings = async () => {
    try {
      const res = await axios.get(
        `https://express.clockyeg.com/api/products/${id}/ratings`,
        {
          withCredentials: true,
        }
      );

      setAverageRating(res.data.averageRating);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  const submitRating = async (rating: number) => {
    if (!userId) {
      toast({
        title: "Not logged in",
        description: "Please log in to rate this product.",
        variant: "destructive",
        action: <Link href="/login">Go to login</Link>,
      });
      return;
    }

    try {
      await axios.patch(
        `https://express.clockyeg.com/api/products/${id}/ratings`,
        { rating },
        { withCredentials: true }
      );
      toast({
        title: "Rating submitted",
        description: `You rated this product ${rating} stars.`,
      });
      setUserRating(rating);
      fetchRatings(); // Update the average rating after submission
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast({
        title: "Error",
        description: "Could not submit your rating. Please try again later.",
        variant: "destructive",
      });
    }
  };
  const fetchUserRating = async () => {
    try {
      const { data } = await axios.get(
        `https://express.clockyeg.com/api/products/${id}/rating`,
        { withCredentials: true }
      );
      // console.log(data.rating.rating);

      setUserRating(data.rating.rating);
      // fetchRatings(); // Update the average rating after submission
    } catch (error) {
      console.error("Error submitting rating:", error);
      // toast({
      //   title: "Error",
      //   description: "Could not submit your rating. Please try again later.",
      //   variant: "destructive",
      // });
    }
  };
  const renderStars = (count: number, onClick?: (index: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`cursor-pointer ${
          index < count ? "text-yellow-500" : "text-gray-300"
        }`}
        onClick={() => onClick && onClick(index + 1)}
      />
    ));
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://express.clockyeg.com/api/products/${id}`,
        { withCredentials: true }
      );
      setProduct(res.data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const checkIfFavorite = async (userId: string) => {
    try {
      const res = await axios.post(
        `https://express.clockyeg.com/api/products/isFavorite/${userId}`,
        { ProductId: id },
        { withCredentials: true }
      );
      setIsFavorite(res.data.isFavorite);
    } catch (error: any) {
      console.error("Error checking favorite:", error);
    }
  };

  const handleAddToFavorites = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await axiosInstance.delete(`/products/favorites/${userId}`, {
          data: { ProductId: product._id },
        });
        setIsFavorite(false);
        toast({ title: "Removed from favorites" });
      } else {
        await axiosInstance.post(`/products/favorites/${userId}`, {
          ProductId: product._id,
        });
        setIsFavorite(true);
        toast({ title: "Added to favorites" });
      }
    } catch (error: any) {
      console.error("Error updating favorite status:", error);
      toast({
        title: "Error",
        description: "You are not logged in. Please login and try again.",
        variant: "destructive",
        action: <Link href="/login">Go to login page</Link>,
      });
    } finally {
      setFavoriteLoading(false);
    }
  };
  const handleAddToCart = async () => {
    if (!userId) {
      toast({
        title: "Not logged in",
        description: "Please log in to add items to your cart.",
        variant: "destructive",
        action: <Link href="/login">Go to login</Link>,
      });
      return;
    }
    try {
      const response = await axiosInstance.post(
        "/products/cart/add/one",
        {
          userId,
          productId: product._id,
          quantity: quantity || 1,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success!",
          description: (
            <p className="text-two">Successfully added to cart! 🎉</p>
          ),
          action: (
            <Link
              href="/cart"
              className="bg-two hover:bg-main text-main text-sm px-5 py-2 rounded shadow transition duration-200"
            >
              Go to Cart
            </Link>
          ),
          style: {
            backgroundColor: "#414B43", // Soft yellow background
            color: "#e3c578", // Deep green text color
            borderRadius: "7px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            border: "none",
          },
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Could not add product to cart. Please try again later.",
        variant: "destructive",
      });
    }
  };
  if (loading) {
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = [product.img, ...(product.otherImages || [])];
  // suggestion
  const Search = () => {
    // const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const { toast } = useToast();
    const [activeProductId, setActiveProductId] = useState<string | null>(null);
    // const [results, setResults] = useState<any[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      }
    };
    // Debounced search function
    const handleSearch = debounce(async (searchTerm: string) => {
      try {
        if (searchTerm.trim()) {
          const response = await axios.get(
            `https://express.clockyeg.com/api/products/search?keyword=${searchTerm}`
          );
          setResults(response.data);
        } else {
          setResults([]); // Clear results if the search term is empty
        }
      } catch (error) {
        console.error("Error searching products", error);
      }
    }, 300); // 300ms debounce time to limit API calls

    // Trigger search when query changes
    useEffect(() => {
      handleSearch(product?.name);
    }, [product?.name]); // Re-run the search whenever the query changes

    const addToCart = async (product: any) => {
      if (!userId) {
        toast({
          title: "Not logged in",
          description: "Please log in to add items to your cart.",
          variant: "destructive",
          action: <Link href="/login">Go to login</Link>,
        });
        return;
      }

      setActiveProductId(product._id);
      setTimeout(() => {
        setActiveProductId(null);
      }, 1000);

      try {
        const response = await axiosInstance.post(
          "/products/cart/add/one",
          {
            userId,
            productId: product._id,
            quantity: 1,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          toast({
            title: product.name,
            description: "Added to cart successfully!",
            action: <Link href="/cart">Go to cart</Link>,
          });
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast({
          title: "Error",
          description: "Could not add product to cart. Please try again later.",
          variant: "destructive",
        });
      }
    };

    return (
      <div className="px- h-full mx-auto mt-5 text-base flex flex-col items-center w-full mb-2">
        <h1 className="text-2xl font-bold text-center mb-5">More Like This</h1>
        {results.length > 0 ? (
          <div className="flex flex-col w-full">
            {/* Left Arrow */}
            <div
              className={`w-full flex justify-between ${
                results.length > 2 ? "" : "hidden"
              }`}
            >
              <button
                className=" left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
                onClick={scrollLeft}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className=" right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
                onClick={scrollRight}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            {/* Scrollable container */}
            <div
              className="flex space-x-4 overflow-x-auto custom-scroll-hide w-full"
              ref={scrollContainerRef}
            >
              {results.map((product) => (
                <div
                  key={product._id}
                  className="max-w-[170px] md:max-w-[190px] flex-shrink-0 bg-white rounded-md"
                >
                  <Card product={product} />
                </div>
              ))}
            </div>
            {/* Right Arrow */}
          </div>
        ) : (
          <p className="mt-8 text-gray-500">No products found</p>
        )}
      </div>
    );
  };

  return (
    <div className="paddingX mx-auto flex-col flex items-center h-full mt-20 w-full text-pretty">
      <div className="flex md:flex-row items-center gap-8 justify-between w-full flex-col bg-white">
        <div className="mb-6 md:mb-0 ">
          <CarouselDApiDemo images={images} />
        </div>
        <div className="">
          <div className="flex flex-col justify-center  py-6 gap-4">
            <h1 className="text-[#2E2E2E] text-2xl text-left md:text-3xl w-full font-medium">
              {product.name}
            </h1>
            <p className="flex">Description: {product.description}</p>
            <div className="flex justify-evenly w-full gap-9 items-center">
              <p className="text-[#D4AF37B2] text-left  text-xl">
                EGP {product.price}
              </p>
              <div className="flex flex-row items-center gap-3">
                <h2 className="text-lg  font-medium ">Average Rating</h2>
                <div className="flex">{renderStars(averageRating)}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end flex-col py-2 gap-3">
            <div className="flex md:flex-col xl:flex-row  gap-2">
              <div className="flex items-center gap-2 w-full md:w-96 px-4 py-1 bg-main  justify-between">
                <button
                  className="px-4 py-2 bg-main text-two md:hover:bg-gray-300 text-xl font-bold"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="text-2xl font-bold text-white">
                  {quantity}
                </span>
                <button
                  className="px-4 py-2 bg-main text-two md:hover:bg-gray-300 text-xl font-bold"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <div className="center flex-col md:flex-row gap-3 bg-main p-2 w-full md:w-96">
                <h2 className="text-lg text-white ">Your Rating</h2>
                <div className="flex ">
                  {renderStars(userRating, (rating) => submitRating(rating))}
                </div>
              </div>
            </div>

            <div className="flex md:flex-col xl:flex-row gap-2">
              {" "}
              <button
                className="text-two px-4 py-3 w-full md:w-96 bg-main hover:bg-two hover:text-main"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
              <button
                className={`text-white px-4 py-3 w-full md:w-96 center ${
                  isFavorite ? "bg-two text-main " : "bg-main"
                } hover:bg-two hover:text-main relative`}
                onClick={handleAddToFavorites}
                disabled={favoriteLoading}
              >
                {favoriteLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    className="animate-spin mr-2 hover:text-main"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={isFavorite ? solidHeart : regularHeart}
                    className={`mr-2 transition-all duration-300 transform hover:text-main ${
                      isFavorite ? "scale-125 text-main" : "text-gray-300"
                    }`}
                  />
                )}
                <span className="hidden md:flex">
                  {isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Mytable product={product} />
      </div>
      <Search />
    </div>
  );
};

export default ProductById;
