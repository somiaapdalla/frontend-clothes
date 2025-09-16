import axios from "axios";
import { useEffect, useState } from "react";
import Dashboard from "./dashboard";

function ReportPage() {
  const [totalincome, settotalincome] = useState(0);
  const [topcustomer, settopcustomer] = useState([]);

  const handlegetincome = () => {
    axios
      .get("http://localhost:1000/getincome/order")
      .then((res) => settotalincome(res.data[0].totalIncome))
      .catch((err) => console.error(err));
  };

  const handletopcustomer = () => {
    axios
      .get("http://localhost:1000/gettopcustomer/order")
      .then((res) => settopcustomer(res.data))
      .catch((err) => console.error(err));
  };

  const handleClearReport = () => {
    settotalincome(0);
    settopcustomer([]);
  };

  useEffect(() => {
    handlegetincome();
    handletopcustomer();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      {/* <div className="w-32 md:w-1/4">
        <Dashboard />
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 space-y-8">
        {/* Total Income Card */}
        <div className="bg-green-500 text-white rounded-2xl shadow-xl p-6 md:p-8 text-center">
          <h1 className="font-semibold text-2xl md:text-3xl">💰 Total Income</h1>
          <p className="font-bold text-4xl md:text-5xl mt-4">${totalincome}</p>
        </div>

        {/* Top Customers Section */}
        <div className="bg-white shadow-xl rounded-2xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-4 md:mb-6">
            🏆 Top Customers
          </h2>

          {topcustomer.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No customer data available.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-green-100 text-green-800">
                    <th className="border px-3 md:px-4 py-2 text-left">Customer</th>
                    <th className="border px-3 md:px-4 py-2 text-center">Total Spend</th>
                    <th className="border px-3 md:px-4 py-2 text-center">Orders Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topcustomer.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border px-3 md:px-4 py-2">{item.customer}</td>
                      <td className="border px-3 md:px-4 py-2 text-center">${item.totalSpend}</td>
                      <td className="border px-3 md:px-4 py-2 text-center">{item.ordercount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Clear Button */}
        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleClearReport}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            🗑️ Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
