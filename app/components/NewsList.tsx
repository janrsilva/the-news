"use client";

import { Article } from "@/services/newsService";
import Link from "next/link";

export default function NewsList({ articles }: { articles: Article[] }) {
  console.log(articles);
  return (
    <div className="grid gap-4 mt-4">
      {articles.map((article) => (
        <div key={article.id} className="border p-4">
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{article.description}</p>
          <Link
            href={`/news/${encodeURIComponent(article.id)}`}
            className="text-blue-500"
          >
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}
