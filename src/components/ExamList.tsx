"use client";

import { fetchExams } from "@/lib/api/exams/exams.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";





export default function ExamsList({
  initialData,
  diplomaId,
}: {
  initialData: ExamsResponse;
  diplomaId: string;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["exams", diplomaId],
    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      fetchExams(diplomaId, pageParam),

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },

    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });

  const exams = useMemo(() => {
    return data.pages.flatMap((p) => p.payload.data);
  }, [data]);

  return (
    <div className="space-y-4">
      {exams.map((exam) => (
        <div key={exam.id} className="border p-4 rounded">
          <h2>{exam.title}</h2>
          <p>{exam.description}</p>
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          Load more
        </button>
      )}
    </div>
  );
}