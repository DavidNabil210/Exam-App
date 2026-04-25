import QuizClient from "@/components/QuizClient";
// import {
//   getExamById,
//   getQuestionsByExamId,
// } from "@/lib/api/questions/questions.api";
import { notFound } from "next/navigation";
import { getExamById, getQuestionsByExamId, type Exam, type Question } from "@/lib/api/questions/questions.api";
interface Props {
  params: Promise<{
    id: string;
    examId: string;
  }>;
}

export default async function QuestionsPage({ params }: Props) {
  const { id, examId } = await params; // ← must await in Next.js 15

  let exam: Exam | null = null;
  let questions: Question[] = [];

  try {
    [exam, questions] = await Promise.all([
      getExamById(examId),
      getQuestionsByExamId(examId),
    ]);
    console.log("questions raw:", JSON.stringify(questions));
  } catch (err) {
    console.error("ERROR:", err);
    notFound();
  }

  if (!exam) notFound();

  if (!questions.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No questions available
      </div>
    );
  }

  return (
    <QuizClient
      examId={examId}
      diplomaId={id}
      examTitle={exam.title}
      duration={exam.duration}
      questions={questions}
    />
  );
}