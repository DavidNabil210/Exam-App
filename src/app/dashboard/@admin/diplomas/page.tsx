"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal } from "lucide-react";
import { getDiplomas } from "@/lib/api/admin/admin-diplomas.api";
import { Diploma } from "@/lib/types/diplomas";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function AdminDiplomasPage() {
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
    queryKey: ["admin-diplomas"],
    queryFn: ({ pageParam = 1 }) => getDiplomas(pageParam),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.payload.metadata;
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // infinite scroll
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

  const diplomas = data?.pages.flatMap((p) => p.payload.data) ?? [];
  const total = data?.pages[0]?.payload.metadata.total ?? 0;
  function ActionDropdown({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = () => {
    console.log("Delete", id);
  };

  const handleView = () => {
    router.push(`/dashboard/diplomas/${id}`);
  };

  const handleUpdate = () => {
    router.push(`/dashboard/diplomas/${id}/edit`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-7 w-7 items-center justify-center rounded border border-gray-700 bg-gray-800 text-gray-400 hover:text-white">
          <MoreHorizontal size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-32">
        <DropdownMenuItem onClick={handleView}>
          View
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleUpdate}>
          Update
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          className="text-red-500 focus:text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
  return (
    <div className="min-h-screen  p-6 text-white">

     {/* header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="mb-1 text-xs text-gray-800">Diplomas</p>
          <p className="text-sm text-gray-800">
            {isLoading ? "—" : `${diplomas.length} of ${total}`}
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/diplomas/new")}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          <Plus size={16} />
          Add New Diploma
        </button>
      </div>

     {/* table */}
      <div className="overflow-hidden rounded-xl border border-white-600 bg-gray-900">

       {/* head */}
        <div className="grid grid-cols-[56px_220px_1fr_40px] items-center gap-4 border-b border-blue-600 bg-blue-600 px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-white-400">
            Image
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-white-400">
            Title
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-white-400">
            Description
          </span>
          <span />
        </div>

        {/* loading */}
        {isLoading && (
          <div className="divide-y divide-gray-800">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-[56px_220px_1fr_40px] items-center gap-4 px-4 py-3"
              >
                <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-800" />
                <div className="h-3.5 w-36 animate-pulse rounded bg-gray-800" />
                <div className="space-y-1.5">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-800" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-gray-800" />
                </div>
                <div className="h-7 w-7 animate-pulse rounded bg-gray-800" />
              </div>
            ))}
          </div>
        )}

       {/* error  */}
        {isError && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <p className="text-sm text-red-400">Failed to load diplomas.</p>
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

       {/* empty */}
        {!isLoading && !isError && diplomas.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">No diplomas found.</p>
          </div>
        )}

       {/* Rows */}
        {!isLoading && !isError && diplomas.length > 0 && (
          <div className="divide-y divide-blue-600">
            {diplomas.map((diploma: Diploma) => (
              <div
                key={diploma.id}
                className="grid grid-cols-[56px_220px_1fr_40px] items-center gap-4 px-4 py-3 transition-colors hover:bg-blue-800 bg-gray-200 "
              >
                {/* Image */}
                {diploma.image ? (
                  <img
                    src={diploma.image}
                    alt={diploma.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-950 text-xs font-semibold text-blue-300">
                    {diploma.title.slice(0, 2).toUpperCase()}
                  </div>
                )}

              {/* title */}
                <p className="truncate text-sm font-medium text-gray-400">
                  {diploma.title}
                </p>

                {/* Description */}
                <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
                  {diploma.description}
                </p>

                {/* Actions placeholder */}
               <ActionDropdown id={diploma.id} />
              </div>
            ))}
          </div>
        )}

        {/* Infinite scroll trigger */}
        <div ref={bottomRef} className="py-2">
          {isFetchingNextPage && (
            <div className="divide-y divide-gray-800">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[56px_220px_1fr_40px] items-center gap-4 px-4 py-3"
                >
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-800" />
                  <div className="h-3.5 w-36 animate-pulse rounded bg-gray-800" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-800" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-gray-800" />
                  </div>
                  <div className="h-7 w-7 animate-pulse rounded bg-gray-800" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}