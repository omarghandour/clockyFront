/* eslint-disable @next/next/no-img-element */
import { toast, useToast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosConfig";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"; // Solid heart for favorite
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"; // Outline heart for not favorite
import { CarouselDApiDemo } from "@/components/imagesSlider";

type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
  otherImages?: string[];
};
const Card = ({ product }: { product: Product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (storedUserId && product._id) {
      checkIfFavorite(storedUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product._id]);
  const addToCart = async (product: Product) => {
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
      const response = await axiosInstance.post("/products/cart/add/one", {
        userId,
        productId: product._id,
        quantity: 1,
      });

      if (response.status === 200) {
        toast({
          title: "Success!",
          description: (
            <p className="text-two">Successfully added to cart! 🎉</p>
          ),
          action: (
            <Link
              href="/cart"
              className="bg-two hover:bg-green-600 text-main text-sm px-5 py-2 rounded shadow transition duration-200"
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

  // Check if the product is in the user's favorite list
  const checkIfFavorite = async (userId: string) => {
    try {
      const res = await axios.post(
        `https://clockyexpress.vercel.app/api/products/isFavorite/${userId}`,
        {
          ProductId: product._id,
        }
      );
      setIsFavorite(res.data.isFavorite);
    } catch (error: any) {
      console.error("Error checking favorite:", error);
    }
  };
  // Add to Favorites functionality
  const handleAddToFavorites = async () => {
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        // Remove from favorites
        await axiosInstance.delete(`/products/favorites/${userId}`, {
          data: { ProductId: product._id },
        });
        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
        });
      } else {
        // Add to favorites
        await axiosInstance.post(`/products/favorites/${userId}`, {
          ProductId: product._id,
        });
        setIsFavorite(true);
        toast({
          title: "Added to favorites",
        });
      }
    } catch (error: any) {
      console.error("Error updating favorite status:", error);
      toast({
        title: "error",
        description: "You are not logged in please login and try again",
        variant: "destructive",
        action: <Link href="/login">Go to login page</Link>,
      });
      setFavoriteLoading(false);
    } finally {
      setFavoriteLoading(false);
    }
  };
  const images = [product.img, ...(product.otherImages || [])]; // Fallback if `otherImages` is undefined or empty
  return (
    <div
      className={`
                  rounded-md z-0 relative overflow-hidden mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col shadow transition-transform duration-300 transform w-full flex-grow`}
    >
      {product.before && (
        <p className="text-red-500 absolute z-20 right-0 pt-1 pr-2 text-[12px] md:text-[14px] font-bold ml-2">
          -
          {Math.round(
            ((product.before - product.price) / product.before) * 100
          )}
          %
        </p>
      )}
      <button
        className={`text-white p-2 rounded-md absolute z-20   center ${
          isFavorite ? " text-main " : ""
        }  hover:text-main `}
        onClick={handleAddToFavorites}
        disabled={favoriteLoading}
      >
        {favoriteLoading ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin  " />
        ) : (
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className={` transition-all duration-300 transform  ${
              isFavorite ? "scale-125 text-two" : "text-main"
            }`}
          />
        )}
      </button>
      <div
        onClick={() => {
          router.push(`product/${product._id}`);
        }}
        className="flex w-full flex-col h-full cursor-pointer"
      >
        <div className="relative overflow-hidden border-b-2 drop-shadow flex-grow-[1]">
          {/* Carousel Component */}
          <CarouselDApiDemo images={images} />
          {/* <div className="card-img-background bg-cover bg-main"></div> */}
        </div>
        <div className="flex flex-col justify-between flex-grow-[2] px-2 pt-2">
          <div className="pb-2">
            <h2 className="text-main text-[14px] md:text-[20px] font-bold truncate w-full text-lines-1">
              {product.name}
            </h2>
            <p className="text-main text-[14px] md:text-[16px] font-thin text-lines-1 md:text-lines-2">
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
            <p
              className={`text-[#595959] text-[14px] md:text-[16px] ps-1 line-through self-end ${
                product.before === null || product.before === undefined
                  ? "hidden"
                  : ""
              }`}
            >
              {product.before} L.E
            </p>
          </div>
        </div>
      </div>
      <div className="pb-2 px-2 ">
        <button
          onClick={() => addToCart(product)}
          className="rounded-sm relative z-50 w-full bg-transparent text-main py-1 md:py-2 md:text-[14px] border-[0.5px] border-main hover:font-bold hover:text-two hover:bg-main"
        >
          ADD TO CARD
        </button>
      </div>
    </div>
  );
};

export default Card;
