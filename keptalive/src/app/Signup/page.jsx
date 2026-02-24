'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Phone, Chrome, User, Check, MapPin, Home } from 'lucide-react';

export default function SignupPage() {
  const [signupMethod, setSignupMethod] = useState('email'); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userNumber: '',
    userPassword: '',
    confirmPassword: '',
    authProvider: 'local',
    userAddress: {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      State: '',
      PinCode: '',
      Country: 'India'
    }
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error on input change
    
    // Calculate password strength
    if (field === 'userPassword') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[a-z]/.test(value) && /[A-Z]/.test(value)) strength++;
      if (/\d/.test(value)) strength++;
      if (/[^a-zA-Z\d]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      userAddress: {
        ...prev.userAddress,
        [field]: value
      }
    }));
    setError('');
  };

  const validateForm = () => {
    // Validate name
    if (!formData.userName || formData.userName.trim().length < 2) {
      setError('Please enter a valid name (minimum 2 characters)');
      return false;
    }

    // Validate email or phone based on signup method
    if (signupMethod === 'email') {
      if (!formData.userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
        setError('Please enter a valid email address');
        return false;
      }
    } else {
      if (!formData.userNumber || !/^\+?[\d\s-()]{10,}$/.test(formData.userNumber)) {
        setError('Please enter a valid phone number');
        return false;
      }
    }

    // Validate password (minimum 8 characters as per schema)
    if (!formData.userPassword || formData.userPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Check password match
    if (formData.userPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Validate address fields
    if (!formData.userAddress.AddressLine1 || formData.userAddress.AddressLine1.trim().length < 3) {
      setError('Please enter a valid address line 1');
      return false;
    }

    if (!formData.userAddress.City || formData.userAddress.City.trim().length < 2) {
      setError('Please enter a valid city');
      return false;
    }

    if (!formData.userAddress.State || formData.userAddress.State.trim().length < 2) {
      setError('Please enter a valid state');
      return false;
    }

    if (!formData.userAddress.PinCode || !/^\d{6}$/.test(formData.userAddress.PinCode)) {
      setError('Please enter a valid 6-digit pincode');
      return false;
    }

    // Check terms agreement
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      // Prepare data according to schema
      const signupData = {
        userName: formData.userName.trim(),
        userEmail: signupMethod === 'email' ? formData.userEmail.toLowerCase() : '',
        userNumber: signupMethod === 'phone' ? formData.userNumber : '',
        userPassword: formData.userPassword,
        authProvider: 'local',
        userAddress: [{
          AddressLine1: formData.userAddress.AddressLine1.trim(),
          AddressLine2: formData.userAddress.AddressLine2.trim(),
          City: formData.userAddress.City.trim(),
          State: formData.userAddress.State.trim(),
          PinCode: formData.userAddress.PinCode.trim(),
          Country: formData.userAddress.Country
        }]
      };

      // Make sure at least email or phone is provided
      if (signupMethod === 'phone' && !signupData.userEmail) {
        // If signing up with phone, you might want to ask for email later
        // or make email optional in your backend
        signupData.userEmail = `${signupData.userNumber}@temp.com`; // Temporary email
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success! Redirect to login or dashboard
        alert('Account created successfully!');
        window.location.href = '/login';
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Redirect to Google OAuth
      // This should be configured in your backend
      window.location.href = '/api/auth/google';
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Google signup failed. Please try again.');
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white rounded-2xl mb-4">
            <span className="text-3xl font-bold">I</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join Isabella today</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-2xl">
          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-black rounded-lg hover:bg-gray-50 transition-colors mb-6 group"
          >
            <Chrome className="w-5 h-5 text-gray-700 group-hover:text-black" />
            <span className="font-semibold text-gray-900">Sign up with Google</span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>

          {/* Signup Method Toggle */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSignupMethod('email')}
              className={`flex-1 py-2.5 rounded-md font-semibold transition-all ${
                signupMethod === 'email'
                  ? 'bg-black text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setSignupMethod('phone')}
              className={`flex-1 py-2.5 rounded-md font-semibold transition-all ${
                signupMethod === 'phone'
                  ? 'bg-black text-white shadow-md'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Phone
            </button>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* User Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email/Phone Input */}
            {signupMethod === 'email' ? (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => handleInputChange('userEmail', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.userNumber}
                    onChange={(e) => handleInputChange('userNumber', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.userPassword}
                  onChange={(e) => handleInputChange('userPassword', e.target.value)}
                  placeholder="Create a strong password (min. 8 characters)"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.userPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength ? getPasswordStrengthColor() : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  {passwordStrength > 0 && (
                    <p className="text-xs text-gray-600">
                      Password strength: <span className="font-semibold">{getPasswordStrengthText()}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.userPassword !== formData.confirmPassword && (
                <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Address Section Header */}
            <div className="pt-4 border-t-2 border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Address</h3>
            </div>

            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.userAddress.AddressLine1}
                onChange={(e) => handleAddressChange('AddressLine1', e.target.value)}
                placeholder="House/Flat No., Building Name"
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address Line 2 <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.userAddress.AddressLine2}
                onChange={(e) => handleAddressChange('AddressLine2', e.target.value)}
                placeholder="Street, Area, Landmark"
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                disabled={loading}
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.userAddress.City}
                  onChange={(e) => handleAddressChange('City', e.target.value)}
                  placeholder="Mumbai"
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.userAddress.State}
                  onChange={(e) => handleAddressChange('State', e.target.value)}
                  placeholder="Maharashtra"
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Pincode and Country */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.userAddress.PinCode}
                  onChange={(e) => handleAddressChange('PinCode', e.target.value)}
                  placeholder="400001"
                  maxLength={6}
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.userAddress.Country}
                  onChange={(e) => handleAddressChange('Country', e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black text-gray-900 placeholder-gray-400 transition-colors bg-gray-50"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => setAgreedToTerms(!agreedToTerms)}
                className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  agreedToTerms
                    ? 'bg-black border-black'
                    : 'bg-white border-gray-300 hover:border-black'
                }`}
              >
                {agreedToTerms && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              <label className="text-sm text-gray-600 cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
                I agree to Isabella's{' '}
                <a href="#" className="font-semibold text-gray-900 underline hover:no-underline">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="font-semibold text-gray-900 underline hover:no-underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating Account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/Login" className="font-bold text-gray-900 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}