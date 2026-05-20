import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { searchParams } = req.nextUrl;
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const diplomaId = searchParams.get("diplomaId");

  const params = new URLSearchParams({ page, limit });
  if (diplomaId) params.set("diplomaId", diplomaId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exams?${params.toString()}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });

  const body = await res.json();

  if (!res.ok) return NextResponse.json(body, { status: res.status });
  return NextResponse.json(body);
}