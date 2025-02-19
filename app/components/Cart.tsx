"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosConfig";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  countInStock: number;
  img: string;
  quantity: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log(cartItems);

    if (userId) {
      syncLocalCartWithBackend();
      fetchCartFromBackend();
    } else {
      fetchLocalCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLocalCart = () => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(localCart);
    updateTotalPrice(localCart);
  };

  const fetchCartFromBackend = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      // if (!userId || !token) return;

      const res = await axiosInstance.get(`/products/cart/${userId}`, {
        withCredentials: true,
      });
      const updatedCart = res.data.products.map((item: any) => ({
        product: { ...item.product },
        quantity: item.quantity,
      }));

      setCartItems(updatedCart || []);
      updateTotalPrice(updatedCart || []);
    } catch (error: any) {
      console.error("Failed to fetch cart from backend:", error);
      if (error?.response?.status === 401) {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  const syncLocalCartWithBackend = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (userId && token && localCart.length > 0) {
        await axiosInstance.post(
          `/products/cart/all/${userId}`,
          { cart: localCart },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.removeItem("cart");
        fetchCartFromBackend();
      }
    } catch (error) {
      console.error("Failed to sync local cart with backend:", error);
    }
  };

  const mergeCarts = (
    localCart: CartItem[],
    backendCart: CartItem[]
  ): CartItem[] => {
    const productMap = new Map<string, CartItem>();

    backendCart.forEach((item) => {
      productMap.set(item.product._id, { ...item });
    });

    localCart.forEach((localItem) => {
      const existingItem = productMap.get(localItem.product._id);
      if (existingItem) {
        productMap.set(localItem.product._id, {
          ...existingItem,
          quantity: existingItem.quantity + localItem.quantity,
        });
      } else {
        productMap.set(localItem.product._id, { ...localItem });
      }
    });

    return Array.from(productMap.values());
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
    } catch (error) {
      console.error("Failed to update cart in backend:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const updateTotalPrice = (cart: CartItem[]) => {
    const total = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleQuantityChange = async (productId: string, change: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + change) }
        : item
    );

    setCartItems(updatedCart);
    updateTotalPrice(updatedCart);

    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        await updateCartInBackend(productId, change);
      } catch (error) {
        console.error("Error updating backend:", error);
      } finally {
        fetchCartFromBackend();
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const navigateToCheckout = () => {
    // const userId = localStorage.getItem("userId");
    // const token = localStorage.getItem("token");
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col md:flex-row px-4 justify-center w-full min-h-dvh items-center gap-2 bg-white md:bg-transparent mt-20 md:mt-0">
      <div className="w-full md:w-2/3 py-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 grid-cols-1 bg-white md:bg-transparent">
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }) => (
              <div
                key={product?._id}
                className="bg-white shadow-md rounded-lg p-2 flex justify-between items-start"
              >
                <Image
                  src={product?.img}
                  alt={product?.name}
                  width={128}
                  height={128}
                  className="object-cover rounded-md mb-2"
                />
                <div className="flex flex-col w-full justify-between h-full">
                  <h2 className="text-[1.5rem] font-medium text-main mb-1">
                    {product.name}
                  </h2>
                  <p className="text-two">
                    <span className="text-main">Price:</span>
                    {product?.price?.toFixed(2)} LE
                  </p>
                  <div className="flex space-x-2 mt-2 items-center justify-around">
                    <button
                      disabled={loading[product?._id]}
                      onClick={() => handleQuantityChange(product?._id, 1)}
                      className={`px-4 py-2 ${
                        loading[product?._id]
                          ? "bg-gray-300 text-gray-500"
                          : "bg-main text-two"
                      } md:hover:bg-gray-300 text-sm font-bold`}
                    >
                      {loading[product._id] ? "..." : "+"}
                    </button>
                    <p className="text-xs text-main">
                      Quantity: {loading[product?._id] ? "..." : quantity}
                    </p>
                    <button
                      disabled={loading[product?._id]}
                      onClick={() => handleQuantityChange(product?._id, -1)}
                      className={`px-4 py-2 ${
                        loading[product?._id]
                          ? "bg-gray-300 text-gray-500"
                          : "bg-main text-two"
                      } md:hover:bg-gray-300 text-sm font-bold`}
                    >
                      {loading[product?._id] ? "..." : "-"}
                    </button>
                  </div>
                </div>
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

      {cartItems.length > 0 && (
        <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-main mb-4">
            Checkout Summary
          </h2>
          <p className="text-main mb-2">
            Total Price:{" "}
            <span className="font-bold">EGP {totalPrice.toFixed(2)}</span>
          </p>
          <p className="text-main mb-2">
            Total Products:{" "}
            <span className="font-bold">{cartItems.length}</span>
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
              {cartItems.map(({ product, quantity }) => (
                <li key={product?._id}>
                  {quantity}x {product?.name} (EGP {product?.price?.toFixed(2)})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
