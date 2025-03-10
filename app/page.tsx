"use client";

import ConfigButton from "./components/ConfigButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SavedArticlesCounter from "./components/SavedArticlesCounter";
import ArticlesContainer from "@/components/ArticlesContainer";
import React from "react";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <main className="p-4 flex flex-col gap-1 lg:w-2xl mx-auto">
      <Header />
      <ArticlesContainer />
      <div className="fixed bottom-16 right-4">
        <ScrollToTopButton />
      </div>
      <div className="fixed bottom-0 right-0 w-full h-12 flex items-center">
        <div className="px-4 flex items-center w-full justify-between h-full bg-gray-900 text-white text-right dark:bg-gray-600 lg:w-2xl mx-auto lg:rounded-t-2xl">
          <ConfigButton />
          <SavedArticlesCounter />
        </div>
      </div>
    </main>
  );
}
