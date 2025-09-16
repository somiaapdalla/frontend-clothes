import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function HeaderBookStore() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
    localStorage.removeItem("token");
    alert("You have logged out ✅");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-md px-4 md:px-20 py-4 flex items-center justify-between z-50 sticky top-0">
      {/* Logo */}
      <div className="text-2xl font-bold text-green-600 cursor-pointer">
        valora<span className="text-gray-800">fashion</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
        <Link to="/" className="hover:text-green-600 transition">Home</Link>
        <Link to="/productcards" className="hover:text-green-600 transition">Collection</Link>
        <Link to="/about" className="hover:text-green-600 transition">About Us</Link>
        <Link to="/contact" className="hover:text-green-600 transition">Contact</Link>
      </nav>

      {/* Right side buttons */}
      <div className="hidden md:flex items-center gap-4">
        {customerName && <span className="text-gray-700 font-medium mr-4">Hi, {customerName}</span>}
        {customerName ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition border border-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition">
                <FaUser /> Login
              </button>
            </Link>
            <Link to="/register">
              <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition border border-green-500 px-3 py-1 rounded">
                Register Customer
              </button>
            </Link>
          </>
        )}

        <Link to="/cart">
          <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-green-600 transition">
            <FaShoppingCart /> Cart
          </button>
        </Link>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden">
          <Link to="/" className="hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/productcards" className="hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>Collection</Link>
          <Link to="/about" className="hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="hover:text-green-600 transition" onClick={() => setMenuOpen(false)}>Contact</Link>

          {customerName && <span className="text-gray-700 font-medium">Hi, {customerName}</span>}

          {customerName ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition border border-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition"
                >
                  <FaUser /> Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 transition border border-green-500 px-3 py-1 rounded"
                >
                  Register Customer
                </button>
              </Link>
            </>
          )}

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded text-sm shadow hover:bg-green-600 transition">
              <FaShoppingCart /> Cart
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default HeaderBookStore;
