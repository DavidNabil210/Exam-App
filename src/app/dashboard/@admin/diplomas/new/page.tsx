"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDiplomaPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/diplomas", {
        method: "POST",
         headers: {
    "Content-Type": "application/json",  // ← this is missing!
  },
        body: JSON.stringify({
          title,
          description,
          image,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      //  after success -> go back
      router.push("/dashboard/diplomas");
    } catch (err) {
      console.error(err);
      alert("Error creating diploma");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white max-w-xl">
      <h1 className="text-xl font-semibold mb-6">Add New Diploma</h1>

      <div className="space-y-4">
        <input
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-800"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="w-full p-2 rounded bg-gray-800"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-600 px-4 py-2 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}