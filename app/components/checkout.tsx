"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosConfig";
import { useRouter } from "next/navigation";
import Login from "./Login";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [checkoutError, setCheckoutError] = useState<string>();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    lastName: "",
    governorate: "",
    address: "",
    city: "",
    country: "Egypt",
    phoneNumber: "",
    paymentMethod: "",
    email: "", // Add email field
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch cart from backend using user ID or local storage if no token and userId
  useEffect(() => {
    const userToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    setToken(userToken);

    const userId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;

    if (userToken && userId) {
      axiosInstance
        .get(`/products/cart/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          const cart = response.data.products || [];
          setCartItems(cart);
          updateTotalPrice(cart);
          console.log(cart);
        })
        .catch((error) => {
          console.error("Failed to fetch cart:", error);
          if (error.response?.status === 401) {
            alert("Session expired. Please log in again.");
          }
        });
    } else {
      // Get cart from local storage if no token and userId
      const storedCart =
        typeof window !== "undefined"
          ? JSON.parse(localStorage.getItem("cart") || "[]")
          : null;
      console.log(storedCart);

      setCartItems(storedCart);
      updateTotalPrice(storedCart);
    }
  }, [router]);

  const updateTotalPrice = (cart: any[]) => {
    const total = cart?.reduce(
      (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 1),
      0
    );
    setTotalPrice(total);
    setDiscountedPrice(total); // Reset discounted price to total price initially
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleCouponApply = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/products/coupon/code?code=${couponCode?.toLowerCase()}`
      );
      const coupon = response.data.code;

      if (!coupon.valid) {
        setCouponError("Coupon is not valid.");
        return;
      }

      if (coupon.usedCount >= coupon.maxUsage) {
        setCouponError("Coupon usage limit exceeded.");
        return;
      }

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        setCouponError("Coupon has expired.");
        return;
      }

      // Apply the discount
      const discountAmount = (totalPrice * coupon.discount) / 100;
      setDiscountAmount(discountAmount);
      setDiscountedPrice(totalPrice - discountAmount);

      setCouponError(null);
    } catch (error) {
      console.error("Failed to validate coupon:", error);
      setCouponError("Invalid coupon code.");
    }
  };
  const validateCart = async (couponCode: string) => {
    try {
      // validate Cart without authorization
      const response = await axiosInstance.post("/products/validate/cart", {
        cart: cartItems,
        couponCode,
      });
      console.log(response.data);
      handlePayMobPayment(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to validate cart:", error);
      return false;
    }
  };
  const handlePayMobPayment = async (prices: {
    finalTotalPrice: number;
    totalPrice: number;
  }) => {
    try {
      const { data } = await axios.post(
        "https://accept.paymob.com/v1/intention/",
        {
          amount: prices.finalTotalPrice
            ? prices.finalTotalPrice * 100
            : prices.totalPrice * 100,
          currency: "EGP",
          payment_methods: [5018300],
          items: cartItems.map((item: any) => ({
            name: item.product.name,
            amount: item.product.price * 100,
            description: item.product._id,
            quantity: item.quantity,
            image: item.product.img,
          })),
          billing_data: {
            apartment: "NA",
            first_name: userInfo.fullName,
            last_name: userInfo.lastName,
            street: userInfo.address,
            building: "NA",
            phone_number: userInfo.phoneNumber,
            city: userInfo.city,
            country: userInfo.country,
            email: userInfo.email || "NA",
            floor: "NA",
            state: userInfo.governorate,
          },
          expiration: 3600,
          redirection_url: `${window.location.origin}/success`,
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PAYMOB_API_KEY || "",
          },
        }
      );
      // save the order to the local storage
      localStorage.setItem("order", JSON.stringify({ data }));
      // REDIRECT TO PAYMOB
      // EMPTY THE CART
      // setCartItems([]);
      // localStorage.removeItem("cart");
      router.push(
        `https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PMPKEY}&clientSecret=${data.client_secret}`
      );
    } catch (error) {
      console.error("PayMob payment error:", error);
      setCheckoutError("Payment gateway error. Please try again.");
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (userInfo.paymentMethod === "Pay with Card") {
      await validateCart(couponCode);
      return;
    }
    try {
      // ...existing checkout logic...

      const checkoutPayload = {
        userId: localStorage.getItem("userId"),
        cart: cartItems,
        paymentMethod: userInfo.paymentMethod,
        shippingAddress: {
          fullName: userInfo.fullName,
          lastName: userInfo.lastName,
          governorate: userInfo.governorate,
          email: userInfo.email,
          address: userInfo.address,
          country: userInfo.country,
          city: userInfo.city,
          phone: userInfo.phoneNumber,
        },
        couponCode: couponCode?.toLowerCase() || null, // Include the coupon code in the checkout
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
        localStorage.removeItem("cart"); // Clear the cart from local storage
        router.push("/success");
      }
    } catch (error: any) {
      setCheckoutError(error.message);
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg text-main mt-20 md:mt-0">
      {/* {token ? ( */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              First Name
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
          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={userInfo.lastName}
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
              <option value="Giza">Giza</option>
              <option value="Sharkia">Sharkia</option>
              <option value="Dakahlia">Dakahlia</option>
              <option value="Beheira">Beheira</option>
              <option value="Qalyubia">Qalyubia</option>
              <option value="Monufia">Monufia</option>
              <option value="Gharbia">Gharbia</option>
              <option value="Kafr El Sheikh">Kafr El Sheikh</option>
              <option value="Damietta">Damietta</option>
              <option value="Port Said">Port Said</option>
              <option value="Ismailia">Ismailia</option>
              <option value="Suez">Suez</option>
              <option value="North Sinai">North Sinai</option>
              <option value="South Sinai">South Sinai</option>
              <option value="Matrouh">Matrouh</option>
              <option value="New Valley">New Valley</option>
              <option value="Red Sea">Red Sea</option>
              <option value="Luxor">Luxor</option>
              <option value="Aswan">Aswan</option>
              <option value="Sohag">Sohag</option>
              <option value="Qena">Qena</option>
              <option value="Minya">Minya</option>
              <option value="Beni Suef">Beni Suef</option>
              <option value="Faiyum">Faiyum</option>
              <option value="Asyut">Asyut</option>
            </select>
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Address</label>
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
            <label className="block text-sm font-semibold mb-1">Country</label>
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

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
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
              <option value="Pay with Card">Pay With Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {/* Coupon Code */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode?.toLowerCase()}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter coupon code"
              />
              <button
                type="button"
                onClick={handleCouponApply}
                className="p-2 bg-main text-two font-semibold rounded hover:bg-two hover:text-main"
              >
                Apply
              </button>
            </div>
            {discountAmount > 0 && (
              <p className="text-main text-sm mt-1">
                Discount applied: -${discountAmount.toFixed(2)}
              </p>
            )}
            {couponError && (
              <p className="text-red-500 text-sm mt-1">{couponError}</p>
            )}
          </div>

          {/* Total Price */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Price: {discountedPrice || totalPrice} LE + 100 LE Shipping
            </h3>
            <p className="text-main text-sm mt-1">
              Total {(discountedPrice || totalPrice) + 100} LE
            </p>
          </div>
          {checkoutError && (
            <p className="text-red-500 text-sm mt-4">{checkoutError}</p>
          )}
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-main text-two font-semibold rounded hover:bg-two hover:text-main disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </form>
      </div>
      {/* // ) : ( */}
      {/* <Login /> */}
      {/* // )} */}
    </div>
  );
};

export default Checkout;
