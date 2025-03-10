"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { Article } from "@/services/newsService";
import { useSavedArticles } from "@/contexts/SavedArticlesContext";
import { PersistenceFactory } from "@/services/persistence/persistenceService";

type SaveButtonProps = {
  article: Article;
  children?: React.ReactNode;
  withLabel?: boolean;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  article,
  children,
  withLabel,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const persistenceService = PersistenceFactory.createPersistenceService();
  const { refreshSavedArticles } = useSavedArticles();

  useEffect(() => {
    setIsSaved(persistenceService.isArticleSaved(article.id));
  }, [article.id, persistenceService]);

  const handleClick = () => {
    if (isSaved) {
      persistenceService.removeArticle(article.id);
      setIsSaved(false);
    } else {
      persistenceService.saveArticle(article);
      setIsSaved(true);
    }
    refreshSavedArticles();
  };

  return (
    <button onClick={handleClick} className="text-blue-500">
      {withLabel && (children || <span>{isSaved ? "Saved " : "Save "}</span>)}
      <FontAwesomeIcon icon={isSaved ? faBookmarkSolid : faBookmarkRegular} />
    </button>
  );
};

export default SaveButton;
