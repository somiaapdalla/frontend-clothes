import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./dashboard";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [topCustomers, setTopCustomers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:1000/read/order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTotalIncome = async () => {
      try {
        const res = await axios.get("http://localhost:1000/getincome/order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalIncome(res.data.totalIncome || 0);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchTopCustomers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/gettopcustomer/order",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTopCustomers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
    fetchTotalIncome();
    fetchTopCustomers();
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <Dashboard />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Admin Dashboard
        </h1>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-green-100 rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Total Income
            </h2>
            <p className="text-3xl font-extrabold text-green-700">
              ${totalIncome}
            </p>
          </div>

          <div className="bg-blue-100 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Top Customers
            </h2>
            {topCustomers.length === 0 ? (
              <p className="text-gray-600 text-center">No customers yet.</p>
            ) : (
              <ul className="space-y-2">
                {topCustomers.map((c, idx) => (
                  <li
                    key={idx}
                    className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
                  >
                    <span className="font-medium">{c.customer}</span>
                    <span className="text-gray-700">
                      ${c.totalSpend} • {c.orderCount} orders
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Orders</h2>

          {orders.length === 0 ? (
            <p className="text-gray-600 text-center">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Total Amount
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Created At
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                      Products
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-4 py-2">{order._id.slice(-6)}</td>
                      <td className="px-4 py-2">{order.customer}</td>
                      <td className="px-4 py-2">${order.totalAmount}</td>
                      <td className="px-4 py-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-2">
                        <ul className="list-disc list-inside">
                          {order.products.map((p, i) => (
                            <li key={i}>
                              {p.name || "No name"} - ${p.price} × {p.quantity} = ${p.total}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
