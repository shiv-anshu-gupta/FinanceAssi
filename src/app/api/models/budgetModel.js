import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., "2025-03"
});

export const Budget =
  mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
