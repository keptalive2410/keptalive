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
      <Navbar />
      <div className="min-h-screen bg-white pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Profile Header */}
          <div className="bg-black text-white p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-full bg-[#2B2B2B] border-2 border-white flex items-center justify-center">
                <span
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'The Seasons', serif" }}
                >
                  {profileData.fullName.charAt(0)}
                </span>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white text-black p-1.5 hover:bg-[#BFC3C7] transition">
                  <Camera className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Name + Email + Stats */}
            <div className="flex-1 text-center md:text-left">
              <h1
                className="text-[clamp(1.4rem,3vw,2rem)] font-bold text-white tracking-wide mb-1"
                style={{ fontFamily: "'The Seasons', serif" }}
              >
                {profileData.fullName}
              </h1>
              <p className="text-[0.78rem] font-light text-[#8A8A8A] tracking-wide mb-6">
                {profileData.email}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  { label: 'Member Since', value: profileData.memberSince },
                  { label: 'Saved Addresses', value: profileData.savedAddresses },
                  { label: 'Payment Methods', value: profileData.savedCards },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-[#2B2B2B] px-4 py-2.5 min-w-[120px]">
                    <p className="text-[0.62rem] font-light text-[#8A8A8A] tracking-widest mb-0.5">{label.toUpperCase()}</p>
                    <p className="text-[0.82rem] font-bold text-white tracking-wide">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 shrink-0">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[0.72rem] font-bold tracking-widest hover:bg-[#BFC3C7] transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    EDIT
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#2B2B2B] text-white text-[0.72rem] font-bold tracking-widest hover:border-white transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[0.72rem] font-bold tracking-widest hover:bg-[#BFC3C7] transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    SAVE
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 border border-[#2B2B2B] text-white text-[0.72rem] font-bold tracking-widest hover:border-white transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    CANCEL
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Personal + Address Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            {/* Personal Info */}
            <div className="border border-[#BFC3C7] p-7">
              <div className="flex items-center gap-2 mb-7 pb-4 border-b border-[#BFC3C7]">
                <User className="w-4 h-4 text-[#8A8A8A]" />
                <h2 className="text-[0.7rem] font-bold tracking-[0.16em] text-black">PERSONAL INFORMATION</h2>
              </div>

              <div className="space-y-5">
                {[
                  { label: 'Full Name', field: 'fullName', type: 'text', icon: <User className="w-4 h-4 text-[#BFC3C7]" /> },
                  { label: 'Email Address', field: 'email', type: 'email', icon: <Mail className="w-4 h-4 text-[#BFC3C7]" /> },
                  { label: 'Phone Number', field: 'phone', type: 'tel', icon: <Phone className="w-4 h-4 text-[#BFC3C7]" /> },
                  { label: 'Alternate Phone', field: 'alternatePhone', type: 'tel', icon: <Phone className="w-4 h-4 text-[#BFC3C7]" /> },
                ].map(({ label, field, type, icon }) => (
                  <div key={field}>
                    <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#8A8A8A] mb-2">{label.toUpperCase()}</p>
                    {isEditing ? (
                      <input
                        type={type}
                        value={editedData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 bg-[#f4f4f4]">
                        {icon}
                        <span className="text-[0.82rem] font-light text-[#2B2B2B] tracking-wide">{profileData[field]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Address Info */}
            <div className="border border-[#BFC3C7] p-7">
              <div className="flex items-center gap-2 mb-7 pb-4 border-b border-[#BFC3C7]">
                <MapPin className="w-4 h-4 text-[#8A8A8A]" />
                <h2 className="text-[0.7rem] font-bold tracking-[0.16em] text-black">ADDRESS INFORMATION</h2>
              </div>

              <div className="space-y-5">
                {/* Street */}
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#8A8A8A] mb-2">STREET ADDRESS</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                      className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#f4f4f4]">
                      <Home className="w-4 h-4 text-[#BFC3C7]" />
                      <span className="text-[0.82rem] font-light text-[#2B2B2B] tracking-wide">{profileData.address.street}</span>
                    </div>
                  )}
                </div>

                {/* City */}
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#8A8A8A] mb-2">CITY</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#f4f4f4]">
                      <Building2 className="w-4 h-4 text-[#BFC3C7]" />
                      <span className="text-[0.82rem] font-light text-[#2B2B2B] tracking-wide">{profileData.address.city}</span>
                    </div>
                  )}
                </div>

                {/* State + Pincode */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'STATE', field: 'state' },
                    { label: 'PINCODE', field: 'pincode' },
                  ].map(({ label, field }) => (
                    <div key={field}>
                      <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#8A8A8A] mb-2">{label}</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedData.address[field]}
                          onChange={(e) => handleAddressChange(field, e.target.value)}
                          className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide"
                        />
                      ) : (
                        <div className="px-4 py-3 bg-[#f4f4f4]">
                          <span className="text-[0.82rem] font-light text-[#2B2B2B] tracking-wide">{profileData.address[field]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Country */}
                <div>
                  <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#8A8A8A] mb-2">COUNTRY</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.address.country}
                      onChange={(e) => handleAddressChange('country', e.target.value)}
                      className="w-full px-4 py-3 border border-[#BFC3C7] text-[0.82rem] font-light text-[#2B2B2B] focus:outline-none focus:border-black transition tracking-wide"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#f4f4f4]">
                      <Globe className="w-4 h-4 text-[#BFC3C7]" />
                      <span className="text-[0.82rem] font-light text-[#2B2B2B] tracking-wide">{profileData.address.country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-[#BFC3C7] p-7">
            <div className="flex items-center gap-2 mb-2 pb-4 border-b border-[#BFC3C7]">
              <Shield className="w-4 h-4 text-[#8A8A8A]" />
              <h2 className="text-[0.7rem] font-bold tracking-[0.16em] text-black">ACCOUNT ACTIONS</h2>
            </div>
            <p className="text-[0.78rem] font-light text-[#8A8A8A] tracking-wide leading-relaxed mb-5">
              Once you delete your account, all your data will be permanently removed. This action cannot be undone.
            </p>
            <button className="px-6 py-3 border border-black text-black text-[0.72rem] font-bold tracking-widest hover:bg-black hover:text-white transition">
              DELETE ACCOUNT
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}