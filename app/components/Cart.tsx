/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosConfig";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
  quantity: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const router = useRouter();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const fetchCartFromBackend = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        alert("Please log in to access your cart.");
        // router.push("/login");
        return;
      }

      const response = await axiosInstance.get(`/products/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);

      const cart = response?.data || [];
      setCartItems(cart);
      updateTotalPrice(cart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const updateCartInBackend = async (productId: string, change: number) => {
    setLoading((prev) => ({ ...prev, [productId]: true }));

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      await axiosInstance.put(
        `/products/cart/${userId}`,
        { productId, change },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading((prev) => ({ ...prev, [productId]: false }));
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  const updateTotalPrice = (cart: any[]) => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * (item.product.quantity || 1),
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = async (productId: string, change: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item._id === productId) {
          const newQuantity = (item.quantity || 1) + change;
          if (newQuantity <= 0) return null; // Remove item if quantity <= 0
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item !== null) as Product[];

    setCartItems([...updatedCart]);
    updateTotalPrice(updatedCart);

    // Update the backend and refetch the cart for consistency
    await updateCartInBackend(productId, change);
    fetchCartFromBackend();
  };

  const navigateToCheckout = () => {
    router.push("/checkout");
  };
  // console.log(cartItems);

  return (
    <div className="flex flex-col md:flex-row px-4 justify-center w-full min-h-dvh items-center gap-2 bg-white md:bg-transparent mt-20 md:mt-0">
      {/* Product List Section */}
      <div className="w-full md:w-2/3 py-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 bg-white md:bg-transparent">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item?.product?._id}
                className="bg-white shadow-md rounded-lg p-2 flex justify-between items-start"
              >
                <img
                  src={item?.product?.img}
                  alt={item?.product?.name}
                  className="w-32 h-32  object-cover rounded-md mb-2"
                />
                <div className="flex flex-col w-full justify-between h-full">
                  {" "}
                  <h2 className="text-[1.5rem] font-medium text-main mb-1">
                    {item?.product?.name}
                  </h2>
                  <p className=" text-two">
                    <span className="text-main">Price:</span> $
                    {item?.product?.price?.toFixed(2)}
                  </p>
                  <div className="flex space-x-2 mt-2 items-center justify-around">
                    <button
                      disabled={loading[item?.product?._id]}
                      onClick={() =>
                        handleQuantityChange(item?.product?._id, 1)
                      }
                      className={`px-4 py-2 ${
                        loading[item?.product?._id]
                          ? "bg-gray-300 text-gray-500"
                          : "bg-main text-two"
                      } md:hover:bg-gray-300 text-sm font-bold`}
                    >
                      {loading[item?.product?._id] ? "..." : "+"}
                    </button>
                    <p className="text-xs text-main">
                      Quantity:{" "}
                      {loading[item?.product?._id] ? "..." : item?.quantity}
                    </p>
                    <button
                      disabled={loading[item?.product?._id]}
                      onClick={() =>
                        handleQuantityChange(item?.product?._id, -1)
                      }
                      className={`px-4 py-2 ${
                        loading[item?.product?._id]
                          ? "bg-gray-300 text-gray-500"
                          : "bg-main text-two"
                      } md:hover:bg-gray-300 text-sm font-bold`}
                    >
                      {loading[item._id] ? "..." : "-"}
                    </button>
                  </div>
                </div>
                {/* <div className=" text-main">X</div> */}
              </div>
            ))
          ) : (
            <div className="text-center text-two w-full">
              <p>Your cart is empty. Add some products to continue.</p>
              <Link href="/" className="text-two underline">
                Go to Shop
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Summary Section */}
      {cartItems.length > 0 ? (
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-main mb-4">
            Checkout Summary
          </h2>
          <p className="text-main mb-2">
            Total Price:{" "}
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-main mb-2">
            Total Products:{" "}
            <span className="font-bold">{cartItems?.length}</span>
          </p>
          <button
            onClick={navigateToCheckout}
            className="w-full bg-main text-two py-2 rounded-md hover:bg-two hover:text-main"
          >
            Proceed to Checkout
          </button>
          <div className="bg-white p-3 rounded-lg shadow-md mb-4 mt-5">
            <h3 className="text-lg font-semibold text-main mb-2">Receipt</h3>
            <ul className="text-sm text-main">
              {cartItems.map((item) => (
                <li key={item?.product?._id} className="flex justify-between">
                  <span>{item?.product?.name}</span>
                  <span>
                    ${(item?.product?.price * item?.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="text-left mt-2 font-semibold text-two">
              <span className="text-main">Total:</span> ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
