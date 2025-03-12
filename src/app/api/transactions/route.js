import { connectDB } from "../db";
import { Transaction } from "../models/transactionModels";

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const isSummary = url.searchParams.get("summary");

    if (isSummary) {
      // Fetch total expenses
      const totalExpenses = await Transaction.aggregate([
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
      ]);

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
        { $unwind: "$categoryDetails" },
        {
          $project: {
            _id: 0,
            category: "$categoryDetails.name",
            totalAmount: 1,
          },
        },
      ]);

      // Fetch the 5 most recent transactions
      const recentTransactions = await Transaction.find()
        .sort({ date: -1 })
        .limit(5)
        .populate("category", "name");

      return Response.json({
        totalExpenses: totalExpenses[0]?.totalAmount || 0,
        categorySummary,
        recentTransactions,
      });
    }

    // Default: Fetch all transactions
    const transactions = await Transaction.find()
      .sort({ date: -1 })
      .populate("category", "name");

    return Response.json(transactions);
  } catch (error) {
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

    const newTransaction = await Transaction.create({
      amount,
      date,
      description,
      category,
    });

    return Response.json(newTransaction, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to add transaction" },
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
    return Response.json(
      { error: "Failed to delete transaction" },
      { status: 500 }
    );
  }
}
