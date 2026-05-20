"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RotateCcw, Compass } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────
type Answer = { id: string; text: string };
type Question = { id: string; text: string; answers: Answer[] };
type AnalyticsItem = {
  questionId: string;
  questionText: string;
  isCorrect: boolean;
  selectedAnswer: { text: string };
  correctAnswer: { text: string };
};
type Results = {
  correctAnswers: number;
  wrongAnswers: number;
  analytics: AnalyticsItem[];
};

// ── Props ──────────────────────────────────────────────────────────
type Props = {
  examTitle: string;
  examId: string;
  questions: Question[];
};

// ── Component ──────────────────────────────────────────────────────
export default function QuizClient({ examTitle, examId, questions }: Props) {

  // current question index
  const [current, setCurrent] = useState(0);

  // stores { questionId: answerId } for each answered question
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // timer in seconds (25 minutes)
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // results from API after submission
  const [results, setResults] = useState<Results | null>(null);

  // loading state while submitting
  const [loading, setLoading] = useState(false);

  const question = questions[current];
  const isLastQuestion = current === questions.length - 1;
  const selectedAnswer = answers[question?.id];

  // ── Timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // ── Select Answer ────────────────────────────────────────────────
  const selectAnswer = (answerId: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: answerId }));
  };

  // ── Submit ───────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setLoading(true);

    // only send answered questions
    const answeredQuestions = questions
      .filter((q) => answers[q.id])
      .map((q) => ({
        questionId: q.id,
        answerId: answers[q.id],
      }));

    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, answers: answeredQuestions }),
    });

    const data = await res.json();

    setResults({
      correctAnswers: data.payload.submission.correctAnswers,
      wrongAnswers: data.payload.submission.wrongAnswers,
      analytics: data.payload.analytics,
    });

    setLoading(false);
  };

  // ── Restart ──────────────────────────────────────────────────────
  const handleRestart = () => {
    setCurrent(0);
    setAnswers({});
    setTimeLeft(25 * 60);
    setResults(null);
  };

  // ─────────────────────────────────────────────────────────────────
  // SCREENS
  // ─────────────────────────────────────────────────────────────────

  // Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-blue-600 text-xl font-semibold">
        Submitting...
      </div>
    );
  }

  // Results screen
  if (results) {
    const { correctAnswers, wrongAnswers, analytics } = results;
    const total = correctAnswers + wrongAnswers;

    // Donut chart math
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const greenArc = (correctAnswers / total) * circumference;

    return (
      <div className=" flex-1 p-6 space-y-6 bg-muted/40 min-h-screen">

        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 rounded-lg">
          <h1 className="text-lg font-semibold">{examTitle}</h1>
          <span>Question {total} of {total}</span>
        </div>

        {/* Full progress bar */}
        <div className="w-full bg-muted h-2 rounded">
          <div className="bg-blue-600 h-2 rounded w-full" />
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-blue-600 font-semibold text-lg mb-6">Results:</h2>

            <div className="flex gap-8 items-start">

              {/* Donut Chart */}
              <div className="flex flex-col items-center gap-3 min-w-[160px]">
                <svg width="160" height="160" viewBox="0 0 160 160">
                  {/* Grey background circle */}
                  <circle cx="80" cy="80" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="18" />
                  {/* Red (incorrect) full circle */}
                  <circle cx="80" cy="80" r={radius} fill="none" stroke="#ef4444" strokeWidth="18"
                    strokeDasharray={circumference} transform="rotate(-90 80 80)" />
                  {/* Green (correct) arc on top */}
                  <circle cx="80" cy="80" r={radius} fill="none" stroke="#22c55e" strokeWidth="18"
                    strokeDasharray={`${greenArc} ${circumference - greenArc}`} transform="rotate(-90 80 80)" />
                </svg>

                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-sm" />
                    <span>Correct: {correctAnswers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 rounded-sm" />
                    <span>Incorrect: {wrongAnswers}</span>
                  </div>
                </div>
              </div>

              {/* Questions Review */}
              <div className="flex-1 space-y-5 max-h-[400px] overflow-y-auto pr-2">
                {analytics.map((item) => (
                  <div key={item.questionId} className="space-y-2">

                    {/* Question text */}
                    <p className="font-semibold text-blue-600">{item.questionText}</p>

                    {/* User's selected answer */}
                    <div className={`flex items-center gap-3 border p-3 rounded-lg ${
                      item.isCorrect ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                    }`}>
                      <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      </div>
                      <span>{item.selectedAnswer.text}</span>
                    </div>

                    {/* Show correct answer only if user was wrong */}
                    {!item.isCorrect && (
                      <div className="flex items-center gap-3 border p-3 rounded-lg bg-green-50 border-green-300">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                        <span>{item.correctAnswer.text}</span>
                      </div>
                    )}

                  </div>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleRestart}>
            <RotateCcw size={16} /> Restart
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
            <Compass size={16} /> Explore
          </Button>
        </div>

      </div>
    );
  }

  // Quiz screen
  return (
    <div className=" flex-1 p-6 space-y-6 bg-muted/40 min-h-screen">

      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-6 py-4 rounded-lg">
        <h1 className="text-lg font-semibold">{examTitle}</h1>
        <span>{current + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-lg font-semibold text-blue-600">{question.text}</h2>

          <RadioGroup value={selectedAnswer || ""} onValueChange={selectAnswer} className="space-y-3">
            {question.answers.map((answer) => (
              <label
                key={answer.id}
                className={`flex items-center gap-3 border p-4 rounded-lg cursor-pointer transition ${
                  selectedAnswer === answer.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                }`}
              >
                <RadioGroupItem value={answer.id} />
                <span>{answer.text}</span>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="flex items-center justify-between">

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          disabled={current === 0}
          onClick={() => setCurrent((c) => c - 1)}
        >
          Previous
        </Button>

        {/* Timer */}
        <div className="w-16 h-16 flex items-center justify-center border-4 border-blue-600 rounded-full font-semibold text-blue-600">
          {formatTime(timeLeft)}
        </div>

        {isLastQuestion ? (
          <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmit}>
            Submit
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setCurrent((c) => c + 1)}>
            Next
          </Button>
        )}

      </div>
    </div>
  );
}