import { connectDB } from "../db";
import { Transaction } from "../models/transactionModels";
import { Category } from "../models/categoryModel";

export async function GET(req) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const isSummary = url.searchParams.get("summary");

    if (isSummary) {
      // Fetch total expenses
      const totalExpensesResult = await Transaction.aggregate([
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
      ]);
      const totalExpenses = totalExpensesResult[0]?.totalAmount || 0;

      // Fetch category-wise expense summary
      const categorySummary = await Transaction.aggregate([
        {
          $group: {
            _id: "$category",
            totalAmount: { $sum: "$amount" },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
          $unwind: {
            path: "$categoryDetails",
            preserveNullAndEmptyArrays: true, // Ensures transactions without categories are included
          },
        },
        {
          $project: {
            _id: 0,
            category: {
              $ifNull: ["$categoryDetails.name", "Unknown Category"],
            }, // Handle missing categories
            totalAmount: 1,
          },
        },
      ]);

      // Fetch the 5 most recent transactions
      const recentTransactions = await Transaction.find()
        .sort({ date: -1 })
        .limit(5)
        .populate({ path: "category", select: "name" }) // Ensure category is populated
        .lean(); // Convert Mongoose objects to plain JS

      return Response.json({
        totalExpenses,
        categorySummary: categorySummary || [],
        recentTransactions: recentTransactions || [],
      });
    }

    // Fetch all transactions with category populated
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .populate({ path: "category", select: "name" })
      .lean(); // Convert to plain JS objects

    return Response.json(transactions);
  } catch (error) {
    console.error("❌ GET /api/transactions Error:", error);
    return Response.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { amount, date, description, category } = await req.json();

    if (!amount || !date || !description || !category) {
      return Response.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    // Validate category before creating transaction
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return Response.json(
        { error: "Invalid category ID. Category not found." },
        { status: 400 }
      );
    }

    const newTransaction = await Transaction.create({
      amount,
      date,
      description,
      category,
    });

    return Response.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error("❌ POST /api/transactions Error:", error);
    return Response.json(
      { error: "Failed to add transaction", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return Response.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return Response.json({ error: "Transaction not found" }, { status: 404 });
    }

    return Response.json({ message: "Transaction deleted" });
  } catch (error) {
    console.error("❌ DELETE /api/transactions Error:", error);
    return Response.json(
      { error: "Failed to delete transaction", details: error.message },
      { status: 500 }
    );
  }
}
