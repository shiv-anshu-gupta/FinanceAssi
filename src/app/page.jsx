"use client";
import Navbar from "../../components/Navbar";
import React, { useState } from "react";
import Dashboard from "./dashboard/page";
import TransactionsPage from "./transactions/page";

export default function Home() {
  const [select, setSelect] = useState("dashboard");

  return (
    <div className="flex flex-col w-full h-full">
      <Navbar setSelect={setSelect} />
      {/* Removed pt-16 here to prevent unnecessary spacing */}
      {select === "dashboard" ? <Dashboard /> : <TransactionsPage />}
    </div>
  );
}
