"use client";

import React, { useState, useEffect } from "react";
import ArticlesList from "@/components/ArticlesList";
import { PersistenceFactory } from "@/services/persistence/persistenceServiceFactory";
import { Article } from "@/services/articleServiceFactory";

const SavedArticlesContainer: React.FC = () => {
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const persistenceService = PersistenceFactory.createPersistenceService();
    const articlesRecord = persistenceService.getSavedArticles();
    const articlesArray = Object.values(articlesRecord);
    setSavedArticles(articlesArray);
  }, []);

  const filteredArticles = savedArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input
          id="savedSearch"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search your saved articles..."
          className="border p-2 w-full rounded"
        />
      </div>

      {filteredArticles.length > 0 ? (
        <ArticlesList articles={filteredArticles} />
      ) : (
        <p>No articles saved yet matching your search.</p>
      )}
    </div>
  );
};

export default SavedArticlesContainer;
