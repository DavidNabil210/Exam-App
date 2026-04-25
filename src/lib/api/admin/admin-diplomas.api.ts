// lib/admin/diplomas.api.ts

import { DiplomasResponse, DiplomaResponse } from "@/lib/types/diplomas";

export async function getDiplomas(
  page = 1,
  search = "",
  sort = ""
): Promise<DiplomasResponse> {
  const params = new URLSearchParams({ page: String(page) });
  if (search) params.set("search", search);
  if (sort) params.set("sort", sort);

  const res = await fetch(`/api/diplomas?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch diplomas");
  return res.json();
}

// export async function getDiplomaById(id: string): Promise<DiplomaResponse> {
//   const res = await fetch(`/api/diplomas/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch diploma");
//   return res.json();
// }

// export async function createDiploma(formData: FormData): Promise<void> {
//   const res = await fetch(`/api/diplomas`, {
//     method: "POST",
//     body: formData,
//   });
//   if (!res.ok) throw new Error("Failed to create diploma");
// }

// export async function updateDiploma(
//   id: string,
//   formData: FormData
// ): Promise<void> {
//   const res = await fetch(`/api/diplomas/${id}`, {
//     method: "PUT",
//     body: formData,
//   });
//   if (!res.ok) throw new Error("Failed to update diploma");
// }

// export async function deleteDiploma(id: string): Promise<void> {
//   const res = await fetch(`/api/diplomas/${id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) throw new Error("Failed to delete diploma");
// }