"use client";

import React from "react";

type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onKeyDown,
  onSearch,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Search a topic, e.g. 'crypto', 'NFT', 'AI', etc..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={onSearch}
        className="bg-gray-900  dark:bg-gray-600 text-white p-2 rounded cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
