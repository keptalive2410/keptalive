'use client';

import { useState } from 'react';
import { X, Star, Package, CheckCircle, Search, SlidersHorizontal, ChevronRight, User, Heart, ShoppingBag, ArrowLeftRight } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrdersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('exchange');
  const [searchQuery, setSearchQuery] = useState('');

  const recommendations = [
    {
      id: 1,
      brand: 'SOTRUE',
      name: 'Sotrue Strobe Cream for Face',
      price: 349,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80'
    },
    {
      id: 2,
      brand: 'MARS',
      name: 'MARS Edge Of Desire Matte Long Lasting Lipstick',
      price: 64,
      originalPrice: 69,
      discount: '7% OFF',
      size: 'Onesize',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80'
    },
    {
      id: 3,
      brand: 'Lakme',
      name: 'Lakme Perfect Radiance Day Gel Cream',
      price: 332,
      originalPrice: 415,
      discount: '20% OFF',
      size: '40-50gm',
      image: 'https://images.unsplash.com/photo-1556229010-aa3c720dfb96?w=400&q=80'
    }
  ];

  const orders = [
    {
      id: 1,
      status: 'refund',
      refundAmount: 1199.00,
      refundDate: 'Sun, 28 Sep',
      products: [
        {
          brand: 'GLO GLAMP',
          name: 'Women White Ribbon High Pencil Heels Gladiators',
          size: '7',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80'
        }
      ]
    },
    {
      id: 2,
      status: 'delivered',
      deliveryDate: 'Fri, 2 Aug 2024',
      exchangeReturnDeadline: 'Fri, 9 Aug 2024',
      products: [
        {
          brand: 'ADRO',
          name: 'Men Printed Hooded Pullover Sweatshirt',
          size: 'L',
          image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80'
        }
      ]
    }
  ];

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setActiveTab('exchange');
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1">
          {/* Main Content Area */}
          <main className="">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">All orders</h1>
                  <p className="text-sm text-gray-500">from anytime</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search in orders"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className='text-gray-700'>FILTER</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 mb-6">
              <h2 className="text-sm font-semibold text-blue-900 mb-4">Frequently bought by shoppers like you</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900">{item.brand}</p>
                        <p className="text-xs text-gray-600 truncate">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {item.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                          )}
                          <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
                          {item.discount && (
                            <span className="text-xs font-semibold text-orange-600">{item.discount}</span>
                          )}
                        </div>
                        {item.size && (
                          <p className="text-xs text-gray-500 mt-1">{item.size}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Order Status Header */}
                  {order.status === 'refund' && (
                    <div className="bg-white border-l-4 border-teal-500 p-4 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-teal-500 rounded-full p-2 mt-1">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Refund Credited</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Your refund of <span className="font-semibold">₹{order.refundAmount.toFixed(2)}</span> for the return has been processed successfully on {order.refundDate}.
                          </p>
                          <button className="text-sm text-pink-600 font-medium mt-2 hover:underline">
                            View Refund details
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {order.status === 'delivered' && (
                    <div className="bg-white border-l-4 border-green-500 p-4 sm:p-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-500 rounded-full p-2 mt-1">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">Delivered</h3>
                          <p className="text-sm text-gray-600 mt-1">On {order.deliveryDate}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Product Details */}
                  {order.products.map((product, idx) => (
                    <div key={idx} className="p-4 sm:p-6 border-t border-gray-100">
                      <div className="flex gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{product.brand}</h4>
                          <p className="text-sm text-gray-600 mt-1">{product.name}</p>
                          <p className="text-sm text-gray-500 mt-1">Size: {product.size}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                      </div>

                      {/* Exchange/Return Notice */}
                      {order.status === 'delivered' && order.exchangeReturnDeadline && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-start gap-2">
                          <span className="text-xs text-gray-600">
                            Exchange/Return window closed on {order.exchangeReturnDeadline}
                          </span>
                        </div>
                      )}

                      {/* Rating Section */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          Rate & Review to <span className="text-teal-600 font-semibold">win IsaCash!</span>
                        </p>
                      </div>

                      {/* Exchange/Return Button */}
                      {order.status === 'delivered' && (
                        <div className="mt-4">
                          <button
                            onClick={() => openModal(order)}
                            className="w-full sm:w-auto px-6 py-2.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
                          >
                            <ArrowLeftRight className="w-4 h-4" />
                            Exchange or Return
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Exchange/Return Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Exchange or Return</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('exchange')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'exchange'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Exchange Item
              </button>
              <button
                onClick={() => setActiveTab('return')}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'return'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Return Item
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Product Info */}
              <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedOrder.products[0].image}
                  alt={selectedOrder.products[0].name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{selectedOrder.products[0].brand}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedOrder.products[0].name}</p>
                  <p className="text-sm text-gray-500 mt-1">Size: {selectedOrder.products[0].size}</p>
                </div>
              </div>

              {/* Exchange Content */}
              {activeTab === 'exchange' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Reason for Exchange</h3>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="">Select a reason</option>
                      <option value="size">Size doesn't fit</option>
                      <option value="color">Different color needed</option>
                      <option value="defect">Product has defect</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Select New Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {['6', '7', '8', '9'].map((size) => (
                        <button
                          key={size}
                          className="px-4 py-2 border border-gray-300 rounded-md hover:border-purple-600 hover:bg-purple-50 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Exchange Policy</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Exchange window is 7 days from delivery</li>
                      <li>• Product must be unused with original tags</li>
                      <li>• Free pickup from your address</li>
                      <li>• New item ships once we receive the return</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Return Content */}
              {activeTab === 'return' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Reason for Return</h3>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="">Select a reason</option>
                      <option value="not-needed">No longer needed</option>
                      <option value="quality">Quality issues</option>
                      <option value="wrong">Wrong item received</option>
                      <option value="damaged">Item damaged</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Additional Comments (Optional)</h3>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Tell us more about your experience..."
                    ></textarea>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Refund Information</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <strong>Refund Amount:</strong> ₹{selectedOrder.products[0].brand === 'ADRO' ? '799.00' : '1199.00'}
                      </p>
                      <p className="text-sm text-blue-800 mt-2">
                        Refund will be processed within 5-7 business days after we receive and verify the returned item.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Return Policy</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Return window is 7 days from delivery</li>
                      <li>• Product must be unused with original tags and packaging</li>
                      <li>• Free pickup from your address</li>
                      <li>• Full refund to original payment method</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-md font-medium hover:bg-purple-700 transition-colors">
                  {activeTab === 'exchange' ? 'Request Exchange' : 'Request Return'}
                </button>
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