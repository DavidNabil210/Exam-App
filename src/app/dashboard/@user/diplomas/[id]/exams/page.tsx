import ExamsList from "@/components/ExamList";
import { cookies } from "next/headers";

async function getExams(diplomaId: string) {
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

export default async function ExamsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("=== ID FROM PARAMS ===", id); 
  const data = await getExams(id);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Exams</h1>

      <ExamsList initialData={data} diplomaId={id} />
    </div>
  );
}