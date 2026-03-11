"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard, Package, Tag, Users, ShoppingBag,
  BarChart2, Plus, Search, Bell, ChevronRight, X,
  Edit2, Trash2, Eye, TrendingUp, TrendingDown,
  CheckCircle, Clock, Truck, AlertCircle, Filter,
  Upload, Image, ChevronDown, MoreVertical, ArrowUpRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts"; 

// ─── MOCK DATA ───────────────────────────────────────────────────────────────

const MOCK_CATEGORIES = [
  { _id: "cat1", name: "Tops", slug: "tops", productCount: 24 },
  { _id: "cat2", name: "Bottoms", slug: "bottoms", productCount: 18 },
  { _id: "cat3", name: "Outerwear", slug: "outerwear", productCount: 12 },
  { _id: "cat4", name: "Accessories", slug: "accessories", productCount: 31 },
  { _id: "cat5", name: "Footwear", slug: "footwear", productCount: 9 },
];

const MOCK_PRODUCTS = [
  { _id: "p1", productID: 1, productName: "Oversized Linen Shirt", productSellingPrice: 2499, productOriginalPrice: 3299, productCategory: "cat1", productSize: ["S","M","L","XL"], productStock: {"S":12,"M":8,"L":5,"XL":2}, displayAt: "trending", isActive: true, slug: "oversized-linen-shirt-1", productImages:[{url:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",public_id:"p1"}] },
  { _id: "p2", productID: 2, productName: "Tailored Wide Leg Trousers", productSellingPrice: 3199, productOriginalPrice: 4500, productCategory: "cat2", productSize: ["XS","S","M","L"], productStock: {"XS":4,"S":10,"M":7,"L":3}, displayAt: "new-arrivals", isActive: true, slug: "tailored-wide-leg-trousers-2", productImages:[{url:"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400",public_id:"p2"}] },
  { _id: "p3", productID: 3, productName: "Structured Wool Blazer", productSellingPrice: 5999, productOriginalPrice: 7999, productCategory: "cat3", productSize: ["S","M","L"], productStock: {"S":3,"M":6,"L":4}, displayAt: "home", isActive: true, slug: "structured-wool-blazer-3", productImages:[{url:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",public_id:"p3"}] },
  { _id: "p4", productID: 4, productName: "Leather Tote Bag", productSellingPrice: 4299, productOriginalPrice: 4299, productCategory: "cat4", productSize: ["ONE SIZE"], productStock: {"ONE SIZE":15}, displayAt: "sale", isActive: false, slug: "leather-tote-bag-4", productImages:[{url:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",public_id:"p4"}] },
  { _id: "p5", productID: 5, productName: "Minimal Ankle Boots", productSellingPrice: 6499, productOriginalPrice: 8000, productCategory: "cat5", productSize: ["36","37","38","39","40"], productStock: {"36":2,"37":5,"38":8,"39":4,"40":1}, displayAt: "trending", isActive: true, slug: "minimal-ankle-boots-5", productImages:[{url:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",public_id:"p5"}] },
  { _id: "p6", productID: 6, productName: "Cotton Crew Neck Tee", productSellingPrice: 999, productOriginalPrice: 1499, productCategory: "cat1", productSize: ["XS","S","M","L","XL"], productStock: {"XS":20,"S":18,"M":25,"L":15,"XL":8}, displayAt: "sale", isActive: true, slug: "cotton-crew-neck-tee-6", productImages:[{url:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",public_id:"p6"}] },
];

const MOCK_CUSTOMERS = [
  { _id: "u1", name: "Aanya Sharma", email: "aanya@email.com", phone: "+91 98765 43210", joinDate: "2024-03-15", orders: 8, totalSpent: 24500, location: "Mumbai", avatar: "AS" },
  { _id: "u2", name: "Rohan Mehta", email: "rohan@email.com", phone: "+91 87654 32109", joinDate: "2024-05-22", orders: 3, totalSpent: 9200, location: "Delhi", avatar: "RM" },
  { _id: "u3", name: "Priya Kapoor", email: "priya@email.com", phone: "+91 76543 21098", joinDate: "2023-11-10", orders: 15, totalSpent: 67800, location: "Bangalore", avatar: "PK" },
  { _id: "u4", name: "Kabir Nair", email: "kabir@email.com", phone: "+91 65432 10987", joinDate: "2024-01-08", orders: 6, totalSpent: 18300, location: "Chennai", avatar: "KN" },
  { _id: "u5", name: "Ishaan Verma", email: "ishaan@email.com", phone: "+91 54321 09876", joinDate: "2024-07-01", orders: 2, totalSpent: 5600, location: "Pune", avatar: "IV" },
  { _id: "u6", name: "Meera Joshi", email: "meera@email.com", phone: "+91 43210 98765", joinDate: "2023-09-14", orders: 22, totalSpent: 102400, location: "Hyderabad", avatar: "MJ" },
];

const MOCK_ORDERS = [
  { _id: "ord1", orderID: "ORD-2025-001", customer: "Aanya Sharma", customerEmail: "aanya@email.com", items: [{name:"Oversized Linen Shirt", qty:1, size:"M", price:2499}], total: 2499, status: "delivered", date: "2025-06-10", address: "42 Marine Drive, Mumbai" },
  { _id: "ord2", orderID: "ORD-2025-002", customer: "Priya Kapoor", customerEmail: "priya@email.com", items: [{name:"Structured Wool Blazer", qty:1, size:"S", price:5999},{name:"Leather Tote Bag", qty:1, size:"ONE SIZE", price:4299}], total: 10298, status: "shipped", date: "2025-06-12", address: "15 Indiranagar, Bangalore" },
  { _id: "ord3", orderID: "ORD-2025-003", customer: "Rohan Mehta", customerEmail: "rohan@email.com", items: [{name:"Cotton Crew Neck Tee", qty:2, size:"L", price:1998}], total: 1998, status: "pending", date: "2025-06-14", address: "8 Hauz Khas, Delhi" },
  { _id: "ord4", orderID: "ORD-2025-004", customer: "Meera Joshi", customerEmail: "meera@email.com", items: [{name:"Minimal Ankle Boots", qty:1, size:"38", price:6499},{name:"Tailored Wide Leg Trousers", qty:1, size:"M", price:3199}], total: 9698, status: "delivered", date: "2025-06-09", address: "22 Jubilee Hills, Hyderabad" },
  { _id: "ord5", orderID: "ORD-2025-005", customer: "Kabir Nair", customerEmail: "kabir@email.com", items: [{name:"Oversized Linen Shirt", qty:1, size:"L", price:2499}], total: 2499, status: "shipped", date: "2025-06-13", address: "5 T Nagar, Chennai" },
  { _id: "ord6", orderID: "ORD-2025-006", customer: "Ishaan Verma", customerEmail: "ishaan@email.com", items: [{name:"Cotton Crew Neck Tee", qty:1, size:"S", price:999}], total: 999, status: "pending", date: "2025-06-15", address: "77 Koregaon Park, Pune" },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, orders: 18 },
  { month: "Feb", revenue: 58000, orders: 24 },
  { month: "Mar", revenue: 51000, orders: 21 },
  { month: "Apr", revenue: 73000, orders: 31 },
  { month: "May", revenue: 89000, orders: 38 },
  { month: "Jun", revenue: 67000, orders: 28 },
];

const CATEGORY_DATA = [
  { name: "Tops", value: 34, color: "#000000" },
  { name: "Bottoms", value: 22, color: "#2B2B2B" },
  { name: "Outerwear", value: 18, color: "#8A8A8A" },
  { name: "Accessories", value: 16, color: "#BFC3C7" },
  { name: "Footwear", value: 10, color: "#4A4A4A" },
];

const WEEKLY_DATA = [
  { day: "Mon", sales: 12400 },
  { day: "Tue", sales: 9800 },
  { day: "Wed", sales: 15200 },
  { day: "Thu", sales: 11600 },
  { day: "Fri", sales: 18900 },
  { day: "Sat", sales: 22100 },
  { day: "Sun", sales: 16700 },
];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const config = {
    delivered: { label: "Delivered", icon: CheckCircle, bg: "bg-black", text: "text-white" },
    shipped: { label: "Shipped", icon: Truck, bg: "bg-[#2B2B2B]", text: "text-white" },
    pending: { label: "Pending", icon: Clock, bg: "bg-[#BFC3C7]", text: "text-black" },
  };
  const c = config[status] || config.pending;
  const Icon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-widest uppercase ${c.bg} ${c.text}`}>
      <Icon size={11} />
      {c.label}
    </span>
  );
};

// ─── ADD/EDIT PRODUCT MODAL ───────────────────────────────────────────────────

const ProductModal = ({ product, categories, onClose, onSave }) => {
  const isEdit = !!product;
  const [form, setForm] = useState({
    productName: product?.productName || "",
    productSellingPrice: product?.productSellingPrice || "",
    productOriginalPrice: product?.productOriginalPrice || "",
    productCategory: product?.productCategory || "",
    productDescription: product?.productDescription || "",
    productSize: product?.productSize?.join(", ") || "",
    productStock: product?.productStock ? Object.entries(product.productStock).map(([k,v]) => `${k}:${v}`).join(", ") : "",
    displayAt: product?.displayAt || "none",
    isActive: product?.isActive ?? true,
    exchangePolicy: product?.exchangePolicy ?? false,
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ fontFamily: "'Nexa', sans-serif" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">{isEdit ? "Edit Product" : "New Product"}</p>
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>
              {isEdit ? product.productName : "Add Product"}
            </h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:bg-black hover:text-white hover:border-black transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="px-8 py-6 space-y-6">
          {/* Basic Info */}
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4">Basic Information</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Product Name *</label>
                <input value={form.productName} onChange={e => set("productName", e.target.value)}
                  className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="e.g. Oversized Linen Shirt" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Description</label>
                <textarea value={form.productDescription} onChange={e => set("productDescription", e.target.value)}
                  rows={3} className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Describe the product..." />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4">Pricing</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Selling Price (₹) *</label>
                <input type="number" value={form.productSellingPrice} onChange={e => set("productSellingPrice", e.target.value)}
                  className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="2499" />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Original Price (₹)</label>
                <input type="number" value={form.productOriginalPrice} onChange={e => set("productOriginalPrice", e.target.value)}
                  className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="3299" />
              </div>
            </div>
          </div>

          {/* Category & Display */}
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4">Category & Visibility</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Category *</label>
                <div className="relative">
                  <select value={form.productCategory} onChange={e => set("productCategory", e.target.value)}
                    className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none bg-white">
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Display At</label>
                <div className="relative">
                  <select value={form.displayAt} onChange={e => set("displayAt", e.target.value)}
                    className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors appearance-none bg-white">
                    {["none","home","trending","new-arrivals","sale"].map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase()+d.slice(1)}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Sizes & Stock */}
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4">Sizes & Stock</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Available Sizes *</label>
                <input value={form.productSize} onChange={e => set("productSize", e.target.value)}
                  className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="S, M, L, XL" />
                <p className="text-[11px] text-[#8A8A8A] mt-1.5">Comma-separated values</p>
              </div>
              <div>
                <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Stock per Size *</label>
                <input value={form.productStock} onChange={e => set("productStock", e.target.value)}
                  className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  placeholder="S:12, M:8, L:5, XL:2" />
                <p className="text-[11px] text-[#8A8A8A] mt-1.5">Format: SIZE:QTY, SIZE:QTY</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4">Product Images</p>
            <div className="border-2 border-dashed border-[#BFC3C7] hover:border-black transition-colors p-8 flex flex-col items-center justify-center gap-3 cursor-pointer group">
              <div className="w-12 h-12 border border-[#BFC3C7] group-hover:border-black flex items-center justify-center transition-colors">
                <Upload size={20} className="text-[#8A8A8A] group-hover:text-black transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-black">Drop images here</p>
                <p className="text-xs text-[#8A8A8A] mt-1">or click to browse — JPG, PNG up to 10MB</p>
              </div>
            </div>
            {isEdit && product.productImages?.length > 0 && (
              <div className="flex gap-3 mt-4">
                {product.productImages.map((img, i) => (
                  <div key={i} className="relative w-20 h-20 border border-[#BFC3C7] overflow-hidden group">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <X size={16} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Toggles */}
          <div>
            <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-4">Settings</p>
            <div className="space-y-3">
              {[
                { key: "isActive", label: "Active (visible on store)" },
                { key: "exchangePolicy", label: "Exchange Policy Enabled" }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center justify-between py-3 border-b border-[#BFC3C7] cursor-pointer">
                  <span className="text-sm text-[#2B2B2B]">{label}</span>
                  <div onClick={() => set(key, !form[key])}
                    className={`w-12 h-6 relative transition-colors cursor-pointer ${form[key] ? "bg-black" : "bg-[#BFC3C7]"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white transition-all ${form[key] ? "left-7" : "left-1"}`} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8]">
          <button onClick={onClose} className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black transition-all">
            Cancel
          </button>
          <button onClick={() => { onSave(form); onClose(); }}
            className="px-8 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium">
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ADD CATEGORY MODAL ───────────────────────────────────────────────────────

const CategoryModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md" style={{ fontFamily: "'Nexa', sans-serif" }}>
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">New Category</p>
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>Add Category</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:bg-black hover:text-white hover:border-black transition-all">
            <X size={18} />
          </button>
        </div>
        <div className="px-8 py-6">
          <label className="block text-xs tracking-widest text-[#2B2B2B] uppercase mb-2">Category Name *</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="w-full border border-[#BFC3C7] px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
            placeholder="e.g. Dresses" autoFocus />
          <p className="text-[11px] text-[#8A8A8A] mt-2">Slug will be auto-generated from the name</p>
        </div>
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8]">
          <button onClick={onClose} className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black transition-all">
            Cancel
          </button>
          <button onClick={() => { if(name.trim()){ onSave(name); onClose(); } }}
            className="px-8 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium">
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ORDER DETAIL MODAL ───────────────────────────────────────────────────────

const OrderModal = ({ order, onClose, onStatusChange }) => {
  const [status, setStatus] = useState(order.status);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg" style={{ fontFamily: "'Nexa', sans-serif" }}>
        <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">Order Details</p>
            <h2 className="text-2xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>{order.orderID}</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:bg-black hover:text-white transition-all">
            <X size={18} />
          </button>
        </div>
        <div className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">Customer</p>
              <p className="text-sm font-bold text-black">{order.customer}</p>
              <p className="text-xs text-[#8A8A8A]">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">Order Date</p>
              <p className="text-sm font-bold text-black">{order.date}</p>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-3">Items Ordered</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[#BFC3C7]">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-[#8A8A8A]">Size: {item.size} · Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-bold">₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-3">
              <p className="text-sm font-bold tracking-widest uppercase">Total</p>
              <p className="text-lg font-bold">₹{order.total.toLocaleString()}</p>
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-2">Delivery Address</p>
            <p className="text-sm text-[#2B2B2B]">{order.address}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-3">Update Status</p>
            <div className="flex gap-2">
              {["pending","shipped","delivered"].map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`flex-1 py-2.5 text-xs tracking-widest uppercase transition-all ${status === s ? "bg-black text-white" : "border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8]">
          <button onClick={onClose} className="px-6 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#8A8A8A] hover:border-black hover:text-black transition-all">Cancel</button>
          <button onClick={() => { onStatusChange(order._id, status); onClose(); }}
            className="px-8 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── CUSTOMER PROFILE MODAL ───────────────────────────────────────────────────

const CustomerModal = ({ customer, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white w-full max-w-md" style={{ fontFamily: "'Nexa', sans-serif" }}>
      <div className="flex items-center justify-between px-8 py-6 border-b border-[#BFC3C7]">
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase">Customer Profile</p>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-[#BFC3C7] hover:bg-black hover:text-white transition-all">
          <X size={18} />
        </button>
      </div>
      <div className="px-8 py-6">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold">{customer.avatar}</div>
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'The Seasons', serif" }}>{customer.name}</h2>
            <p className="text-xs text-[#8A8A8A] mt-0.5">{customer.location}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {[
            { label: "Email", value: customer.email },
            { label: "Phone", value: customer.phone },
            { label: "Member Since", value: new Date(customer.joinDate).toLocaleDateString("en-IN", { year:"numeric", month:"short", day:"numeric" }) },
            { label: "Location", value: customer.location },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-1">{label}</p>
              <p className="text-sm font-medium text-[#2B2B2B]">{value}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#BFC3C7] p-4 text-center">
            <p className="text-3xl font-bold text-black">{customer.orders}</p>
            <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mt-1">Total Orders</p>
          </div>
          <div className="border border-[#BFC3C7] p-4 text-center">
            <p className="text-3xl font-bold text-black">₹{(customer.totalSpent/1000).toFixed(1)}k</p>
            <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mt-1">Total Spent</p>
          </div>
        </div>
      </div>
      <div className="px-8 py-5 border-t border-[#BFC3C7] bg-[#F8F8F8]">
        <button onClick={onClose} className="w-full py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors font-medium">
          Close
        </button>
      </div>
    </div>
  </div>
);

// ─── OVERVIEW / ANALYTICS PAGE ────────────────────────────────────────────────

const AnalyticsPage = () => {
  const totalRevenue = REVENUE_DATA.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = MOCK_ORDERS.length;
  const activeProducts = MOCK_PRODUCTS.filter(p => p.isActive).length;

  const stats = [
    { label: "Total Revenue", value: `₹${(totalRevenue/1000).toFixed(0)}k`, sub: "+18.2% this month", up: true },
    { label: "Total Orders", value: totalOrders, sub: "+3 this week", up: true },
    { label: "Active Products", value: activeProducts, sub: `${MOCK_PRODUCTS.length} total`, up: null },
    { label: "Customers", value: MOCK_CUSTOMERS.length, sub: "+2 new this month", up: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">Overview</p>
        <h1 className="text-4xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>Dashboard</h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="border border-[#BFC3C7] p-6 hover:border-black transition-colors group">
            <p className="text-xs tracking-widest text-[#8A8A8A] uppercase mb-4">{s.label}</p>
            <p className="text-4xl font-bold text-black mb-3">{s.value}</p>
            <div className="flex items-center gap-1.5">
              {s.up === true && <TrendingUp size={12} className="text-black" />}
              {s.up === false && <TrendingDown size={12} className="text-[#8A8A8A]" />}
              <p className="text-xs text-[#8A8A8A]">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-[#BFC3C7] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold" style={{ fontFamily: "'The Seasons', serif" }}>₹{(totalRevenue/1000).toFixed(0)}k YTD</p>
            </div>
            <ArrowUpRight size={20} className="text-[#8A8A8A]" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#BFC3C7" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A8A8A", fontFamily: "Nexa" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#8A8A8A", fontFamily: "Nexa" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, "Revenue"]} contentStyle={{ border: "1px solid #BFC3C7", borderRadius: 0, fontFamily: "Nexa", fontSize: 12 }} />
              <Area type="monotone" dataKey="revenue" stroke="#000" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-[#BFC3C7] p-6">
          <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">Sales by Category</p>
          <p className="text-2xl font-bold mb-6" style={{ fontFamily: "'The Seasons', serif" }}>Distribution</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" paddingAngle={3}>
                {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={v => [`${v}%`, ""]} contentStyle={{ border: "1px solid #BFC3C7", borderRadius: 0, fontFamily: "Nexa", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {CATEGORY_DATA.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5" style={{ background: d.color }} />
                  <span className="text-xs text-[#2B2B2B]">{d.name}</span>
                </div>
                <span className="text-xs font-bold">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Sales */}
      <div className="border border-[#BFC3C7] p-6">
        <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">This Week</p>
        <p className="text-2xl font-bold mb-6" style={{ fontFamily: "'The Seasons', serif" }}>Daily Sales</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={WEEKLY_DATA} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="#BFC3C7" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#8A8A8A", fontFamily: "Nexa" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8A8A8A", fontFamily: "Nexa" }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, "Sales"]} contentStyle={{ border: "1px solid #BFC3C7", borderRadius: 0, fontFamily: "Nexa", fontSize: 12 }} />
            <Bar dataKey="sales" fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="border border-[#BFC3C7] p-6">
        <p className="text-xs tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">Latest Activity</p>
        <p className="text-2xl font-bold mb-6" style={{ fontFamily: "'The Seasons', serif" }}>Recent Orders</p>
        <div className="space-y-0">
          {MOCK_ORDERS.slice(0, 4).map(order => (
            <div key={order._id} className="flex items-center justify-between py-4 border-b border-[#BFC3C7] last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#2B2B2B] text-white text-xs flex items-center justify-center font-bold">
                  {order.customer.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-bold text-black">{order.orderID}</p>
                  <p className="text-xs text-[#8A8A8A]">{order.customer}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <StatusBadge status={order.status} />
                <p className="text-sm font-bold">₹{order.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────

const ProductsPage = ({ categories }) => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | product object
  const [catModal, setCatModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter(p =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  const getCatName = (id) => categories.find(c => c._id === id)?.name || "—";

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">Inventory</p>
          <h1 className="text-4xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>Products</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setCatModal(true)}
            className="flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase border border-black text-black hover:bg-black hover:text-white transition-all">
            <Tag size={14} /> Add Category
          </button>
          <button onClick={() => setModal("add")}
            className="flex items-center gap-2 px-5 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors">
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full border border-[#BFC3C7] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          placeholder="Search products..." />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(p => (
          <div key={p._id} className="border border-[#BFC3C7] hover:border-black transition-all group overflow-hidden">
            <div className="relative h-52 overflow-hidden bg-[#F8F8F8]">
              <img src={p.productImages[0]?.url} alt={p.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className={`text-xs px-2 py-1 tracking-widest uppercase font-medium ${p.isActive ? "bg-black text-white" : "bg-[#BFC3C7] text-[#2B2B2B]"}`}>
                  {p.isActive ? "Live" : "Hidden"}
                </span>
              </div>
              {p.displayAt !== "none" && (
                <div className="absolute top-3 left-3">
                  <span className="text-xs px-2 py-1 bg-white text-black tracking-widest uppercase font-medium border border-[#BFC3C7]">{p.displayAt}</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#8A8A8A] tracking-widest uppercase mb-1">{getCatName(p.productCategory)} · #{p.productID}</p>
                  <h3 className="font-bold text-black leading-tight truncate">{p.productName}</h3>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-black">₹{p.productSellingPrice.toLocaleString()}</span>
                {p.productOriginalPrice > p.productSellingPrice && (
                  <span className="text-sm text-[#8A8A8A] line-through">₹{p.productOriginalPrice.toLocaleString()}</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                {p.productSize.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 border border-[#BFC3C7] text-[#2B2B2B]">{s}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModal(p)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs tracking-widest uppercase border border-[#BFC3C7] text-[#2B2B2B] hover:border-black hover:text-black transition-all">
                  <Edit2 size={12} /> Edit
                </button>
                <button onClick={() => setDeleteConfirm(p._id)}
                  className="flex items-center justify-center w-10 py-2.5 border border-[#BFC3C7] text-[#8A8A8A] hover:border-red-400 hover:text-red-500 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 w-full max-w-sm border border-[#BFC3C7]" style={{ fontFamily: "'Nexa', sans-serif" }}>
            <AlertCircle size={32} className="mb-4 text-black" />
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'The Seasons', serif" }}>Delete Product?</h3>
            <p className="text-sm text-[#8A8A8A] mb-6">This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 text-xs tracking-widest uppercase border border-[#BFC3C7] hover:border-black transition-all">Cancel</button>
              <button onClick={() => { setProducts(prev => prev.filter(p => p._id !== deleteConfirm)); setDeleteConfirm(null); }}
                className="flex-1 py-3 text-xs tracking-widest uppercase bg-black text-white hover:bg-[#2B2B2B] transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "add" && <ProductModal categories={categories} onClose={() => setModal(null)} onSave={(f) => console.log("Add:", f)} />}
      {modal && modal !== "add" && <ProductModal product={modal} categories={categories} onClose={() => setModal(null)} onSave={(f) => console.log("Edit:", f)} />}
      {catModal && <CategoryModal onClose={() => setCatModal(false)} onSave={(name) => console.log("New cat:", name)} />}
    </div>
  );
};

// ─── CUSTOMERS PAGE ───────────────────────────────────────────────────────────

const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = MOCK_CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">Directory</p>
        <h1 className="text-4xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>Customers</h1>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          className="w-full border border-[#BFC3C7] pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          placeholder="Search by name or email..." />
      </div>

      <div className="border border-[#BFC3C7] overflow-hidden">
        <table className="w-full" style={{ fontFamily: "'Nexa', sans-serif" }}>
          <thead>
            <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
              {["Customer","Location","Orders","Total Spent","Joined",""].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs tracking-widest text-[#8A8A8A] uppercase font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id} className="border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-black text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{c.avatar}</div>
                    <div>
                      <p className="text-sm font-bold text-black">{c.name}</p>
                      <p className="text-xs text-[#8A8A8A]">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-[#2B2B2B]">{c.location}</td>
                <td className="px-5 py-4 text-sm font-bold text-black">{c.orders}</td>
                <td className="px-5 py-4 text-sm font-bold text-black">₹{c.totalSpent.toLocaleString()}</td>
                <td className="px-5 py-4 text-xs text-[#8A8A8A]">{new Date(c.joinDate).toLocaleDateString("en-IN",{year:"numeric",month:"short",day:"numeric"})}</td>
                <td className="px-5 py-4">
                  <button onClick={() => setSelected(c)}
                    className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all">
                    <Eye size={12} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <CustomerModal customer={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

// ─── ORDERS PAGE ──────────────────────────────────────────────────────────────

const OrdersPage = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const updateStatus = (id, status) => setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-[0.3em] text-[#8A8A8A] uppercase mb-1">Fulfillment</p>
        <h1 className="text-4xl font-bold text-black" style={{ fontFamily: "'The Seasons', serif" }}>Orders</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-0 border border-[#BFC3C7] w-fit">
        {["all","pending","shipped","delivered"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-3 text-xs tracking-widest uppercase transition-all ${filter === f ? "bg-black text-white" : "text-[#8A8A8A] hover:text-black"} ${f !== "all" ? "border-l border-[#BFC3C7]" : ""}`}>
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="border border-[#BFC3C7] overflow-hidden">
        <table className="w-full" style={{ fontFamily: "'Nexa', sans-serif" }}>
          <thead>
            <tr className="border-b border-[#BFC3C7] bg-[#F8F8F8]">
              {["Order ID","Customer","Items","Total","Status","Date",""].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs tracking-widest text-[#8A8A8A] uppercase font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o._id} className="border-b border-[#BFC3C7] last:border-b-0 hover:bg-[#F8F8F8] transition-colors">
                <td className="px-5 py-4 text-sm font-bold text-black">{o.orderID}</td>
                <td className="px-5 py-4">
                  <p className="text-sm font-medium text-black">{o.customer}</p>
                  <p className="text-xs text-[#8A8A8A]">{o.customerEmail}</p>
                </td>
                <td className="px-5 py-4 text-sm text-[#2B2B2B]">{o.items.length} item{o.items.length !== 1 ? "s" : ""}</td>
                <td className="px-5 py-4 text-sm font-bold text-black">₹{o.total.toLocaleString()}</td>
                <td className="px-5 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-5 py-4 text-xs text-[#8A8A8A]">{o.date}</td>
                <td className="px-5 py-4">
                  <button onClick={() => setSelected(o)}
                    className="flex items-center gap-1.5 text-xs tracking-widest uppercase border border-[#BFC3C7] px-3 py-2 hover:border-black hover:text-black text-[#8A8A8A] transition-all">
                    <Eye size={12} /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <OrderModal order={selected} onClose={() => setSelected(null)} onStatusChange={updateStatus} />}
    </div>
  );
};

// ─── MAIN CMS LAYOUT ──────────────────────────────────────────────────────────

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "customers", label: "Customers", icon: Users },
  { id: "orders", label: "Orders", icon: ShoppingBag },
];

export default function CMSDashboard() {
  const [page, setPage] = useState("dashboard");
  const [categories, setCategories] = useState(MOCK_CATEGORIES);

  const addCategory = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    setCategories(prev => [...prev, { _id: `cat${Date.now()}`, name, slug, productCount: 0 }]);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden" style={{ fontFamily: "'Nexa', sans-serif" }}>
      {/* Google Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
        :root { --seasons: 'Cormorant Garamond', serif; --nexa: 'Jost', sans-serif; }
        [style*="The Seasons"], h1, h2 { font-family: var(--seasons) !important; }
        body, * { font-family: var(--nexa); }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #F8F8F8; } ::-webkit-scrollbar-thumb { background: #BFC3C7; }
        ::-webkit-scrollbar-thumb:hover { background: #8A8A8A; }
      `}</style>

      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-[#BFC3C7] flex flex-col bg-white">
        {/* Logo */}
        <div className="px-6 py-7 border-b border-[#BFC3C7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black" />
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-black leading-none">Brand</p>
              <p className="text-[10px] tracking-[0.3em] text-[#8A8A8A] uppercase mt-0.5">Admin CMS</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setPage(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-all text-left ${page === id ? "bg-black text-white" : "text-[#8A8A8A] hover:text-black hover:bg-[#F8F8F8]"}`}>
              <Icon size={15} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-6 py-5 border-t border-[#BFC3C7]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2B2B2B] text-white text-xs flex items-center justify-center font-bold">AD</div>
            <div>
              <p className="text-xs font-bold text-black">Admin</p>
              <p className="text-[10px] text-[#8A8A8A]">Super User</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-[#BFC3C7] flex-shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#8A8A8A] tracking-widest uppercase">
            <span>CMS</span>
            <ChevronRight size={12} />
            <span className="text-black">{NAV.find(n => n.id === page)?.label}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={18} className="text-[#8A8A8A]" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-black rounded-full" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {page === "dashboard" && <AnalyticsPage />}
          {page === "products" && <ProductsPage categories={categories} onAddCategory={addCategory} />}
          {page === "customers" && <CustomersPage />}
          {page === "orders" && <OrdersPage />}
        </div>
      </main>
    </div>
  );
}