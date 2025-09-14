import React from "react";

export default function Footer() {
  return (
    <footer className="bg-green-50 text-gray-700 mt-12">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-lg font-bold mb-4">Velora Fashion</h2>
          <p className="text-sm text-gray-600">
            Sustainable fashion, crafted with care and style. Feel confident in eco-friendly designs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-bold mb-4">Navigate</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-600 transition">Home</a></li>
            <li><a href="/dashboard" className="hover:text-green-600 transition">Dashboard</a></li>
            <li><a href="/create-product" className="hover:text-green-600 transition">Create Product</a></li>
            <li><a href="/about" className="hover:text-green-600 transition">About</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-bold mb-4">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-600 transition">Help Center</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-600 transition">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-green-600 transition">Facebook</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition">Twitter</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition">Instagram</a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Velora Fashion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
