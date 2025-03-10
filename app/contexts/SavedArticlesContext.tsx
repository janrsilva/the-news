"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Article } from "@/services/newsService";
import { IPersistence } from "@/services/persistence/persistence.interface";
import { PersistenceFactory } from "@/services/persistence/persistenceService";

interface SavedArticlesContextValue {
  savedArticles: Record<string, Article>;
  savedArticlesQtd: number;
  refreshSavedArticles: () => void;
}

const SavedArticlesContext = createContext<
  SavedArticlesContextValue | undefined
>(undefined);

export const SavedArticlesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const persistenceService: IPersistence =
    PersistenceFactory.createPersistenceService();
  const [savedArticles, setSavedArticles] = useState<Record<string, Article>>(
    {}
  );

  const refreshSavedArticles = () => {
    const articles = persistenceService.getSavedArticles();
    setSavedArticles(articles);
  };

  useEffect(() => {
    refreshSavedArticles();
  }, []);

  const savedArticlesQtd = Object.keys(savedArticles).length;

  return (
    <SavedArticlesContext.Provider
      value={{ savedArticles, savedArticlesQtd, refreshSavedArticles }}
    >
      {children}
    </SavedArticlesContext.Provider>
  );
};

export const useSavedArticles = (): SavedArticlesContextValue => {
  const context = useContext(SavedArticlesContext);
  if (!context) {
    throw new Error(
      "useSavedArticles must be used within a SavedArticlesProvider"
    );
  }
  return context;
};
