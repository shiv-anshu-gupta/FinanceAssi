import { connectDB } from "../db";
import { Budget } from "../models/budgetModel";
import { Category } from "../models/categoryModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const budgets = await Budget.find().populate("category", "name"); // Populate category name
    return NextResponse.json(budgets);
  } catch (error) {
    console.error("❌ GET /api/budget Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { category, amount, month } = await req.json();

    // Validate category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 400 }
      );
    }

    // Create budget entry
    const budget = new Budget({ category, amount, month });
    await budget.save();

    return NextResponse.json(budget, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/budget Error:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
