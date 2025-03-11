import React from "react";
import { Article } from "@/services/articleServiceFactory";
import Link from "next/link";
import ReadingTime from "./ReadingTime";
import SaveButton from "./SaveButton";
import PublishedAt from "./PublishedAt";
import Author from "./Author";

const ArticlesList: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="grid gap-4 mt-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="p-4 flex flex-col rounded shadow dark:shadow-neutral-600 dark:bg-neutral-800"
        >
          <Link
            href={`/news/${encodeURIComponent(article.id)}`}
            className="cursor-pointer"
          >
            <h2 className="text-xl font-bold">{article.title}</h2>
          </Link>
          <p>{article.description}</p>
          <div className="flex justify-between items-center mt-4">
            <ReadingTime size={article.size} />
            <div>
              <PublishedAt date={article.publishedAt} />
              <Author author={article.author} sourceName={article.sourceName} />
            </div>
          </div>
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
};

export default ArticlesList;
