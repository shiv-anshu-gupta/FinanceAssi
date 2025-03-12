"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#E74C3C",
];

export default function CategoryPieChart() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategorySummary() {
      try {
        const res = await fetch("/api/transactions?summary=true");
        const result = await res.json();

        // ✅ Ensure we extract the correct array from the object
        if (result && Array.isArray(result.categorySummary)) {
          setCategoryData(result.categorySummary);
        } else {
          console.error("Invalid data format:", result);
          setCategoryData([]);
        }
      } catch (error) {
        console.error("Error fetching category summary:", error);
        setCategoryData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategorySummary();
  }, []);

  if (loading) return <p>Loading category data...</p>;
  if (!categoryData.length) return <p>No category data available.</p>;

  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-full max-w-lg mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">
        Expenses by Category
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="totalAmount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`$${value}`, "Total Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
