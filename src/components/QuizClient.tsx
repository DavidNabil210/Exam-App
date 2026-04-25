"use client";

import { useState } from "react";

export default function QuizClient({
  examTitle,
  questions,
}: any) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[current];

  if (!question)
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        🎉 Done!
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4 rounded-lg mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          [{examTitle}] Questions
        </h1>
        <span className="text-sm">
          Question {current + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2 rounded mb-6">
        <div
          className="bg-blue-600 h-2 rounded"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-blue-600 mb-6">
          {question.text}
        </h2>

        <div className="space-y-3">
          {question.answers.map((a: any, index: number) => (
            <label
              key={a.id}
              className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition
                ${
                  selected === index
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-blue-400"
                }`}
            >
              <input
                type="radio"
                name="answer"
                checked={selected === index}
                onChange={() => setSelected(index)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">{a.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={current === 0}
          onClick={() => {
            setCurrent((p) => p - 1);
            setSelected(null);
          }}
          className="px-6 py-3 bg-gray-200 text-gray-600 rounded-lg disabled:opacity-50"
        >
          ← Previous
        </button>

        {/* Timer circle (UI only) */}
        <div className="w-12 h-12 flex items-center justify-center border-4 border-blue-600 rounded-full text-sm font-semibold text-blue-600">
          1:01
        </div>

        <button
          onClick={() => {
            setCurrent((p) => p + 1);
            setSelected(null);
          }}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}