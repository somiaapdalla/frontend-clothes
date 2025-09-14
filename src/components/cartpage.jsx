import axios from "axios";
import { useEffect, useState } from "react";

function CartPage() {
  const [products, setProducts] = useState([]);

  // جلب المنتجات من localStorage عند تحميل الصفحة
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("product")) || [];
      const updatedCart = Array.isArray(cart)
        ? cart.map(item => ({
            ...item,
            quantity: 1,
            maxquantity: item.quantity || 1,
          }))
        : [];
      setProducts(updatedCart);
    } catch (err) {
      console.error("Invalid cart data", err);
      setProducts([]);
    }
  }, []);

  // زيادة الكمية
  const handleIncrement = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.maxquantity) }
          : item
      )
    );
  };

  // تقليل الكمية
  const handleDecrement = (id) => {
    setProducts(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  // حذف عنصر من الكارت
  const handleDeleteItem = (id) => {
    const updated = products.filter(item => String(item._id) !== String(id));
    localStorage.setItem("product", JSON.stringify(updated));
    setProducts(updated);
  };

  // حساب المجموع
  const totalPrice = Array.isArray(products)
    ? products.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
    : 0;

  // معلومات العميل
  const customer = JSON.parse(localStorage.getItem("customer")) || null;
  const customerName = customer?.data?.customer?.name || customer?.customer?.name || customer?.name || "";

  // تقديم الطلب
  const handleOrder = () => {
    if (!customerName) {
      alert("Customer is required. Please log in or register.");
      return;
    }

    axios.post("http://localhost:1000/create/order", {
      customer: customerName,
      products: products.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    })
    .then(res => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Order placed successfully ✅");
        localStorage.removeItem("product");
        setProducts([]);
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Cart Items */}
        <div className="w-full lg:w-2/3 p-6">
          <h2 className="text-3xl font-bold mb-6 text-green-700">Shopping Cart</h2>

          {products.length === 0 ? (
            <p className="text-gray-500 text-center py-10">🛒 Your cart is empty</p>
          ) : (
            <>
              {products.map((product, index) => (
                <div key={product._id || index} className="flex flex-col md:flex-row justify-between items-center py-5 border-b hover:bg-gray-50 transition">
                  {/* Product Details */}
                  <div className="flex items-center gap-4 w-full md:w-1/3">
                    <img
                      src={`http://localhost:1000/allDocs/${product.primage}`}
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-lg border"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{product.name}</h4>
                      <p className="text-sm text-purple-600">{product.catogory}</p>
                      <button onClick={() => handleDeleteItem(product._id)} className="text-red-500 text-xs hover:underline mt-1">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="mt-4 md:mt-0 flex items-center gap-2">
                    <button onClick={() => handleDecrement(product._id)} className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded">-</button>
                    <span className="font-semibold">{product.quantity}</span>
                    <button onClick={() => handleIncrement(product._id)} className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded">+</button>
                  </div>

                  {/* Price */}
                  <div className="mt-4 md:mt-0 text-gray-700 font-medium">${product.price}</div>

                  {/* Total per item */}
                  <div className="mt-4 md:mt-0 text-gray-700 font-medium">${product.price * product.quantity}</div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 border-l">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>

          <div className="flex justify-between mb-3 text-gray-600 text-sm">
            <span>ITEMS</span>
            <span>{products.length}</span>
          </div>

          <div className="flex justify-between font-semibold text-lg text-gray-800 border-t pt-4 mb-6">
            <span>TOTAL COST</span>
            <span>${totalPrice}</span>
          </div>

          <button onClick={handleOrder} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
