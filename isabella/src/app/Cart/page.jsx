'use client';

import { useState } from 'react';
import { X, Tag, Gift } from 'lucide-react';
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

export default function CartPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]); // Empty initially - will show modal
  const [addressForm, setAddressForm] = useState({
    name: '',
    email: '',
    mobile: '',
    pincode: '',
    houseNumber: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    addressType: 'Home',
    paymentType: 'COD'
  });

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Elegant Blazer',
      brand: 'Isabella Collection',
      seller: 'Isabella Retail Pvt Ltd',
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop',
      size: 'M',
      qty: 1,
      price: 2499,
      originalPrice: 4999,
      discount: '50% OFF',
      returnDays: 14
    },
    {
      id: 2,
      name: 'Classic White Shirt',
      brand: 'Isabella Basics',
      seller: 'Isabella Fashion',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop',
      size: 'S',
      qty: 1,
      price: 1299,
      originalPrice: 2599,
      discount: '50% OFF',
      returnDays: 7
    },
    {
      id: 3,
      name: 'Formal Trousers',
      brand: 'Isabella Elite',
      seller: 'Isabella Garments',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop',
      size: 'L',
      qty: 1,
      price: 1899,
      originalPrice: 3799,
      discount: '50% OFF',
      returnDays: 14,
      badge: '1 left'
    },
    {
      id: 4,
      name: 'Designer Handbag',
      brand: 'Isabella Luxe',
      seller: 'Isabella Accessories',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
      size: 'Onesize',
      qty: 1,
      price: 899,
      originalPrice: 2499,
      discount: '64% OFF',
      returnDays: 7
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([1, 2, 3, 4]);

  const toggleItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(i => i !== id));
  };

  const removeSelectedItems = () => {
    setCartItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const selectedCartItems = cartItems.filter(item => selectedItems.includes(item.id));
  const totalMRP = selectedCartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const totalPrice = selectedCartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = totalMRP - totalPrice;
  const platformFee = 23;
  const finalAmount = totalPrice + platformFee;

  const handlePlaceOrder = () => {
    if (savedAddresses.length === 0) {
      setShowAddressModal(true);
    } else {
      // Navigate to address page
      window.location.href = '/address';
    }
  };

  const handleSaveAddress = () => {
    if (!addressForm.name || !addressForm.email || !addressForm.mobile || !addressForm.pincode || !addressForm.address) {
      alert('Please fill all required fields');
      return;
    }
    // Add the address to saved addresses
    setSavedAddresses([...savedAddresses, { ...addressForm, id: Date.now() }]);
    setShowAddressModal(false);
    // Reset form
    setAddressForm({
      name: '',
      email: '',
      mobile: '',
      pincode: '',
      houseNumber: '',
      address: '',
      locality: '',
      city: '',
      state: '',
      addressType: 'Home',
      paymentType: 'COD'
    });
    // Navigate to address selection page
    window.location.href = '/address';
  };

  const handleInputChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Info */}
            <div className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
              <span className="font-medium text-gray-800">Check delivery time & services</span>
              <button className="px-4 py-2 border border-pink-600 text-pink-600 rounded font-medium hover:bg-pink-50">
                ENTER PIN CODE
              </button>
            </div>

            {/* Items Selection */}
            <div className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === cartItems.length}
                    onChange={() => {
                      if (selectedItems.length === cartItems.length) {
                        setSelectedItems([]);
                      } else {
                        setSelectedItems(cartItems.map(item => item.id));
                      }
                    }}
                    className="w-5 h-5 text-pink-600 rounded"
                  />
                  <span className="font-semibold text-gray-900">{selectedItems.length}/{cartItems.length} ITEMS SELECTED</span>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={removeSelectedItems}
                    className="text-sm font-medium text-gray-700 hover:text-pink-600"
                  >
                    REMOVE
                  </button>
                  <button className="text-sm font-medium text-gray-700 hover:text-pink-600">MOVE TO WISHLIST</button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="border-t pt-4 relative">
                    <div className="flex space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItem(item.id)}
                        className="w-5 h-5 text-pink-600 rounded mt-2"
                      />
                      <img src={item.image} alt={item.name} className="w-28 h-36 object-cover rounded" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.brand}</h3>
                            <p className="text-sm text-gray-700">{item.name}</p>
                            <p className="text-xs text-gray-600">Sold by: {item.seller}</p>
                            <div className="flex space-x-4 mt-2 text-sm">
                              <select className="border rounded px-2 py-1 text-gray-800">
                                <option>Size: {item.size}</option>
                              </select>
                              <select className="border rounded px-2 py-1 text-gray-800">
                                <option>Qty: {item.qty}</option>
                              </select>
                              {item.badge && (
                                <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-xs font-medium">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                              <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                              <span className="text-sm text-gray-400 line-through">₹{item.originalPrice.toLocaleString()}</span>
                              <span className="text-sm text-orange-600 font-medium">{item.discount}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {item.returnDays} days return available
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Prompt */}
            <div className="bg-white p-4 rounded shadow-sm flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <span className="text-sm text-gray-800">Login to see items from your existing bag and wishlist.</span>
              </div>
              <button className="px-6 py-2 text-pink-600 font-semibold hover:bg-pink-50 rounded">
                LOGIN NOW
              </button>
            </div>
          </div>

          {/* Right Column - Price Details */}
          <div className="space-y-4">
            {/* Coupons */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900">COUPONS</h3>
              <div className="flex items-center justify-between border rounded p-3">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-gray-700" />
                  <span className="text-sm text-gray-800">Apply Coupons</span>
                </div>
                <button className="px-4 py-1 border border-pink-600 text-pink-600 rounded font-medium text-sm hover:bg-pink-50">
                  APPLY
                </button>
              </div>
              <p className="text-sm text-pink-600 mt-2">
                <span className="font-medium cursor-pointer hover:underline">Login</span> to get upto ₹200 OFF on first order
              </p>
            </div>

            {/* Gift Option */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-900">GIFTING & PERSONALISATION</h3>
              <div className="bg-pink-50 p-3 rounded flex space-x-3">
                <Gift className="w-12 h-12 text-pink-600" />
                <div>
                  <p className="font-medium text-sm text-gray-900">Buying for a loved one?</p>
                  <p className="text-xs text-gray-700">Gift Packaging and personalised message on card, Only for ₹35</p>
                  <button className="text-sm text-pink-600 font-medium mt-1 hover:underline">
                    ADD GIFT PACKAGE
                  </button>
                </div>
              </div>
            </div>

            {/* Donation */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-3 text-sm text-gray-900">SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA</h3>
              <div className="flex items-start space-x-2 mb-3">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm text-gray-800">Donate and make a difference</span>
              </div>
              <div className="flex space-x-2">
                {[10, 20, 50, 100].map(amount => (
                  <button key={amount} className="px-4 py-2 border rounded hover:border-pink-600 text-sm text-gray-800">
                    ₹{amount}
                  </button>
                ))}
              </div>
              <button className="text-sm text-pink-600 font-medium mt-2 hover:underline">
                Know More
              </button>
            </div>

            {/* Price Details */}
            <div className="bg-white p-4 rounded shadow-sm">
              <h3 className="font-semibold mb-4 text-gray-900">PRICE DETAILS ({selectedItems.length} Items)</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-800">
                  <span>Total MRP</span>
                  <span>₹{totalMRP.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span>- ₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Coupon Discount</span>
                  <button className="text-pink-600 font-medium hover:underline">Apply Coupon</button>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Platform Fee</span>
                  <span className="text-pink-600 cursor-pointer hover:underline">Know More</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={handlePlaceOrder}
                className="w-full bg-pink-600 text-white py-3 rounded font-semibold mt-4 hover:bg-pink-700"
              >
                PLACE ORDER
              </button>
              <p className="text-xs text-gray-500 mt-3">
                By placing the order, you agree to Isabella's{' '}
                <a href="#" className="text-pink-600 hover:underline">Terms of Use</a>
                {' '}and{' '}
                <a href="#" className="text-pink-600 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* Left Side - Form */}
              <div className="p-6 overflow-y-auto max-h-[90vh]">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">CONTACT DETAILS</h2>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={addressForm.name}
                    onChange={handleInputChange}
                    placeholder="Name*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                  />
                  
                  <input
                    type="email"
                    name="email"
                    value={addressForm.email}
                    onChange={handleInputChange}
                    placeholder="Email Address*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                  />
                  
                  <input
                    type="tel"
                    name="mobile"
                    value={addressForm.mobile}
                    onChange={handleInputChange}
                    placeholder="Mobile No*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                  />

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">ADDRESS</h3>
                  </div>

                  <input
                    type="text"
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleInputChange}
                    placeholder="Pin Code*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                  />

                  <div>
                    <input
                      type="text"
                      name="houseNumber"
                      value={addressForm.houseNumber}
                      onChange={handleInputChange}
                      placeholder="House Number/Tower/Block*"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                    />
                    <p className="text-xs text-orange-500 mt-1">*House Number will allow a doorstep delivery</p>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="address"
                      value={addressForm.address}
                      onChange={handleInputChange}
                      placeholder="Address (locality,building,street)*"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                    />
                    <p className="text-xs text-orange-500 mt-1">*Please update society/apartment details</p>
                  </div>

                  <input
                    type="text"
                    name="locality"
                    value={addressForm.locality}
                    onChange={handleInputChange}
                    placeholder="Locality / Town*"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleInputChange}
                      placeholder="City / District*"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                    />
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state}
                      onChange={handleInputChange}
                      placeholder="State*"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-pink-600 text-gray-800"
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">ADDRESS TYPE</h3>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="addressType"
                          value="Home"
                          checked={addressForm.addressType === 'Home'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-pink-600"
                        />
                        <span className="text-gray-800">Home</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="addressType"
                          value="Office"
                          checked={addressForm.addressType === 'Office'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-pink-600"
                        />
                        <span className="text-gray-800">Office</span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">PAYMENT TYPE</h3>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentType"
                          value="COD"
                          checked={addressForm.paymentType === 'COD'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-pink-600"
                        />
                        <span className="text-gray-800">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentType"
                          value="UPI"
                          checked={addressForm.paymentType === 'UPI'}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-pink-600"
                        />
                        <span className="text-gray-800">UPI</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 mt-6 pb-6">
                  <button
                    onClick={() => setShowAddressModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    className="flex-1 px-6 py-3 bg-pink-600 text-white rounded font-semibold hover:bg-pink-700"
                  >
                    Place Order
                  </button>
                </div>
              </div>

              {/* Right Side - Price Summary */}
              <div className="bg-gray-50 p-6 border-l">
                <div className="bg-white p-4 rounded shadow-sm sticky top-6">
                  <h3 className="font-semibold mb-4 text-gray-900 text-sm">PRICE DETAILS (5 Items)</h3>
                  
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between text-gray-800">
                      <span>Total MRP</span>
                      <span>₹19,778</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount on MRP</span>
                      <span>- ₹10,593</span>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span>Platform Fee</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-pink-600 cursor-pointer hover:underline text-xs">Know More</span>
                        <span>₹23</span>
                      </div>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-base text-gray-900">
                      <span>Total Amount</span>
                      <span>₹9,208</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}