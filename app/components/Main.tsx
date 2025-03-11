"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-4 lg:w-2xl lg:mx-auto lg:shadow">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Main;
