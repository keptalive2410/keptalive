'use client';

import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  User, Mail, Phone, MapPin, Calendar, CreditCard, 
  Edit2, LogOut, Save, X, Camera, ChevronRight,
  Home, Building2, Globe, Shield
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Isabella Rodriguez',
    email: 'isabella.rodriguez@email.com',
    phone: '+91 98765 43210',
    dateOfBirth: '1995-06-15',
    gender: 'Female',
    alternatePhone: '+91 98765 43211',
    address: {
      street: '123, MG Road, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    savedCards: 2,
    savedAddresses: 3,
    memberSince: 'January 2022'
  });

  const [editedData, setEditedData] = useState({ ...profileData });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editedData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Add logout logic here
      console.log('Logging out...');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white pt-12">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Profile Header */}
        <div className="bg-black text-white rounded-2xl p-6 md:p-8 mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center text-4xl md:text-5xl font-bold border-4 border-white">
                {profileData.fullName.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{profileData.fullName}</h1>
              <p className="text-gray-400 mb-4">{profileData.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-400">Member Since</p>
                  <p className="text-sm font-semibold">{profileData.memberSince}</p>
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-400">Saved Addresses</p>
                  <p className="text-sm font-semibold">{profileData.savedAddresses}</p>
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-lg">
                  <p className="text-xs text-gray-400">Payment Methods</p>
                  <p className="text-sm font-semibold">{profileData.savedCards}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-700"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Personal Details */}
          <div className="flex flex-col">
            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg flex-1">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5" />
                Personal Information
              </h2>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.phone}</span>
                    </div>
                  )}
                </div>

                {/* Alternate Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Alternate Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedData.alternatePhone}
                      onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.alternatePhone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Address */}
          <div className="flex flex-col">
            <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <MapPin className="w-5 h-5" />
                Address Information
              </h2>

              <div className="space-y-5">
                {/* Street Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.address.street}</span>
                    </div>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.address.city}</span>
                    </div>
                  )}
                </div>

                {/* State & Pincode */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm text-gray-900">{profileData.address.state}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.address.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                      />
                    ) : (
                      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm text-gray-900">{profileData.address.pincode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{profileData.address.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Account Section */}
        <div className="mt-8 bg-white border-2 border-red-600 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}