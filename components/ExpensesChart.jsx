"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ExpensesChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();

      const monthlyData = transactions.reduce((acc, tx) => {
        const month = new Date(tx.date).toLocaleString("default", {
          month: "short",
        });
        acc[month] = (acc[month] || 0) + tx.amount;
        return acc;
      }, {});

      setChartData(
        Object.keys(monthlyData).map((month) => ({
          month,
          amount: monthlyData[month],
        }))
      );
    }
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
