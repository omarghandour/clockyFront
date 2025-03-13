"use client";
import axiosInstance from "@/lib/axiosConfig";
import { useEffect, useState } from "react";
type Order = {
  data: {
    intention_order_id: string;
    intention_detail: {
      items: any[];
      billing_data: {
        first_name: string;
        last_name: string;
        state: string;
        email: string;
        street: string;
        country: string;
        city: string;
        phone_number: string;
      };
    };
  };
};
export const UserIdDisplay = ({ id, success }: any) => {
  const [order, setOrder] = useState<Order>();
  const createOrder = async () => {
    try {
      const response = await axiosInstance.post(`/products/paymobCheckout`, {
        cart: order?.data?.intention_detail?.items,
        orderId: order?.data.intention_order_id,
        paymentMethod: "Online Card",
        shippingAddress: {
          fullName: order?.data.intention_detail?.billing_data?.first_name,
          lastName: order?.data.intention_detail?.billing_data?.last_name,
          governorate: order?.data.intention_detail?.billing_data?.state,
          email: order?.data.intention_detail?.billing_data?.email,
          address: order?.data.intention_detail?.billing_data?.street,
          country: order?.data.intention_detail?.billing_data?.country,
          city: order?.data.intention_detail?.billing_data?.city,
          phone: order?.data.intention_detail?.billing_data?.phone_number,
        },
        couponCode: null,
      });
      // remove the cart from local storage
      localStorage.removeItem("cart");
      localStorage.removeItem("order");
      localStorage.removeItem("userInfo");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const storedUserId: any = localStorage.getItem("order");

    setOrder(JSON.parse(storedUserId));
  }, []);
  console.log(order);

  if (order && +order?.data?.intention_order_id === +id && success === "true") {
    createOrder();
  }
  if (!order) return null;

  return (
    <p className="text-gray-600 mt-2">
      {/* order id: {order.data?.intention_order_id} */}
    </p>
  );
};
// const checkoutPayload = {
//     userId: localStorage.getItem("userId"),
//     cart: cartItems,
//     paymentMethod: userInfo.paymentMethod,
//     shippingAddress: {
//       fullName: userInfo.fullName,
//       lastName: userInfo.lastName,
//       governorate: userInfo.governorate,
//       email: userInfo.email,
//       address: userInfo.address,
//       country: userInfo.country,
//       city: userInfo.city,
//       phone: userInfo.phoneNumber,
//     },
//     couponCode: couponCode?.toLowerCase() || null, // Include the coupon code in the checkout
//   };
