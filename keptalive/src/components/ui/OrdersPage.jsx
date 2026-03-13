"use client";
import { useState } from "react";
import {
  Eye,
  X,
  MapPin,
  Phone,
  Mail,
  Package,
  CreditCard,
  Truck,
} from "lucide-react";
import StatusBadge from "./StatusBadge";

// ── Mock data (replace with API) ─────────────────────────────
const MOCK_ORDERS = [
  {
    _id: "ord1",
    orderID: "ORD1",
    customerName: "Aanya Sharma",
    customerEmail: "aanya@email.com",
    customerPhone: "+91 98765 43210",
    productsBought: [
      {
        productID: "p1",
        productName: "Oversized Linen Shirt",
        productCategory: "Tops",
        size: "M",
        quantity: 1,
        price: 2499,
        productDiscount: 0,
      },
    ],
    orderTotal: 2499,
    paymentType: "UPI",
    paymentStatus: "paid",
    orderStatus: "delivered",
    deliveryAddress: "42 Marine Drive",
    deliveryCity: "Mumbai",
    deliveryState: "Maharashtra",
    deliveryPincode: "400001",
    deliveryInstructions: "Leave at door",
    shiprocket: {
      status: "delivered",
      courierName: "Delhivery",
      awbCode: "AWB123456",
    },
    orderDate: "2025-06-10T10:30:00Z",
    razorpayOrderID: "rzp_order_001",
    razorpayPaymentId: "rzp_pay_001",
  },
  {
    _id: "ord2",
    orderID: "ORD2",
    customerName: "Rishika Rajput",
    customerEmail: "priya@email.com",
    customerPhone: "+91 76543 21098",
    productsBought: [
      {
        productID: "p3",
        productName: "Structured Wool Blazer",
        productCategory: "Outerwear",
        size: "S",
        quantity: 1,
        price: 5999,
        productDiscount: 0,
      },
      {
        productID: "p4",
        productName: "Leather Tote Bag",
        productCategory: "Accessories",
        size: "ONE SIZE",
        quantity: 1,
        price: 4299,
        productDiscount: 0,
      },
    ],
    orderTotal: 10298,
    paymentType: "UPI",
    paymentStatus: "paid",
    orderStatus: "pending",
    deliveryAddress: "15 Indiranagar",
    deliveryCity: "Bangalore",
    deliveryState: "Karnataka",
    deliveryPincode: "560038",
    deliveryInstructions: "",
    shiprocket: {
      status: "pickup_scheduled",
      courierName: "BlueDart",
      awbCode: "AWB234567",
    },
    orderDate: "2025-06-12T14:00:00Z",
    razorpayOrderID: "rzp_order_002",
    razorpayPaymentId: "rzp_pay_002",
  },
  {
    _id: "ord3",
    orderID: "ORD3",
    customerName: "Aditya Baldawa",
    customerEmail: "rohan@email.com",
    customerPhone: "+91 87654 32109",
    productsBought: [
      {
        productID: "p6",
        productName: "Cotton Crew Neck Tee",
        productCategory: "Tops",
        size: "L",
        quantity: 2,
        price: 1998,
        productDiscount: 10,
      },
    ],
    orderTotal: 1998,
    paymentType: "Cash",
    paymentStatus: "pending",
    orderStatus: "pending",
    deliveryAddress: "8 Hauz Khas",
    deliveryCity: "Delhi",
    deliveryState: "Delhi",
    deliveryPincode: "110016",
    deliveryInstructions: "Call before delivery",
    shiprocket: { status: "not_created" },
    orderDate: "2025-06-14T09:15:00Z",
    razorpayOrderID: "",
    razorpayPaymentId: "",
  },
  {
    _id: "ord4",
    orderID: "ORD4",
    customerName: "Neil Sulhyan",
    customerEmail: "meera@email.com",
    customerPhone: "+91 43210 98765",
    productsBought: [
      {
        productID: "p5",
        productName: "Minimal Ankle Boots",
        productCategory: "Footwear",
        size: "38",
        quantity: 1,
        price: 6499,
        productDiscount: 0,
      },
      {
        productID: "p2",
        productName: "Tailored Wide Leg Trousers",
        productCategory: "Bottoms",
        size: "M",
        quantity: 1,
        price: 3199,
        productDiscount: 0,
      },
    ],
    orderTotal: 9698,
    paymentType: "UPI",
    paymentStatus: "paid",
    orderStatus: "delivered",
    deliveryAddress: "22 Jubilee Hills",
    deliveryCity: "Hyderabad",
    deliveryState: "Telangana",
    deliveryPincode: "500033",
    deliveryInstructions: "",
    shiprocket: {
      status: "delivered",
      courierName: "DTDC",
      awbCode: "AWB345678",
    },
    orderDate: "2025-06-09T16:45:00Z",
    razorpayOrderID: "rzp_order_004",
    razorpayPaymentId: "rzp_pay_004",
  },
  {
    _id: "ord5",
    orderID: "ORD5",
    customerName: "Kabir Nair",
    customerEmail: "kabir@email.com",
    customerPhone: "+91 65432 10987",
    productsBought: [
      {
        productID: "p1",
        productName: "Oversized Linen Shirt",
        productCategory: "Tops",
        size: "L",
        quantity: 1,
        price: 2499,
        productDiscount: 0,
      },
    ],
    orderTotal: 2499,
    paymentType: "UPI",
    paymentStatus: "paid",
    orderStatus: "pending",
    deliveryAddress: "5 T Nagar",
    deliveryCity: "Chennai",
    deliveryState: "Tamil Nadu",
    deliveryPincode: "600017",
    deliveryInstructions: "",
    shiprocket: {
      status: "in_transit",
      courierName: "Ecom Express",
      awbCode: "AWB456789",
    },
    orderDate: "2025-06-13T11:00:00Z",
    razorpayOrderID: "rzp_order_005",
    razorpayPaymentId: "rzp_pay_005",
  },
];

// ── Order Detail Modal ───────────────────────────────────────
function OrderModal({ order, onClose, onUpdate }) {
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);

  const handleSave = () => {
    // TODO: PATCH /api/orders/:id  { orderStatus, paymentStatus }
    onUpdate(order._id, { orderStatus, paymentStatus });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7] sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">
              Order Details
            </p>
            <h2
              className="text-2xl font-bold text-black"
              style={{ fontFamily: "var(--seasons)" }}
            >
              {order.orderID}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] text-black hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-7">
          {/* Customer */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Customer
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: Mail, value: order.customerName },
                { icon: Mail, value: order.customerEmail },
                { icon: Phone, value: order.customerPhone },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-2">
                  <Icon size={13} className="text-[#8A8A8A] flex-shrink-0" />
                  <p className="text-sm text-[#2B2B2B] truncate">{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Items */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Items Ordered ({order.productsBought.length})
            </p>
            <div className="space-y-0">
              {order.productsBought.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-[#BFC3C7] last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-bold text-black">
                      {item.productName}
                    </p>
                    <p className="text-xs text-[#8A8A8A] mt-0.5">
                      {item.productCategory} · Size: {item.size} · Qty:{" "}
                      {item.quantity}
                      {item.productDiscount > 0 &&
                        ` · ${item.productDiscount}% off`}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-black">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="text-sm font-bold tracking-widest uppercase">
                Order Total
              </p>
              <p className="text-xl font-bold">
                ₹{order.orderTotal.toLocaleString()}
              </p>
            </div>
          </section>

          {/* Payment */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Payment
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                  Method
                </p>
                <p className="text-sm font-bold text-black">
                  {order.paymentType}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                  Current Status
                </p>
                <StatusBadge status={order.paymentStatus} type="payment" />
              </div>
              {order.razorpayOrderID && (
                <div>
                  <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                    Razorpay Order
                  </p>
                  <p className="text-xs font-mono text-[#2B2B2B]">
                    {order.razorpayOrderID}
                  </p>
                </div>
              )}
              {order.razorpayPaymentId && (
                <div>
                  <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                    Payment ID
                  </p>
                  <p className="text-xs font-mono text-[#2B2B2B]">
                    {order.razorpayPaymentId}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Delivery Address */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Delivery
            </p>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-[#BFC3C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={13} className="text-[#8A8A8A]" />
              </div>
              <div>
                <p className="text-sm text-[#2B2B2B]">
                  {order.deliveryAddress}
                </p>
                <p className="text-sm text-[#2B2B2B]">
                  {order.deliveryCity}, {order.deliveryState} —{" "}
                  {order.deliveryPincode}
                </p>
                {order.deliveryInstructions && (
                  <p className="text-xs text-[#8A8A8A] mt-1 italic">
                    "{order.deliveryInstructions}"
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Shiprocket */}
          <section className="space-y-3">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Shiprocket
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                  Shipment Status
                </p>
                <StatusBadge
                  status={order.shiprocket?.status || "not_created"}
                  type="ship"
                />
              </div>
              {order.shiprocket?.courierName && (
                <div>
                  <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                    Courier
                  </p>
                  <p className="text-sm font-bold">
                    {order.shiprocket.courierName}
                  </p>
                </div>
              )}
              {order.shiprocket?.awbCode && (
                <div>
                  <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">
                    AWB Code
                  </p>
                  <p className="text-xs font-mono text-[#2B2B2B]">
                    {order.shiprocket.awbCode}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Update Status */}
          <section className="space-y-4">
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase border-b border-[#BFC3C7] pb-2">
              Update Status
            </p>
            <div>
              <p className="text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
                Order Status
              </p>
              <div className="flex gap-2">
                {["pending", "delivered", "cancelled"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setOrderStatus(s)}
                    className={`flex-1 py-2.5 text-xs tracking-widest uppercase transition-all ${orderStatus === s ? "bg-black text-white" : "border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
                Payment Status
              </p>
              <div className="flex gap-2">
                {["pending", "paid", "failed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPaymentStatus(s)}
                    className={`flex-1 py-2.5 text-xs tracking-widest uppercase transition-all ${paymentStatus === s ? "bg-black text-white" : "border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8] sticky bottom-0">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Orders Page ──────────────────────────────────────────────
export default function OrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  const handleUpdate = (id, updates) => {
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, ...updates } : o)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">
          Fulfillment
        </p>
        <h1
          className="text-4xl font-bold text-black"
          style={{ fontFamily: "var(--seasons)" }}
        >
          Orders
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex border border-[#BFC3C7] w-fit">
        {["all", "pending", "delivered", "cancelled"].map((f, i) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-3 text-xs tracking-widest uppercase transition-all ${filter === f ? "bg-black text-white" : "text-[#8A8A8A] hover:text-black"} ${i !== 0 ? "border-l border-[#BFC3C7]" : ""}`}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[#BFC3C7] overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
              {[
                "Order ID",
                "Customer",
                "Items",
                "Total",
                "Payment",
                "Order Status",
                "Shiprocket",
                "Date",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-4 text-xs tracking-widest text-[#8A8A8A] uppercase font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr
                key={o._id}
                className="border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors"
              >
                <td className="px-5 py-4 text-sm font-bold text-black whitespace-nowrap">
                  {o.orderID}
                </td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-black whitespace-nowrap">
                    {o.customerName}
                  </p>
                  <p className="text-xs text-[#8A8A8A]">{o.customerEmail}</p>
                </td>
                <td className="px-5 py-4 text-sm text-[#2B2B2B]">
                  {o.productsBought.length} item
                  {o.productsBought.length !== 1 ? "s" : ""}
                </td>
                <td className="px-5 py-4 text-sm font-bold text-black whitespace-nowrap">
                  ₹{o.orderTotal.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <StatusBadge status={o.paymentStatus} type="payment" />
                    <span className="text-[10px] text-[#8A8A8A] uppercase tracking-widest">
                      {o.paymentType}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={o.orderStatus} type="order" />
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    status={o.shiprocket?.status || "not_created"}
                    type="ship"
                  />
                </td>
                <td className="px-5 py-4 text-xs text-[#8A8A8A] whitespace-nowrap">
                  {new Date(o.orderDate).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-4">
                  <button
                    onClick={() => setSelected(o)}
                    className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all whitespace-nowrap"
                  >
                    <Eye size={12} /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <OrderModal
          order={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
