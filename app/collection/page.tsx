"use client";

import React from "react";
import SavedArticlesContainer from "@/components/SavedArticlesContainer";
import ApiKeyConfig from "@/components/ApiKeyConfig";
import Main from "@/components/Main";

const SavedArticlesPage: React.FC = () => {
  return (
    <Main>
      <ApiKeyConfig />
      <h2 className="text-xl font-bold mt-4">Saved Articles</h2>
      <SavedArticlesContainer />
    </Main>
  );
};

export default SavedArticlesPage;
