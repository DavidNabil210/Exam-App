export interface Diploma {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: number;
  diplomaId: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  diploma: Diploma;
  questionsCount: number;
}

export interface GetExamByIdResponse {
  status: boolean;
  code: number;
  payload: {
    exam: Exam;
  };
}

export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  examId: string;
  answers: Answer[];
}

export interface GetQuestionsResponse {
  questions: Question[];
}

export interface SubmissionAnswer {
  questionId: string;
  answerId: string;
}

export interface CreateSubmissionPayload {
  examId: string;
  answers: SubmissionAnswer[];
  startedAt: string;
}

export interface Submission {
  id: string;
  examId: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt: string;
  submittedAt: string;
}

export interface GetSubmissionsResponse {
  data: Submission[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}