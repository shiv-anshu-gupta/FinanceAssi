"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// Define all 12 months
const allMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function ExpensesChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/transactions");
      const transactions = await res.json();

      // Create an object with all months initialized to 0
      const monthlyData = allMonths.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
      }, {});

      // Fill in actual transaction amounts
      transactions.forEach((tx) => {
        const month = new Date(tx.date).toLocaleString("default", {
          month: "short",
        });
        monthlyData[month] += tx.amount;
      });

      // Convert to an array sorted correctly
      setChartData(
        allMonths.map((month) => ({
          month,
          amount: monthlyData[month],
        }))
      );
    }
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-center mb-4">
        Monthly Expenses
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#818cf8" stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="month" tick={{ fill: "#4B5563" }} />
          <YAxis tick={{ fill: "#4B5563" }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            formatter={(value) => [`$${value}`, "Amount"]}
          />
          <Legend />
          <Bar
            dataKey="amount"
            fill="url(#barColor)"
            barSize={40}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
