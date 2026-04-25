type Exam = {
  id: string;
  title: string;
  description: string;
  duration: number;
};

type ExamsResponse = {
  payload: {
    data: Exam[];
    metadata: {
      page: number;
      totalPages: number;
    };
  };
};