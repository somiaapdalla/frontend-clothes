import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./dashboard";

export default function ContactView() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:1000/read/contact";

  // جلب كل الرسائل
  const getContacts = async () => {
    try {
      const res = await axios.get(API_URL);
      setContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // حذف رسالة
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/delete/contact/${id}`);
      setMessage("Message deleted successfully!");
      getContacts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div>
        <Dashboard />
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Messages</h2>

        {message && (
          <p className="text-green-600 font-semibold text-center mb-4">{message}</p>
        )}

        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No messages yet.</p>
        ) : (
          <div className="overflow-x-auto mt-6">
            <table className="w-full border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Message</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-green-50 transition-colors duration-200"
                  >
                    <td className="border px-4 py-2">{c.name}</td>
                    <td className="border px-4 py-2">{c.email}</td>
                    <td className="border px-4 py-2">{c.message}</td>
                    <td className="border px-4 py-2">
                       {new Date(c.createdAt).toLocaleString()} {/* تحويل التاريخ لصيغة مقروءة */}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
