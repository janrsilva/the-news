"use client";

import { useState } from "react";
import NewsList from "@/components/NewsList";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);

  async function handleSearch() {
    const res = await fetch(`/api/news?query=${query}`);
    const data = await res.json();
    setArticles(data);
  }

  return (
    <main className="p-4">
      <input
        type="text"
        placeholder="Search a topic, e.g. 'crypto', 'NFT', 'AI', etc..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSubmit={handleSearch}
        className="border p-2 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 mt-2"
      >
        Search
      </button>
      <NewsList articles={articles} />
    </main>
  );
}
