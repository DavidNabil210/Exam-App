"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal } from "lucide-react";
import { getExams } from "@/lib/api/admin/admin-exams.api";
import type { Exam } from "@/lib/types/exams.d.ts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function AdminExamsPage() {
  const router = useRouter();
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["admin-exams"],
    queryFn: ({ pageParam = 1 }) => getExams(pageParam),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const exams = data?.pages.flatMap((p) => p.payload.data) ?? [];

//   const total = data?.pages[0]?.payload.metadata.total ?? 0;
const total = data?.pages[0]?.payload.metadata.total ?? 0;
  function ActionDropdown({ id }: { id: string }) {
    const router = useRouter();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-700 bg-gray-800 text-gray-400 hover:text-white">
            <MoreHorizontal size={15} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => router.push(`/dashboard/exams/${id}`)}>
            View
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push(`/dashboard/exams/${id}/edit`)}>
            Update
          </DropdownMenuItem>

          <DropdownMenuItem className="text-red-500">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white">
      
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs text-gray-400">Exams</p>
          <p className="text-sm text-gray-400">
            {isLoading ? "—" : `${exams.length} of ${total}`}
          </p>
        </div>

        <button
          onClick={() => router.push("/dashboard/exams/new")}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <Plus size={16} />
          Add New Exam
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900">

        {/* Head */}
        <div className="grid grid-cols-[220px_120px_120px_40px] items-center gap-4 border-b border-gray-800 bg-gray-800 px-4 py-3">
          <span className="text-xs font-semibold uppercase text-gray-400">Title</span>
          <span className="text-xs font-semibold uppercase text-gray-400">Duration</span>
          <span className="text-xs font-semibold uppercase text-gray-400">Questions</span>
          <span />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="divide-y divide-gray-800">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-[220px_120px_120px_40px] gap-4 px-4 py-3">
                <div className="h-4 w-40 animate-pulse bg-gray-800 rounded" />
                <div className="h-4 w-20 animate-pulse bg-gray-800 rounded" />
                <div className="h-4 w-20 animate-pulse bg-gray-800 rounded" />
                <div className="h-7 w-7 animate-pulse bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center py-16 gap-3">
            <p className="text-red-400 text-sm">Failed to load exams.</p>
            <button onClick={() => refetch()} className="bg-blue-600 px-4 py-2 rounded text-xs">
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && exams.length === 0 && (
          <div className="flex justify-center py-16 text-gray-400 text-sm">
            No exams found.
          </div>
        )}

        {/* Rows */}
        {!isLoading && !isError && exams.length > 0 && (
          <div className="divide-y divide-gray-800">
            {exams.map((exam: Exam) => (
              <div
                key={exam.id}
                className="grid grid-cols-[220px_120px_120px_40px] items-center gap-4 px-4 py-3 hover:bg-gray-800"
              >
                <p className="text-sm font-medium text-gray-200 truncate">
                  {exam.title}
                </p>

                <p className="text-xs text-gray-400">
                  {exam.duration} min
                </p>

                <p className="text-xs text-gray-400">
                  {exam.questionsCount} Q
                </p>

                <ActionDropdown id={exam.id} />
              </div>
            ))}
          </div>
        )}

        {/* Infinite Scroll */}
        <div ref={bottomRef} className="py-2">
          {isFetchingNextPage && <p className="text-center text-xs text-gray-500">Loading...</p>}
        </div>
      </div>
    </div>
  );
}