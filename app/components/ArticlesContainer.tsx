import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./SearchBar";
import ArticlesList from "./ArticlesList";
import useArticles from "@/hooks/useArticles";

const ArticlesContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("query") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const {
    articles,
    loading,
    error,
    query,
    setQuery,
    searchArticles,
    loadMore,
  } = useArticles(initialQuery, initialPage);

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/?query=${encodeURIComponent(query)}&page=1`, {
      scroll: false,
    });
    searchArticles(query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onKeyDown={handleKeyDown}
        onSearch={handleSearch}
      />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ArticlesList articles={articles} />
      {articles.length > 0 && (
        <div className="flex flex-col items-center">
          <span>showing {articles.length} articles</span>
          <button
            onClick={loadMore}
            disabled={loading}
            className="mt-4 mb-12 text-blue-500 underline text-center"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesContainer;
