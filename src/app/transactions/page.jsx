"use client";
import { useState } from "react";

import TransactionForm from "../../../components/TransactionForm";
import BudgetForm from "../../../components/BudgetForm";
import TransactionList from "../../../components/TransactionList";

export default function TransactionsPage() {
  const [activeForm, setActiveForm] = useState("transaction"); // "transaction" or "budget"

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] pt-16">
      {/* Left Side - Background Image with Centered Form (60% Width) */}
      <div className="relative w-[60%] h-full flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2014/07/06/13/55/calculator-385506_640.jpg')",
          }}
        />

        {/* Centered Form with Overlay */}
        <div className="relative bg-white bg-opacity-90 p-8 rounded-lg w-auto max-w-[450px] shadow-lg z-10">
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${
                activeForm === "transaction"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveForm("transaction")}
            >
              Add Transaction
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeForm === "budget"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveForm("budget")}
            >
              Set Budget
            </button>
          </div>

          {/* Render Forms Based on Selection */}
          {activeForm === "transaction" ? <TransactionForm /> : <BudgetForm />}
        </div>
      </div>

      {/* Right Side - Transaction List (40% Width) */}
      <div className="w-[80%] h-full p-6 bg-white flex flex-col shadow-lg">
        <div className="flex-grow overflow-y-auto">
          <TransactionList />
        </div>
      </div>
    </div>
  );
}
