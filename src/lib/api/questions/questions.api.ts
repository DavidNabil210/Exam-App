


import { cookies } from "next/headers";
export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export interface Exam {
  title: string;
  duration: number;
}
export async function getExamById(examId: string): Promise<Exam> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/exams/${examId}`;

  console.log("Fetching exam from:", url);
  console.log("Token present:", !!token);

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();

  console.log("Exam status:", res.status);
  console.log("Exam response:", text);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch exam — status: ${res.status}, body: ${text}`
    );
  }

  const data = JSON.parse(text);
  return data?.payload?.exam ?? data;
}

export async function getQuestionsByExamId(examId: string): Promise<Question[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/questions/exam/${examId}`;

  console.log("Fetching questions from:", url);
  console.log("Token present:", !!token);

  const res = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();

  console.log("Questions status:", res.status);
  console.log("Questions response:", text);

  if (!res.ok) {
    throw new Error(
      `Failed to fetch questions — status: ${res.status}, body: ${text}`
    );
  }

  const data = JSON.parse(text);
 return data?.payload?.questions ?? data?.questions ?? data;
}

