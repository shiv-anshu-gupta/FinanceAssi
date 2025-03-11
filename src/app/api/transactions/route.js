import { connectDB } from "../db";
import { Transaction } from "../models";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(req) {
  await connectDB();
  const { amount, date, description } = await req.json();

  if (!amount || !date || !description) {
    return Response.json(
      { error: "All fields are required!" },
      { status: 400 }
    );
  }

  const newTransaction = await Transaction.create({
    amount,
    date,
    description,
  });
  return Response.json(newTransaction);
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return Response.json({ message: "Transaction deleted" });
}
