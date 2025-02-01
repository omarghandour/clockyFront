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
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>();
  const [checkoutError, setCheckoutError] = useState();
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

      const userId =
        typeof window !== "undefined" ? localStorage.getItem("userId") : null;

      if (!userId) {
        alert("User ID not found. Please log in.");
        return;
      }

      axiosInstance
        .get(`/products/cart/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          const cart = response.data.products || [];
          setCartItems(cart);
          updateTotalPrice(cart);
        })
        .catch((error) => {
          console.error("Failed to fetch cart:", error);
          if (error.response?.status === 401) {
            alert("Session expired. Please log in again.");
          }
        });
    } else {
      alert("Please log in to view your cart.");
    }
  }, [router]);

  const updateTotalPrice = (cart: any[]) => {
    const total = cart?.reduce(
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const checkoutPayload = {
        userId: localStorage.getItem("userId"),
        paymentMethod: userInfo.paymentMethod,
        shippingAddress: {
          fullName: userInfo.fullName,
          governorate: userInfo.governorate,
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
        router.push("/success");
      }
    } catch (error: any) {
      setCheckoutError(error.message);
      console.error("Checkout failed:", error);
    }
  };

  return (
    <div className="p-4 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg text-main mt-20 md:mt-0">
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
              {discountAmount && (
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
                Total Price: {(discountedPrice || totalPrice).toFixed(2)} LE +
                100 LE Shipping
              </h3>
            </div>
            {checkoutError && (
              <p className="text-red-500 text-sm mt-4">{checkoutError}</p>
            )}
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
