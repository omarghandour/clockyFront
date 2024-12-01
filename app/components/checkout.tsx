"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";
import Login from "./Login";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    governorate: "",
    address: "",
    city: "",
    country: "Egypt",
    phoneNumber: "",
    paymentMethod: "",
  });
  const router = useRouter();
  // Fetch cart from backend using user ID
  useEffect(() => {
    const userToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (userToken) {
      setToken(userToken);

      // Assuming the user ID is encoded in the token or stored separately
      const userId =
        typeof window !== "undefined" ? localStorage.getItem("userId") : null;

      if (!userId) {
        alert("User ID not found. Please log in.");
        // router.push("/login");
        return;
      }

      axiosInstance
        .get(`/products/cart/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          const cart = response.data || [];
          setCartItems(cart);
          updateTotalPrice(cart);
        })
        .catch((error) => {
          console.error("Failed to fetch cart:", error);
          if (error.response?.status === 401) {
            alert("Session expired. Please log in again.");
            // router.push("/login");
          }
        });
    } else {
      alert("Please log in to view your cart.");
      // router.push("/login");
    }
  }, [router]);

  const updateTotalPrice = (cart: any[]) => {
    const total = cart.reduce(
      (sum, item) =>
        sum + item?.product?.price * (item?.product?.quantity || 1),
      0
    );
    setTotalPrice(total);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const checkoutPayload = {
        userId: localStorage.getItem("userId"),
        // products: cartItems.map((item) => ({
        //   productId: item._id,
        //   quantity: item.quantity || 1,
        //   price: item.price * (item.quantity || 1),
        //   name: item.name,
        // })),
        totalPrice,
        paymentMethod: userInfo.paymentMethod,
        shippingAddress: {
          fullName: userInfo.fullName,
          governorate: userInfo.governorate,
          address: userInfo.address,
          country: userInfo.country,
          city: userInfo.city,
          phone: userInfo.phoneNumber,
        },
      };

      const response = await axiosInstance.post(
        `/products/checkout`,
        checkoutPayload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert("Checkout completed successfully!");
        setCartItems([]);
        router.push("/");
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg text-main mt-12 md:mt-0">
      {token ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={userInfo.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Governorate */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Governorate
              </label>
              <select
                name="governorate"
                value={userInfo.governorate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Governorate</option>
                <option value="Cairo">Cairo</option>
                <option value="Alexandria">Alexandria</option>
                {/* Add other governorates */}
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* City */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">City</label>
              <input
                type="text"
                name="city"
                value={userInfo.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={userInfo.country}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={userInfo.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Pay with Card">Credit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            {/* Total Price */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                Total Price: ${totalPrice.toFixed(2)}
              </h3>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-main text-two font-semibold rounded hover:bg-two hover:text-main"
            >
              Proceed to Checkout
            </button>
          </form>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Checkout;
