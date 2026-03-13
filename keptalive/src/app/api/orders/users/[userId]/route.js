import Order from "@/Models/OrderModel";
import connectDB from "@/lib/db";

export async function GET(req, { params }) {
  await connectDB();

  const orders = await Order.find({
    userID: params.userId,
  }).sort({ orderDate: -1 });

  return Response.json(orders);
}