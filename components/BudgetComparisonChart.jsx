"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function BudgetComparisonChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchBudgetData() {
      try {
        // Fetch Budget Data
        const resBudget = await fetch("/api/budget");
        if (!resBudget.ok) throw new Error("Failed to load budget data");
        const budgetData = await resBudget.json();

        // Fetch Transactions Data
        const resTransactions = await fetch("/api/transactions");
        if (!resTransactions.ok) throw new Error("Failed to load transactions");
        const transactions = await resTransactions.json();

        // Fetch Categories Data
        const resCategories = await fetch("/api/categories");
        if (!resCategories.ok) throw new Error("Failed to load categories");
        const categories = await resCategories.json();

        // Create a map of category ID to category name
        const categoryMap = {};
        categories.forEach((category) => {
          categoryMap[category._id.toString()] = category.name;
        });

        console.log("✅ Category Map:", categoryMap); // Debugging

        // Calculate actual spending per category
        const spendingByCategory = {};
        transactions.forEach((transaction) => {
          const categoryId =
            transaction.category?._id?.toString() ||
            transaction.category?.toString();

          if (!categoryId) {
            console.warn("⚠️ Missing category in transaction:", transaction);
            return;
          }

          spendingByCategory[categoryId] =
            (spendingByCategory[categoryId] || 0) + transaction.amount;
        });

        console.log("📊 Spending by Category:", spendingByCategory); // Debugging

        // Format data for the chart
        const chartData = budgetData.map((budget) => {
          const categoryId =
            budget.category?._id?.toString() || budget.category?.toString();

          return {
            category: categoryMap[categoryId] || `Unknown (${categoryId})`,
            budget: budget.amount,
            actual: spendingByCategory[categoryId] || 0,
          };
        });

        setData(chartData);
      } catch (error) {
        console.error("❌ Error fetching budget data:", error);
      }
    }

    fetchBudgetData();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Budget vs Actual Spending
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 20, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="category"
            angle={-15}
            textAnchor="end"
            tick={{ fill: "#333", fontSize: 12 }}
          />
          <YAxis tick={{ fill: "#333", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "5px" }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ paddingBottom: 10 }}
            align="center"
          />
          <Bar
            dataKey="budget"
            fill="url(#budgetGradient)"
            name="Budget"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="actual"
            fill="url(#actualGradient)"
            name="Actual Spending"
            radius={[6, 6, 0, 0]}
          />
          <defs>
            <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#66BB6A" stopOpacity={0.7} />
            </linearGradient>
            <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5733" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#FF8A65" stopOpacity={0.7} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
