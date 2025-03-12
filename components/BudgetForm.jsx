"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function BudgetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverError, setServerError] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
        setServerError("Failed to load categories.");
      }
    }
    fetchCategories();
  }, []);

  async function onSubmit(data) {
    setServerError("");

    const res = await fetch("/api/budget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setServerError("Failed to add budget!");
    } else {
      reset(); // Clear form after success
      window.location.reload(); // Refresh list
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      {/* Form Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Set Monthly Budget
      </h2>

      {/* Budget Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {serverError && (
          <p className="text-red-500 text-center">{serverError}</p>
        )}

        {/* Category Field */}
        <div className="grid grid-cols-2 items-center">
          <label className="text-gray-700 font-medium">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="input border p-0.5 rounded w-full"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}

        {/* Budget Amount Field */}
        <div className="grid grid-cols-2 items-center">
          <label className="text-gray-700 font-medium">Budget Amount (₹)</label>
          <input
            {...register("amount", {
              required: "Budget amount is required",
              min: { value: 1, message: "Amount must be positive" },
            })}
            type="number"
            placeholder="Enter budget amount"
            className="input border p-0.5 rounded w-full"
          />
        </div>
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}

        {/* Month Field */}
        <div className="grid grid-cols-2 items-center">
          <label className="text-gray-700 font-medium">Month</label>
          <input
            {...register("month", { required: "Month is required" })}
            type="month"
            className="input border p-0.5 rounded w-full"
          />
        </div>
        {errors.month && (
          <p className="text-red-500 text-sm">{errors.month.message}</p>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-[#245a28] text-white px-4 py-2 rounded hover:bg-green-500 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Set Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}
