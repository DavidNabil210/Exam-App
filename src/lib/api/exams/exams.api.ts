import { cookies } from "next/headers";

export async function getExams(diplomaId: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exams?page=1&limit=10&diplomaId=${diplomaId}`;

  console.log("FETCH URL:", url);
  console.log("TOKEN:", token);

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("STATUS:", res.status);

  if (!res.ok) {
      const errorBody = await res.json();

      console.log("=== ERROR BODY ===", errorBody);
    throw new Error(`Failed: ${res.status}`);
    
  }

  const data = await res.json();

  console.log("API RESPONSE:", data);

  return data;
}
export async function fetchExams(diplomaId: string, page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/exams?diplomaId=${diplomaId}&page=${page}&limit=10`
  );

  if (!res.ok) throw new Error("error");

  return res.json() as Promise<ExamsResponse>;
}