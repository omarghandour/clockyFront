import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosConfig";

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

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/products/orders/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">Orders</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-sm sm:text-base">Order ID</th>
            <th className="border-b p-2 text-sm sm:text-base">Total Price</th>
            <th className="border-b p-2 text-sm sm:text-base">
              Payment Method
            </th>
            <th className="border-b p-2 text-sm sm:text-base">Status</th>
            <th className="border-b p-2 text-sm sm:text-base">
              Shipping Address
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border-b p-2 text-sm sm:text-base">{order._id}</td>
              <td className="border-b p-2 text-sm sm:text-base">
                ${order.totalPrice}
              </td>
              <td className="border-b p-2 text-sm sm:text-base">
                {order.paymentMethod}
              </td>
              <td className="border-b p-2 text-sm sm:text-base">
                {order.status}
              </td>
              <td className="border-b p-2 text-sm sm:text-base">
                <div className="whitespace-normal">
                  {order.shippingAddress.fullName},{" "}
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.country}, {order.shippingAddress.phone}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
