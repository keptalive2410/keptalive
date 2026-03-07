'use client';

import { useState, useEffect } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight, Truck, RefreshCw, Shield } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useParams, useRouter } from 'next/navigation';


export default function ProductPage() {
    const [selectedSize, setSelectedSize] = useState('S');
    const [selectedColor, setSelectedColor] = useState('Beige');
    const [selectedImage, setSelectedImage] = useState();
    const [quantity, setQuantity] = useState(1);
    const [wishlist, setWishlist] = useState(false);
    const [pincode, setPincode] = useState('');
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [relatedProducts, setrelatedProducts] = useState([]);

    const { slug } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/products/${slug}`);
                const data = await res.json();

                if (!res.ok) {
                    router.push("/products");
                    return;
                }

                setProduct(data.product);

                if (data.product?.productSize?.length) {
                    setSelectedSize(data.product.productSize[0]);
                }

                if (data.product?.productColour?.length) {
                    setSelectedColor(data.product.productColour[0]);
                }

                const relatedRes = await fetch(`/api/products/${slug}/related`);
                const relatedData = await relatedRes.json();

                setrelatedProducts(relatedData.relatedProducts || []);

                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) {
        return <div className="p-20 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="p-20 text-center">Product not found</div>;
    }

    console.log(product.productColour);

    return (
        <>
            <Navbar />
            <div className="pt-12 min-h-screen bg-[#fafaf9]">
                {/* Main Product Section */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Left - Images */}
                        <div className="space-y-4">
                            {/* Image Grid - 2 columns */}
                            <div className="grid grid-cols-2 gap-4">
                                {product.productImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-3/4 bg-stone-100 rounded-sm overflow-hidden group cursor-pointer"
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`${product.productName} view ${index + 1}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {index === 0 && (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-sm">
                                                {product.discount}% OFF
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Product Details */}
                        <div className="space-y-6">
                            {/* Brand & Name */}
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-light text-stone-900 tracking-tight mb-3">{product.productName}</h1>
                            </div>

                            {/* Price */}
                            <div className="border-t border-b border-stone-200 py-6">
                                <div className="flex items-baseline space-x-3">
                                    <span className="text-4xl font-light text-stone-900">₹{product.productSellingPrice}</span>
                                    <span className="text-xl text-stone-400 line-through">₹{product.productOriginalPrice}</span>
                                </div>
                                <p className="text-sm text-green-600 mt-2 font-medium">inclusive of all taxes</p>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900">Select Size</h3>
                                    <button className="text-sm text-red-500 font-medium hover:underline">Size Chart →</button>
                                </div>
                                {product.productSize?.length > 0 && (
                                    <div className="mb-6">
                                        <div className="flex gap-3 mt-2">
                                            {product.productSize.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 border ${selectedSize === size ? "bg-black text-white" : ""}`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Color Selection */}
                            {product.productColour?.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">
                                        Select Color
                                    </h3>

                                    <div className="flex gap-4">
                                        {product.productColour.map((color) => {

                                            const cssColor = color
                                                .toLowerCase()
                                                .replace(/\s+/g, '');

                                            return (
                                                <button
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    title={color}
                                                    className={`relative w-12 h-12 rounded-full border-2 transition-all
              ${selectedColor === color
                                                            ? "ring-2 ring-black ring-offset-2 border-black"
                                                            : "border-gray-300 hover:border-black"
                                                        }`}
                                                    style={{ backgroundColor: cssColor }}
                                                >
                                                    {selectedColor === color && (
                                                        <span className="absolute inset-0 flex items-center justify-center">
                                                            <span className="w-2 h-2 bg-white rounded-full shadow-md" />
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {selectedColor}
                                    </p>
                                </div>
                            )}

                            {/* Quantity Selection */}
                            <div>
                                <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">Quantity</h3>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center border-2 border-stone-300 rounded-sm hover:border-stone-900 transition-all"
                                    >
                                        <span className="text-xl font-light text-gray-600">−</span>
                                    </button>
                                    <span className="text-lg font-medium min-w-[3ch] text-center text-gray-600">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                                        className="w-10 h-10 flex items-center justify-center border-2 border-stone-300 rounded-sm hover:border-stone-900 transition-all"
                                    >
                                        <span className="text-xl font-light text-gray-600">+</span>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4 pt-4">
                                <button className="flex-1 bg-red-500 text-white py-4 px-6 rounded-sm font-medium tracking-wide uppercase hover:bg-red-600 transition-colors shadow-md hover:shadow-lg">
                                    Add to Bag
                                </button>
                                <button
                                    onClick={() => setWishlist(!wishlist)}
                                    className={`p-4 border-2 rounded-sm transition-all ${wishlist ? 'border-red-500 bg-red-50' : 'border-stone-300 hover:border-stone-900'
                                        }`}
                                >
                                    <Heart className={`w-6 h-6 ${wishlist ? 'fill-red-500 text-red-500' : 'text-stone-700'}`} />
                                </button>
                            </div>
                            {/* Product Details */}
                            <div className="border-t border-stone-200 pt-6">
                                <h3 className="text-sm font-medium tracking-widest uppercase text-stone-900 mb-4">Product Details</h3>
                                <p className="text-stone-600 leading-relaxed mb-6">{product.productDescription}</p>

                                {/* Size & Fit */}
                                {/* <div className="mb-6">
                                    <h4 className="font-medium text-stone-900 mb-2">Size & Fit</h4>
                                    <p className="text-sm text-stone-600">{product.sizeAndFit}</p>
                                </div> */}

                                {/* Material & Care */}
                                {/* <div className="mb-6">
                                    <h4 className="font-medium text-stone-900 mb-2">Material & Care</h4>
                                    <p className="text-sm text-stone-600 mb-1">{product.materialAndCare.composition}</p>
                                    <p className="text-sm text-stone-600">{product.materialAndCare.care}</p>
                                </div> */}

                                {/* Specifications */}
                                {/* <div>
                                    <h4 className="font-medium text-stone-900 mb-3">Specifications</h4>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <span className="text-xs text-stone-500 uppercase tracking-wider mb-1">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </span>
                                                <span className="text-sm text-stone-900">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* You May Also Like Section */}
                    <section className="mt-24">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-light text-stone-900 tracking-tight">You May Also Like</h2>
                            <button className="text-sm text-red-500 font-medium hover:underline">View All →</button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <div key={item._id} className="group cursor-pointer">
                                    <div className="relative aspect-3/4 bg-stone-100 rounded-sm overflow-hidden mb-3">
                                        <img
                                            src={item.productImages?.[0].url}
                                            alt={item.productName}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Heart className="w-4 h-4 text-stone-700" />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-stone-900 mb-2 line-clamp-2">{item.productName}</h3>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-lg font-medium text-stone-900">₹{item.productSellingPrice}</span>
                                            <span className="text-sm text-stone-400 line-through">₹{item.productOriginalPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}