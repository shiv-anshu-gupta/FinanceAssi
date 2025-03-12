"use client";

import { useEffect, useState } from "react";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    categorySummary: [],
    recentTransactions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await fetch("/api/transactions?summary=true");
        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) return <p className="text-[#245a28]">Loading summary...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Expenses Card */}
      <div className="bg-white shadow-md p-4 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-[#245a28]">Total Expenses</h3>
        <p className="text-2xl font-bold text-green-400">
          ${summary.totalExpenses}
        </p>
      </div>

      {/* Category Breakdown Card */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#245a28] mb-2">
          Top Categories
        </h3>
        <ul className="text-sm text-[#245a28]">
          {summary.categorySummary.length > 0 ? (
            summary.categorySummary.map((category, index) => (
              <li key={index} className="flex justify-between">
                <span>{category.category}</span>
                <span className="font-semibold">${category.totalAmount}</span>
              </li>
            ))
          ) : (
            <p>No category data</p>
          )}
        </ul>
      </div>

      {/* Recent Transactions Card */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-[#245a28] mb-2">
          Recent Transactions
        </h3>
        <ul className="text-sm text-[#245a28]">
          {summary.recentTransactions.length > 0 ? (
            summary.recentTransactions.map((tx, index) => (
              <li key={index} className="flex justify-between">
                <span>{tx.description}</span>
                <span className="font-semibold">${tx.amount}</span>
              </li>
            ))
          ) : (
            <p>No recent transactions</p>
          )}
        </ul>
      </div>
    </div>
  );
}
