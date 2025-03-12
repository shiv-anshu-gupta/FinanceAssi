"use client";
import { useEffect, useState } from "react";

export default function SpendingInsights() {
  const [insights, setInsights] = useState("Loading insights...");
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    async function fetchInsights() {
      try {
        // Fetch Categories
        const resCategories = await fetch("/api/categories");
        if (!resCategories.ok) throw new Error("Failed to load categories");
        const categories = await resCategories.json();

        // Create a map of category ID → category name
        const categoryMap = {};
        categories.forEach((category) => {
          categoryMap[category._id?.toString()] = category.name;
        });

        console.log("✅ Category Map:", categoryMap); // Debugging

        setCategoriesMap(categoryMap); // Ensure this is set before transactions/budgets

        // Fetch Budget Data
        const resBudget = await fetch("/api/budget");
        if (!resBudget.ok) throw new Error("Failed to load budget data");
        const budgets = await resBudget.json();

        // Fetch Transactions Data
        const resTransactions = await fetch("/api/transactions");
        if (!resTransactions.ok) throw new Error("Failed to load transactions");
        const transactions = await resTransactions.json();

        console.log("📌 Transactions Data:", transactions); // Debugging
        console.log("📌 Budget Data:", budgets); // Debugging

        // Aggregate spending per category
        const spendingByCategory = {};
        transactions.forEach((transaction) => {
          if (!transaction.category) {
            console.warn("⚠️ Missing category in transaction:", transaction);
            return; // Skip transactions with no category
          }

          const categoryId =
            transaction.category?._id?.toString() ||
            transaction.category?.toString() ||
            "unknown";

          spendingByCategory[categoryId] =
            (spendingByCategory[categoryId] || 0) + transaction.amount;
        });

        console.log("📊 Spending by Category:", spendingByCategory); // Debugging

        let overBudgetCategories = [];
        let totalOverspent = 0;
        let totalSavings = 0;

        budgets.forEach((budget) => {
          if (!budget.category) {
            console.warn("⚠️ Missing category in budget:", budget);
            return; // Skip budgets with no category
          }

          const categoryId =
            budget.category?._id?.toString() ||
            budget.category?.toString() ||
            "unknown";

          const actualSpent = spendingByCategory[categoryId] || 0;
          const categoryName =
            categoryMap[categoryId] || `Unknown Category (${categoryId})`;

          if (actualSpent > budget.amount) {
            overBudgetCategories.push(
              `${categoryName} (₹${actualSpent - budget.amount} over)`
            );
            totalOverspent += actualSpent - budget.amount;
          } else {
            totalSavings += budget.amount - actualSpent;
          }
        });

        console.log("🚀 Over Budget Categories:", overBudgetCategories); // Debugging

        // Generate insights message
        let insightsMessage = "📊 Spending Insights: ";
        if (overBudgetCategories.length) {
          insightsMessage += `You exceeded budget in: ${overBudgetCategories.join(
            ", "
          )}. `;
        } else {
          insightsMessage += "Great job! You stayed within budget. ";
        }
        insightsMessage += `You saved ₹${totalSavings} this month!`;

        setInsights(insightsMessage);
      } catch (error) {
        console.error("❌ Error fetching insights:", error);
        setInsights("⚠️ Unable to fetch spending insights.");
      }
    }

    fetchInsights();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <p className="text-gray-700">{insights}</p>
    </div>
  );
}
