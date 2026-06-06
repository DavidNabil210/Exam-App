import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GET(req:NextRequest) {
const cookieStore =await cookies();
const token = cookieStore.get("token")?.value;

  const examId = req.nextUrl.searchParams.get("examId");

  const res= await fetch (
    `${API_URL}/api/questions/exam/${examId}`,{
         cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    }
  )
   const body = await res.json();
    if (!res.ok) return NextResponse.json(body, { status: res.status });
    return NextResponse.json(body);
}
