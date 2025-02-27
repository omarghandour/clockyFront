"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosConfig";
import Link from "next/link";

type Order = {
  _id: string;
  userId?: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
  status: string;
  shippingAddress: {
    fullName: string;
    lastName: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/products/orders/all");
      console.log(response.data);

      setOrders(response.data);
    } catch (error) {
      setError("Failed to fetch orders. Please try again.");
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  // Change order status
  const handleChangeOrderStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    if (
      !window.confirm(
        `Are you sure you want to change the status to ${newStatus}?`
      )
    )
      return;

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.put(`/products/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((order) => (order._id === orderId ? response.data : order))
      );
    } catch (error) {
      setError("Failed to update order status. Please try again.");
      console.error("Failed to update order status", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">Orders</h2>
      {loading && <div className="text-center text-gray-600">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {/* Scrollable Table Container */}
      <div className="overflow-x-scroll max-h-[700px] overflow-y-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-gray-100 z-10">
            <tr>
              <th className="p-2 text-sm sm:text-base">Total Price</th>
              <th className="p-2 text-sm sm:text-base">Payment Method</th>
              <th className="p-2 text-sm sm:text-base">Status</th>
              <th className="p-2 text-sm sm:text-base">Order ID</th>
              <th className="p-2 text-sm sm:text-base">Shipping Address</th>
              <th className="p-2 text-sm sm:text-base">Products</th>
              <th className="p-2 text-sm sm:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors border"
              >
                <td className="p-2 text-sm sm:text-base">
                  ${order.totalPrice.toFixed(2)}
                </td>
                <td className="p-2 text-sm sm:text-base">
                  {order.paymentMethod}
                </td>
                <td className="p-2 text-sm sm:text-base">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleChangeOrderStatus(order._id, e.target.value)
                    }
                    className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2 text-sm sm:text-base">{order._id}</td>
                <td className="p-2 text-sm sm:text-base">
                  <div className="whitespace-normal">
                    {order.shippingAddress.fullName}{" "}
                    {order.shippingAddress.lastName}
                    <br />
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                    <br />
                    Phone: {order.shippingAddress.phone}
                  </div>
                </td>
                <td className="p-2 text-sm sm:text-base">
                  <ul className="list-disc pl-5">
                    {order.products.map((product) => (
                      <li
                        key={product.productId}
                        className="flex justify-between"
                      >
                        <Link
                          href={`/product/${product.productId}`}
                          className="border-b border-two p-2"
                        >
                          {" "}
                          <span>
                            {product.name} (x{product.quantity})
                          </span>
                          <span>
                            ${(product.price * product.quantity).toFixed(2)}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 text-sm sm:text-base">
                  <button
                    onClick={() =>
                      handleChangeOrderStatus(order._id, order.status)
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Orders Message */}
      {orders.length === 0 && !loading && (
        <div className="text-center text-gray-600 mt-4">No orders found.</div>
      )}
    </div>
  );
};

export default Orders;
