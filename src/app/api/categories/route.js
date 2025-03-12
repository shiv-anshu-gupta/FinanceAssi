import { connectDB } from "../db";
import { Category } from "../models/categoryModel";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return Response.json(categories);
}
