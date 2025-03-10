"use client";

import { Article } from "@/services/newsService";
import Link from "next/link";
import ReadingTime from "./ReadingTime";
import SaveButton from "./SaveButton";

export default function ArticlesList({ articles }: { articles: Article[] }) {
  return (
    <div className="grid gap-4 mt-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="p-4 flex flex-col rounded shadow dark:shadow-neutral-600 dark:bg-neutral-800"
        >
          <h2 className="text-xl font-bold">{article.title}</h2>
          <p>{article.description}</p>
          <ReadingTime size={article.size} />
          <div className="flex justify-between items-center">
            <Link
              href={`/news/${encodeURIComponent(article.id)}`}
              className="text-blue-500"
            >
              Read more
            </Link>
            <SaveButton article={article} />
          </div>
        </div>
      ))}
    </div>
  );
}
