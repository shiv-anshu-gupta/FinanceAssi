"use client";
import { useState, useEffect } from "react";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransactions() {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTransaction(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchTransactions();
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600">
        Loading transactions...
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Transaction List
      </h2>

      {/* No Transactions Message */}
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Amount ($)</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx._id}
                  className={`border-b text-center ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-all`}
                >
                  <td className="p-3 text-gray-600">{tx.date.split("T")[0]}</td>
                  <td className="p-3 font-medium text-gray-800">
                    {tx.description}
                  </td>
                  <td className="p-3 text-green-600 font-semibold">
                    ${tx.amount}
                  </td>
                  <td className="p-3 text-blue-500 italic">
                    {tx.category?.name || "No Category"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteTransaction(tx._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-700 transition"
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
  );
}
