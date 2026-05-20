export type Exam = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  questionsCount: number;
  diplomaId: string;
  diploma: {
    id: string;
    title: string;
  };
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ExamsResponse = {
  status: boolean;
  code: number;
  payload: {
    data: Exam[];
    metadata: {
      page: number;
      limit: number;
      total: number;       // ✅ مهم
      totalPages: number;
    };
  };
};