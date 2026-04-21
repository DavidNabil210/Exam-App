import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
   console.log("=== DIPLOMAS ROUTE HIT ===");
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
 console.log("all cookies:", cookieStore.getAll()); // 👈 moved up
  console.log("token:", token); // 👈 moved up
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const page = request.nextUrl.searchParams.get("page") ?? "1";

  const res = await fetch(`${BASE_URL}/api/diplomas?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
console.log("DIPLOMAS:", JSON.stringify(data?.payload?.data?.map((d: any) => ({ id: d.id, title: d.title }))));

  return NextResponse.json(data);
}