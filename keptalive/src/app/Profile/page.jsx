"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { User, Mail, Phone, Edit2, LogOut, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    userName: "",
    userEmail: "",
    userNumber: "",
  })
  const [orders, setOrders] = useState([])
  const [editedData, setEditedData] = useState({ ...profileData })
  const [loading, setLoading] = useState(true)
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me")
        if (!res.ok) throw new Error("Not authenticated")
        const data = await res.json()
        const user = {
          userName: data.user.userName || "",
          userEmail: data.user.userEmail || "",
          userNumber: data.user.userPhone || "",
        }
        setProfileData(user)
        setEditedData(user)
        setLoading(false)
      } catch (err) {
        console.error(err)
        toast.error("Failed to load profile")
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/users")
        if (!res.ok) throw new Error("Failed to fetch orders")
        const data = await res.json()
        if (data.success) {
          setOrders(data.orders || [])
        }
        setOrdersLoading(false)
      } catch (err) {
        console.error(err)
        setOrdersLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData({ ...profileData })
  }

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setProfileData(data.user)
      setIsEditing(false)
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error)
      toast.error("Profile update failed");
    }
  }

  const handleCancel = () => {
    setEditedData({ ...profileData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/Login"
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500">Loading profile...</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Profile Section */}
          <div className="bg-white border border-[#BFC3C7] p-8 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">My Profile</h1>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-[#2B2B2B] transition"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-[#BFC3C7]" />
                    <input
                      type="text"
                      value={editedData.userName}
                      onChange={(e) => handleInputChange("userName", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#BFC3C7] rounded focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-[#BFC3C7]" />
                    <input
                      type="email"
                      value={editedData.userEmail}
                      disabled
                      className="w-full pl-10 pr-4 py-2 border border-[#BFC3C7] rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold mb-2 text-black">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-[#BFC3C7]" />
                    <input
                      type="tel"
                      value={editedData.userNumber}
                      onChange={(e) => handleInputChange("userNumber", e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#BFC3C7] rounded focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-[#2B2B2B] transition"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-[#BFC3C7] text-black rounded hover:border-black transition"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-[#BFC3C7]">
                  <User className="w-6 h-6 text-[#BFC3C7]" />
                  <div>
                    <p className="text-xs text-[#8A8A8A] uppercase tracking-wide">Full Name</p>
                    <p className="text-lg font-semibold text-black">{profileData.userName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-4 border-b border-[#BFC3C7]">
                  <Mail className="w-6 h-6 text-[#BFC3C7]" />
                  <div>
                    <p className="text-xs text-[#8A8A8A] uppercase tracking-wide">Email</p>
                    <p className="text-lg font-semibold text-black">{profileData.userEmail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-4 border-b border-[#BFC3C7]">
                  <Phone className="w-6 h-6 text-[#BFC3C7]" />
                  <div>
                    <p className="text-xs text-[#8A8A8A] uppercase tracking-wide">Phone</p>
                    <p className="text-lg font-semibold text-black">{profileData.userNumber || "Not provided"}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="bg-white border border-[#BFC3C7] p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-black mb-6">Order History</h2>

            {ordersLoading ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No orders found</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border border-[#BFC3C7] p-4 rounded">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-sm font-bold text-black">{order.orderNumber}</p>
                        <p className="text-xs text-[#8A8A8A]">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-black">₹{order.totalAmount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          order.status === "FULFILLED" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div className="space-y-2 border-t border-[#BFC3C7] pt-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-[#8A8A8A]">
                            <p>{item.productID?.productName} × {item.quantity}</p>
                            {item.productSize && <p className="text-xs">Size: {item.productSize}</p>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

  const handleDeleteAddress = async (index) => {
    const updated = profileData.userAddress.filter((_, i) => i !== index)
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profileData, userAddress: updated }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setProfileData(data.user)
      setEditedData(data.user)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/Login"
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error)
      toast.error("Logout failed");
    }
  }

  // return (
  //   <>
  //     <Navbar />
  //     <div className="min-h-screen bg-white pt-12">
  //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

  //         <div className="bg-black text-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
  //           <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
  //             <div className="relative">
  //               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-white">
  //                 {profileData.userName?.charAt(0)}
  //               </div>
  //             </div>

  //             <div className="flex-1 text-center md:text-left">
  //               <h1 className="text-2xl md:text-3xl font-bold mb-2">
  //                 {profileData.userName}
  //               </h1>
  //               <p className="text-gray-400 mb-4">{profileData.userEmail}</p>
  //               <div className="flex flex-wrap gap-4 justify-center md:justify-start">
  //                 <div className="bg-gray-800 px-4 py-2 rounded-lg">
  //                   <p className="text-xs text-gray-400">Member Since</p>
  //                   <p className="text-sm font-semibold">
  //                     {profileData.signUpDate
  //                       ? new Date(profileData.signUpDate).toLocaleDateString()
  //                       : "N/A"}
  //                   </p>
  //                 </div>
  //                 <div className="bg-gray-800 px-4 py-2 rounded-lg">
  //                   <p className="text-xs text-gray-400">Saved Addresses</p>
  //                   <p className="text-sm font-semibold">
  //                     {profileData.userAddress?.length || 0}
  //                   </p>
  //                 </div>
  //                 <div className="bg-gray-800 px-4 py-2 rounded-lg">
  //                   <p className="text-xs text-gray-400">Cart Items</p>
  //                   <p className="text-sm font-semibold">
  //                     {profileData.cartData?.length || 0}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="flex gap-3">
  //               {!isEditing ? (
  //                 <>
  //                   <button
  //                     onClick={handleEdit}
  //                     className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
  //                   >
  //                     <Edit2 className="w-4 h-4" />
  //                     <span className="hidden sm:inline">Edit Profile</span>
  //                   </button>
  //                   <button
  //                     onClick={handleLogout}
  //                     className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
  //                   >
  //                     <LogOut className="w-4 h-4" />
  //                     <span className="hidden sm:inline">Logout</span>
  //                   </button>
  //                 </>
  //               ) : (
  //                 <>
  //                   <button
  //                     onClick={handleSave}
  //                     className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
  //                   >
  //                     <Save className="w-4 h-4" />
  //                     Save
  //                   </button>
  //                   <button
  //                     onClick={handleCancel}
  //                     className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
  //                   >
  //                     <X className="w-4 h-4" />
  //                     Cancel
  //                   </button>
  //                 </>
  //               )}
  //             </div>
  //           </div>
  //         </div>

  //         <div className="grid md:grid-cols-2 gap-8">
  //           <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
  //             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
  //               <User className="w-5 h-5" />
  //               Personal Information
  //             </h2>

  //             <div className="space-y-5">
  //               <div>
  //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
  //                   Full Name
  //                 </label>
  //                 {isEditing ? (
  //                   <input
  //                     type="text"
  //                     value={editedData.userName}
  //                     onChange={(e) => handleInputChange("userName", e.target.value)}
  //                     className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                   />
  //                 ) : (
  //                   <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
  //                     <User className="w-5 h-5 text-gray-600" />
  //                     <span className="font-medium text-gray-900">{profileData.userName}</span>
  //                   </div>
  //                 )}
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
  //                   Email Address
  //                 </label>
  //                 {isEditing ? (
  //                   <input
  //                     type="email"
  //                     value={editedData.userEmail}
  //                     onChange={(e) => handleInputChange("userEmail", e.target.value)}
  //                     className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                   />
  //                 ) : (
  //                   <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
  //                     <Mail className="w-5 h-5 text-gray-600" />
  //                     <span className="font-medium text-gray-900">{profileData.userEmail || ""}</span>
  //                   </div>
  //                 )}
  //               </div>

  //               <div>
  //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
  //                   Phone Number
  //                 </label>
  //                 {isEditing ? (
  //                   <input
  //                     type="tel"
  //                     value={editedData.userNumber}
  //                     onChange={(e) => handleInputChange("userNumber", e.target.value)}
  //                     className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                   />
  //                 ) : (
  //                   <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
  //                     <Phone className="w-5 h-5 text-gray-600" />
  //                     <span className="font-medium text-gray-900">{profileData.userNumber || ""}</span>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           </div>

  //           <div className="flex flex-col gap-4">
  //             {(isEditing ? editedData : profileData).userAddress?.map((address, index) => (
  //               <div key={index} className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
  //                 <div className="flex items-center justify-between mb-5">
  //                   <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
  //                     <MapPin className="w-5 h-5" />
  //                     {index === 0 ? "Primary Address" : `Address ${index + 1}`}
  //                   </h2>
  //                   <div className="flex items-center gap-2">
  //                     {index === 0 && (
  //                       <span className="text-xs bg-black text-white px-2 py-1 rounded-full font-semibold">
  //                         Primary
  //                       </span>
  //                     )}
  //                     {!isEditing && (
  //                       <button
  //                         onClick={() => handleDeleteAddress(index)}
  //                         className="text-red-500 hover:text-red-700 transition-colors p-1"
  //                       >
  //                         <X className="w-4 h-4" />
  //                       </button>
  //                     )}
  //                   </div>
  //                 </div>

  //                 <div className="space-y-4">
  //                   <div>
  //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
  //                       Street Address
  //                     </label>
  //                     {isEditing ? (
  //                       <input
  //                         type="text"
  //                         value={editedData.userAddress[index]?.AddressLine1 || ""}
  //                         onChange={(e) => handleAddressChange(index, "AddressLine1", e.target.value)}
  //                         className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                       />
  //                     ) : (
  //                       <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
  //                         <Home className="w-5 h-5 text-gray-600" />
  //                         <span className="font-medium text-gray-900">{address.AddressLine1 || "—"}</span>
  //                       </div>
  //                     )}
  //                   </div>

  //                   <div>
  //                     <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
  //                     {isEditing ? (
  //                       <input
  //                         type="text"
  //                         value={editedData.userAddress[index]?.City || ""}
  //                         onChange={(e) => handleAddressChange(index, "City", e.target.value)}
  //                         className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                       />
  //                     ) : (
  //                       <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
  //                         <Building2 className="w-5 h-5 text-gray-600" />
  //                         <span className="font-medium text-gray-900">{address.City || "—"}</span>
  //                       </div>
  //                     )}
  //                   </div>

  //                   <div className="grid grid-cols-2 gap-4">
  //                     <div>
  //                       <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
  //                       {isEditing ? (
  //                         <input
  //                           type="text"
  //                           value={editedData.userAddress[index]?.State || ""}
  //                           onChange={(e) => handleAddressChange(index, "State", e.target.value)}
  //                           className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                         />
  //                       ) : (
  //                         <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
  //                           <span className="font-medium text-sm text-gray-900">{address.State || "—"}</span>
  //                         </div>
  //                       )}
  //                     </div>

  //                     <div>
  //                       <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
  //                       {isEditing ? (
  //                         <input
  //                           type="text"
  //                           value={editedData.userAddress[index]?.PinCode || ""}
  //                           onChange={(e) => handleAddressChange(index, "PinCode", e.target.value)}
  //                           className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                         />
  //                       ) : (
  //                         <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
  //                           <span className="font-medium text-sm text-gray-900">{address.PinCode || "—"}</span>
  //                         </div>
  //                       )}
  //                     </div>
  //                   </div>

  //                   <div>
  //                     <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
  //                     {isEditing ? (
  //                       <input
  //                         type="text"
  //                         value={editedData.userAddress[index]?.Country || ""}
  //                         onChange={(e) => handleAddressChange(index, "Country", e.target.value)}
  //                         className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                       />
  //                     ) : (
  //                       <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
  //                         <Globe className="w-5 h-5 text-gray-600" />
  //                         <span className="font-medium text-gray-900">{address.Country || "—"}</span>
  //                       </div>
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}

  //             {!showAddAddress ? (
  //               <button
  //                 onClick={() => setShowAddAddress(true)}
  //                 className="w-full border-2 border-dashed border-black rounded-2xl p-5 flex items-center justify-center gap-2 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
  //               >
  //                 <Plus className="w-5 h-5" />
  //                 Add New Address
  //               </button>
  //             ) : (
  //               <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
  //                 <div className="flex items-center justify-between mb-5">
  //                   <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
  //                     <MapPin className="w-5 h-5" />
  //                     New Address
  //                   </h2>
  //                   <button
  //                     onClick={() => setShowAddAddress(false)}
  //                     className="text-gray-500 hover:text-gray-700 transition-colors"
  //                   >
  //                     <X className="w-5 h-5" />
  //                   </button>
  //                 </div>

  //                 <div className="space-y-4">
  //                   <div>
  //                     <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
  //                     <input
  //                       type="text"
  //                       value={newAddress.AddressLine1}
  //                       onChange={(e) => setNewAddress((prev) => ({ ...prev, AddressLine1: e.target.value }))}
  //                       className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                       placeholder="123 Main St"
  //                     />
  //                   </div>

  //                   <div>
  //                     <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
  //                     <input
  //                       type="text"
  //                       value={newAddress.City}
  //                       onChange={(e) => setNewAddress((prev) => ({ ...prev, City: e.target.value }))}
  //                       className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                       placeholder="City"
  //                     />
  //                   </div>

  //                   <div className="grid grid-cols-2 gap-4">
  //                     <div>
  //                       <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
  //                       <input
  //                         type="text"
  //                         value={newAddress.State}
  //                         onChange={(e) => setNewAddress((prev) => ({ ...prev, State: e.target.value }))}
  //                         className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                         placeholder="State"
  //                       />
  //                     </div>
  //                     <div>
  //                       <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
  //                       <input
  //                         type="text"
  //                         value={newAddress.PinCode}
  //                         onChange={(e) => setNewAddress((prev) => ({ ...prev, PinCode: e.target.value }))}
  //                         className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                         placeholder="000000"
  //                       />
  //                     </div>
  //                   </div>

  //                   <div>
  //                     <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
  //                     <input
  //                       type="text"
  //                       value={newAddress.Country}
  //                       onChange={(e) => setNewAddress((prev) => ({ ...prev, Country: e.target.value }))}
  //                       className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
  //                       placeholder="Country"
  //                     />
  //                   </div>

  //                   <button
  //                     onClick={handleAddAddress}
  //                     className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
  //                   >
  //                     <Plus className="w-4 h-4" />
  //                     Save Address
  //                   </button>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>

  //         <div className="mt-8 bg-white border-2 border-red-600 rounded-2xl p-6 shadow-lg">
  //           <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
  //           <p className="text-gray-600 mb-4">
  //             Once you delete your account, there is no going back. Please be certain.
  //           </p>
  //           <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors">
  //             Delete Account
  //           </button>
  //         </div>

  //       </div>
  //     </div>
  //     <Footer />
  //     <Footer />
  //   </>
  // )
