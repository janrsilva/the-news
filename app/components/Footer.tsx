import React from "react";
import ScrollToTopButton from "./ScrollToTopButton";
import ConfigButton from "./ConfigButton";
import SavedArticlesCounter from "./SavedArticlesCounter";

const Footer: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-0 w-full h-12 flex items-center">
      <div className="relative px-4 flex items-center w-full justify-between h-full bg-gray-900 text-white text-right dark:bg-gray-600 lg:w-2xl mx-auto lg:rounded-t-2xl">
        <div className="z-50 right-0 absolute bottom-16">
          <ScrollToTopButton />
        </div>
        <ConfigButton />
        <SavedArticlesCounter />
      </div>
    </div>
  );
};

export default Footer;
