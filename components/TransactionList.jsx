"use client";
import { useState, useEffect } from "react";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTransactions() {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
    setLoading(false);
  }

  async function deleteTransaction(id) {
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

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold">Transaction List</h2>
      {transactions.length === 0 ? <p>No transactions yet.</p> : null}
      {transactions.map((tx) => (
        <div key={tx._id} className="p-2 border-b flex justify-between">
          <span>{tx.date.split("T")[0]}</span>
          <span>{tx.description}</span>
          <span>${tx.amount}</span>
          <button
            onClick={() => deleteTransaction(tx._id)}
            className="text-red-500"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
