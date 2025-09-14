import React from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function HeaderBookStore() {
  const navigate = useNavigate();

  // جلب بيانات المستخدم من localStorage بأمان
  const storedCustomer = localStorage.getItem("customer");
  const customerData = storedCustomer ? JSON.parse(storedCustomer) : null;

  // استخراج الاسم بشكل آمن
  const customerName =
    customerData?.data?.customer?.name || 
    customerData?.customer?.name ||       
    customerData?.name ||                 
    null;

  const handleLogout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("token"); // لو فيه token
    alert("You have logged out ✅");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-md px-6 md:px-20 py-4 flex items-center justify-between z-50 sticky top-0">
      {/* Logo */}
      <div className="text-2xl font-bold text-green-600 cursor-pointer">
        valora<span className="text-gray-800">fashion</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <Link to="/" className="hover:text-green-600 transition">Home</Link>
        <Link to="/productcards" className="hover:text-green-600 transition">Collection</Link>
        <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
        <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
      </nav>

      {/* Right side buttons */}
      <div className="flex items-center gap-4">
        {/* عرض اسم المستخدم لو موجود */}
        {customerName && (
          <span className="text-gray-700 font-medium mr-4">Hi, {customerName}</span>
        )}

        {customerName ? (
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition border border-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition">
                <FaUser /> Login
              </button>
            </Link>

            <Link to="/register">
              <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition border border-green-500 px-3 py-1 rounded">
                Register Customer
              </button>
            </Link>
          </>
        )}

        {/* Cart button يظهر دائماً */}
        <Link to="/cart">
          <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-green-600 transition">
            <FaShoppingCart /> Cart
          </button>
        </Link>
      </div>
    </header>
  );
}

export default HeaderBookStore;
