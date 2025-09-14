import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CustomerView() {
  const [customers, setCustomers] = useState([]);

  // جلب العملاء مع توكن المصادقة
  function readAll() {
    const storedCustomer = localStorage.getItem("customer");
    const token = storedCustomer ? JSON.parse(storedCustomer)?.token : null;

    if (!token) {
      alert("You must be logged in to view customers ❌");
      return;
    }

    axios.get("http://localhost:1000/read/customer", {
      headers: {
        Authorization: `Bearer ${token}` // ارسال التوكن
      }
    })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers ❌", err));
  }

  // حذف عميل مع توكن
  function deleteCustomers(id) {
    const storedCustomer = localStorage.getItem("customer");
    const token = storedCustomer ? JSON.parse(storedCustomer)?.token : null;

    axios.delete(`http://localhost:1000/delete/customer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        alert("Deleted successfully ✅");
        readAll();
      })
      .catch((err) => alert("Error deleting customer ❌"));
  }

  useEffect(() => {
    readAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Customer List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-orange-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Gmail</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? customers.map((customer, index) => (
            <tr key={customer._id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{new Date(customer.createdAt).toDateString()}</td>
              <td className="border p-2 space-x-4">
                <Link to={`/update/customer/${customer._id}`}>
                  <i className="fa-solid fa-pen-to-square text-blue-600 cursor-pointer"></i>
                </Link>
                <i onClick={() => deleteCustomers(customer._id)} className="fa-solid fa-trash text-red-600 cursor-pointer"></i>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerView;
