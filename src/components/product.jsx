import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Dashboard from "./dashboard";

function CreateProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get("http://localhost:1000/read/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1000/delete/product/${id}`)
      .then(() => fetchProducts())
      alert("sucessfully delete")
  };

  // Edit product
  const handleEdit = (id) => {
    navigate(`/updateproduct/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Dashboard />
      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto p-6">
        <div className="flex  px-20">
        <h3 className="text-2xl font-semibold mb-6">Product List</h3>
</div>
        <table className="w-full table-auto border border-gray-300 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b border-gray-300">Image</th>
              <th className="p-3 border-b border-gray-300">Product Name</th>
              <th className="p-3 border-b border-gray-300">Quantity</th>
              <th className="p-3 border-b border-gray-300">Price</th>
              <th className="p-3 border-b border-gray-300">Status</th>
              <th className="p-3 border-b border-gray-300">category</th>
              <th className="p-3 border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products available.
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                
                <td className="p-3">
                    <img
                      src={`http://localhost:1000/allDocs/${product.primage}`}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                      
                    />
                   
                    
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.quantity}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.status}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 space-x-4">
              <button
                    onClick={() => handleEdit(product._id)}
                    className="text-green-600 hover:text-green-800 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateProduct;
