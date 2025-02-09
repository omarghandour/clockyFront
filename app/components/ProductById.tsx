/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Mytable from "./Mytable";
import axiosInstance from "@/lib/axiosConfig";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faSpinner,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { CarouselDApiDemo } from "@/components/imagesSlider";
import Card from "./Card";
import debounce from "lodash.debounce";

const ProductById = () => {
  const { id }: any = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userID = localStorage.getItem("userId");
    setUserId(userID);
    fetchProduct();
    checkFavoriteStatus();
  }, [id]);

  const checkFavoriteStatus = useCallback(() => {
    const userID = localStorage.getItem("userId");
    if (userID) {
      checkIfFavorite(userID);
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const isFav = favorites.some((fav: any) => fav._id === id);
      setIsFavorite(isFav);
    }
  }, [id]);

  const checkIfFavorite = useCallback(
    async (userId: string) => {
      try {
        const res = await axios.post(
          `https://express.clockyeg.com/api/products/isFavorite/${userId}`,
          { ProductId: id },
          { withCredentials: true }
        );
        setIsFavorite(res.data.isFavorite);
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    },
    [id]
  );

  const fetchProduct = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://express.clockyeg.com/api/products/${id}`,
        { withCredentials: true }
      );
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  }, [id]);

  const handleAddToFavorites = async () => {
    setFavoriteLoading(true);
    try {
      if (!userId) {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (isFavorite) {
          const updatedFavorites = favorites.filter(
            (fav: any) => fav._id !== product._id
          );
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setIsFavorite(false);
          toast({ title: "Removed from favorites" });
        } else {
          const updatedFavorites = [...favorites, product];
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setIsFavorite(true);
          toast({ title: "Added to favorites" });
        }
      } else {
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
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast({
        title: "Error",
        description: "Could not update favorites. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!userId) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingProductIndex = cart.findIndex(
        (item: { product: { _id: string } }) => item.product._id === product._id
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({ product, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      toast({
        title: "Success!",
        description: <p className="text-two">Successfully added to cart! 🎉</p>,
        action: (
          <Link
            href="/cart"
            className="bg-two hover:bg-main text-main text-sm px-5 py-2 rounded shadow transition duration-200"
          >
            Go to Cart
          </Link>
        ),
        style: {
          backgroundColor: "#414B43",
          color: "#e3c578",
          borderRadius: "7px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          border: "none",
        },
      });
      return;
    }

    try {
      await axiosInstance.post(
        "/products/cart/add/one",
        {
          userId,
          productId: product._id,
          quantity: quantity || 1,
        },
        { withCredentials: true }
      );

      toast({
        title: "Success!",
        description: <p className="text-two">Successfully added to cart! 🎉</p>,
        action: (
          <Link
            href="/cart"
            className="bg-two hover:bg-main text-main text-sm px-5 py-2 rounded shadow transition duration-200"
          >
            Go to Cart
          </Link>
        ),
        style: {
          backgroundColor: "#414B43",
          color: "#e3c578",
          borderRadius: "7px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          border: "none",
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Could not add product to cart. Please try again later.",
        variant: "destructive",
      });
    }
  };

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

  const Search = () => {
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = useCallback(
      debounce(async (searchTerm: string) => {
        try {
          if (searchTerm.trim()) {
            const response = await axios.get(
              `https://express.clockyeg.com/api/products/search?keyword=${searchTerm}`
            );
            setResults(response.data);
          } else {
            setResults([]);
          }
        } catch (error) {
          console.error("Error searching products", error);
        }
      }, 300),
      []
    );

    useEffect(() => {
      handleSearch(product?.name);
    }, [product?.name, handleSearch]);

    return (
      <div className="px- h-full mx-auto mt-5 text-base flex flex-col items-center w-full mb-2">
        <h1 className="text-2xl font-bold text-center mb-5">More Like This</h1>
        {results.length > 0 ? (
          <div className="flex flex-col w-full">
            <div
              className={`w-full flex justify-between ${
                results.length > 2 ? "" : "hidden"
              }`}
            >
              <button
                className="left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
                onClick={scrollLeft}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className="right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
                onClick={scrollRight}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
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
          </div>
        ) : (
          <p className="mt-8 text-gray-500">No products found</p>
        )}
      </div>
    );
  };

  if (!product)
    return (
      <div className="w-full h-[100dvh] center">
        <div className="clock-loader"></div>
      </div>
    );

  const images = [product.img, ...(product.otherImages || [])];

  return (
    <div className="paddingX mx-auto flex-col flex items-center h-full mt-20 w-full text-pretty">
      <div className="flex md:flex-row items-center  justify-between w-full flex-col bg-white">
        <div className="w-full">
          <CarouselDApiDemo images={images} />
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex flex-col justify-center  py-6 gap-4">
            <h1 className="text-[#2E2E2E] text-2xl text-left md:text-3xl w-full font-medium">
              {product.name}
            </h1>
            <p className="flex">Description: {product.description}</p>
            <div className="flex justify-evenly w-full gap-9 items-center">
              <p className="text-[#D4AF37B2] text-left w-full  text-2xl">
                EGP {product.price}
                <span className="text-[#595959] inline-flex text-[16px] ps-1 font-light line-through align-bottom">
                  {product.before} L.E
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-end flex-col py-2 gap-3">
            <div className="flex md:flex-col xl:flex-row  gap-2">
              <div className="flex items-center gap-2 w-full md:w-[49.5%] px-4 py-1 bg-main  justify-between">
                <button
                  className="px-4 py-2  bg-main text-two md:hover:bg-two md:hover:text-main  text-xl font-bold"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="text-2xl font-bold text-white">
                  {quantity}
                </span>
                <button
                  className="px-4 py-2 bg-main text-two md:hover:bg-two md:hover:text-main text-xl font-bold"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex md:flex-col xl:flex-row gap-2">
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
