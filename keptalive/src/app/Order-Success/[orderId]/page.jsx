"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function OrderSuccess() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      if (res.ok) {
        setOrder(data);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">

        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-2">
          Order Number: {order.orderNumber}
        </p>

        <p className="text-gray-600 mb-6">
          Total Paid: ₹{order.totalAmount}
        </p>

        <button
          onClick={() => router.push("/orders")}
          className="w-full bg-black text-white py-2 rounded-lg mb-3"
        >
          View Orders
        </button>

        <button
          onClick={() => router.push("/")}
          className="w-full border py-2 rounded-lg"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}