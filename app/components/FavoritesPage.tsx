/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"; // Spinner for loading
import Watch from "../../public/watch.png"; // Fallback image
import Loading from "./Loading";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]); // Store favorite products
  const [loading, setLoading] = useState(true); // Manage loading state
  const [userId, setUserId] = useState(""); // Store userId from localStorage
  const [removingFavoriteId, setRemovingFavoriteId] = useState<string | null>(
    null
  ); // Track which favorite is being removed
  const { toast } = useToast();

  // Get the userID from localStorage
  useEffect(() => {
    const userID: any = localStorage.getItem("userId");
    setUserId(userID);

    // Get favorites from local storage first
    const localFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(localFavorites);
    setLoading(false);

    if (userID && userID !== undefined && userID !== null) {
      fetchFavorites(userID);
    }
  }, []);

  // Fetch user's favorite products
  const fetchFavorites = async (userID: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/products/favorites/${userID}`);
      setFavorites(res.data);
    } catch (error: any) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove product from favorites
  const handleRemoveFavorite = async (productId: string) => {
    setRemovingFavoriteId(productId); // Indicate which favorite is being removed
    try {
      if (!userId) {
        // User is not logged in, remove from local storage only
        const updatedFavorites = favorites.filter(
          (product) => product._id !== productId
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
        toast({
          title: "Removed from favorites",
        });
      } else {
        // User is logged in, remove from API
        await axiosInstance.delete(`/products/favorites/${userId}`, {
          data: { ProductId: productId },
        });
        const updatedFavorites = favorites.filter(
          (product) => product._id !== productId
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
        toast({
          title: "Removed from favorites",
        });
      }
    } catch (error: any) {
      console.error("Error removing favorite:", error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRemovingFavoriteId(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {/* <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> */}
        <Loading />
      </div>
    );
  }

  if (favorites?.length === 0) {
    return (
      <div className="text-center text-white text-pretty mt-20">
        <h2 className="text-2xl">No favorites yet!</h2>
        <p>Explore products and add them to your favorites.</p>
        <Link href="/products" className="text-main underline mt-5 block">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-col flex items-center h-full mt-20 w-full text-pretty mb-5">
      <h1 className="text-3xl mb-10 text-white">Your Favorite Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-10">
        {favorites?.map((product: any) => (
          <div
            key={product._id}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md"
          >
            <img
              src={product.img || Watch}
              alt={product.name || "Product Image"}
              className="w-[250px] md:w-[350px] object-cover"
            />
            <h3 className="text-lg font-semibold text-center mt-4">
              {product.name}
            </h3>
            <p className="text-[#D4AF37B2] text-lg">EGP {product.price}</p>
            <div className="flex justify-between w-full mt-4">
              <Link href={`/product/${product._id}`}>
                <button className="bg-main text-white px-4 py-2 rounded-md hover:bg-two">
                  View Details
                </button>
              </Link>
              <button
                onClick={() => handleRemoveFavorite(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
                disabled={removingFavoriteId === product._id}
              >
                {removingFavoriteId === product._id ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  <FontAwesomeIcon icon={solidHeart} className="mr-2" />
                )}
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
