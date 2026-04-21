"use client";

import { fetchDiplomas } from "@/lib/api/diplomas/diplomas.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export default function DiplomasPage() {


const {
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
} = useInfiniteQuery({
  queryKey: ["diplomas"],
  queryFn: fetchDiplomas,
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
  const { page, totalPages } = lastPage.payload.metadata;
  return page < totalPages ? page + 1 : undefined;
},
});
  if (isLoading) return <p>Loading...</p>;
if (!data) return <p>No data</p>;
console.log("data:", data);
console.log("pages:", data?.pages);
console.log("BASE_URL:", BASE_URL); 
  return (
  <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl mb-6">
        <span className="text-2xl">🎓</span>
        <h1 className="text-2xl font-semibold">Diplomas</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.pages.map((page, i) =>
          page.payload.data.map((d: any) => (
            
            <Link
            
              key={d.id}
                href={`/exams/${d.id}`}
              className="relative block rounded-xl overflow-hidden cursor-pointer group h-56"
            >
              {/* Background image */}
              <img
                src={d.image}
                alt={d.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-lg font-semibold leading-tight">{d.title}</h2>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">{d.description}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Load More */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            className="text-blue-600 font-medium hover:underline flex items-center gap-1"
          >
            Scroll to view more ↓
          </button>
        </div>
      )}
    </div>
  );
}