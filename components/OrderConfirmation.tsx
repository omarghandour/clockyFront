"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderDetails = {
  userId: string;
  products: Product[];
  totalPrice: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    governorate: string;
    address: string;
    country: string;
    city: string;
    phone: string;
  };
};

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderDetails");
    if (storedOrder) {
      setOrderDetails(JSON.parse(storedOrder));
    } else {
      router.push("/"); // Redirect if no order details are available
    }
  }, [router]);

  if (!orderDetails) {
    return <p>Loading order details...</p>;
  }

  const { products, totalPrice, paymentMethod, shippingAddress } = orderDetails;

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg text-main">
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <p className="text-lg font-semibold mb-4">
        Thank you for your order, {shippingAddress.fullName}!
      </p>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Summary:</h3>
        {products.map((product) => (
          <div key={product._id} className="py-2 border-b">
            <p className="font-semibold">{product.name}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Shipping Address:</h3>
        <p>
          {shippingAddress.address}, {shippingAddress.city}
        </p>
        <p>
          {shippingAddress.governorate}, {shippingAddress.country}
        </p>
        <p>Phone: {shippingAddress.phone}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Payment Method:</h3>
        <p>{paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Total Price:</h3>
        <p className="text-main font-bold">${totalPrice.toFixed(2)}</p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="w-full py-2 bg-main text-two font-semibold rounded hover:bg-two hover:text-main"
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
