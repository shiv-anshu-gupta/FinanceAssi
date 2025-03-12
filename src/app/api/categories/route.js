import { connectDB } from "../db";
import { Category } from "../models/categoryModel";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    return Response.json(categories);
  } catch (error) {
    console.error("❌ GET /api/categories Error:", error);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
