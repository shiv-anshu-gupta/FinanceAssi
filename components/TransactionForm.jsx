"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function TransactionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverError, setServerError] = useState("");

  async function onSubmit(data) {
    setServerError("");

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      setServerError("Failed to add transaction!");
    } else {
      reset(); // Clear form after success
      window.location.reload(); // Refresh list
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px]">
      <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-6 rounded-box">
        <legend className="fieldset-legend text-lg font-semibold">
          Add Transaction
        </legend>

        {/* Server Error Message */}
        {serverError && <p className="text-red-500 mb-2">{serverError}</p>}

        {/* Amount Field */}
        <label className="fieldset-label">Amount</label>
        <input
          {...register("amount", {
            required: "Amount is required",
            min: { value: 1, message: "Amount must be a positive number" },
            pattern: {
              value: /^[0-9]+$/,
              message: "Amount must be a valid number",
            },
          })}
          type="number"
          placeholder="Amount"
          className="input w-full mb-2"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm">{errors.amount.message}</p>
        )}

        {/* Date Field */}
        <label className="fieldset-label">Date</label>
        <input
          {...register("date", { required: "Date is required" })}
          type="date"
          className="input w-full mb-2"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}

        {/* Description Field */}
        <label className="fieldset-label">Description</label>
        <input
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 3,
              message: "Description must be at least 3 characters",
            },
          })}
          type="text"
          placeholder="Description"
          className="input w-full mb-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-neutral mt-4 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Transaction"}
        </button>
      </fieldset>
    </form>
  );
}
