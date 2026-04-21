// app/diplomas/[id]/exams/page.tsx

import ExamsList from "@/components/ExamList";
import { getExams } from "@/lib/api/exams/exams.api";
import { cookies } from "next/headers";

type Exam = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
};

type ExamsResponse = {
  data: Exam[];
  pagination: {
    page: number;
    totalPages: number;
  };
};




export default async function ExamsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getExams(id);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Exams</h1>

      {/* 👇 client component */}
      <ExamsList
        initialData={data}
        diplomaId={id}
      />
    </div>
  );
}