"use client";

import React, { ChangeEvent } from "react";
import { useApiToken } from "@/hooks/useApiToken";
import useArticles from "@/hooks/useArticles";

interface ApiKeyConfigProps {
  onApiKeySave?: (apiKey: string) => void;
}

const ApiKeyConfig: React.FC<ApiKeyConfigProps> = ({ onApiKeySave }) => {
  const [apiKey, saveApiKey] = useApiToken("");
  const { searchArticles } = useArticles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    saveApiKey(e.target.value);
  };

  const handleSave = async () => {
    if (onApiKeySave) {
      onApiKeySave(apiKey);
    }

    const result = await searchArticles("php");
    if (result?.error) {
      alert(
        "API key saved, but test request failed. Your API key may be invalid."
      );
    } else if (result) {
      alert("API key saved and test request succeeded!");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="apiKeyInput" className="font-bold">
        News API Key
      </label>
      <div className="flex gap-2">
        <input
          id="apiKeyInput"
          type="password"
          value={apiKey}
          onChange={handleChange}
          placeholder="Enter your News API key"
          className="border p-2 w-full rounded"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ApiKeyConfig;
