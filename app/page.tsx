"use client";

import ArticlesContainer from "@/components/ArticlesContainer";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="p-4 flex flex-col gap-1 lg:w-2xl mx-auto">
      <Header />
      <ArticlesContainer />
      <Footer />
    </main>
  );
}
