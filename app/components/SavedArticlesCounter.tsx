"use client";

import { useSavedArticles } from "@/contexts/SavedArticlesContext";
import React from "react";

const getSavedArticlesLabel = (count: number) => {
  if (count === 0) {
    return "no articles saved";
  }

  return count === 1 ? "1 article saved" : `${count} articles saved`;
};

const SavedArticlesCounter: React.FC = () => {
  const { savedArticlesQtd } = useSavedArticles();

  if (savedArticlesQtd === 0) {
    return (
      <div className="text-sm text-gray-400 flex flex-col items-end">
        <small>{getSavedArticlesLabel(savedArticlesQtd)}</small>
        <small>click the bookmark to save articles</small>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span>{getSavedArticlesLabel(savedArticlesQtd)}</span>
      <button className="underline">View</button>
    </div>
  );
};

export default SavedArticlesCounter;
