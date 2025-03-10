"use client";

import ArticlesContainer from "@/components/ArticlesContainer";
import React, { Suspense } from "react";
import Main from "./components/Main";

export default function HomePage() {
  return (
    <Main>
      <Suspense fallback={<p className="text-center">Loading articles...</p>}>
        <ArticlesContainer />
      </Suspense>
    </Main>
  );
}
