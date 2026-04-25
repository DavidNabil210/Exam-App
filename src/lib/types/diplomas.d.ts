// export interface DiplomasResponse {
//   status: boolean
//   message: string
// }
// lib/types/diplomas.d.ts

export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface DiplomasResponse {
  status: boolean;
  code: number;
  message: string;
  payload: {
    data: Diploma[];
    metadata: PaginationMetadata;
  };
}

export interface DiplomaResponse {
  status: boolean;
  code: number;
  message: string;
  payload: Diploma;
}

export type SortOption = "title_desc" | "title_asc" | "newest_desc" | "newest_asc";