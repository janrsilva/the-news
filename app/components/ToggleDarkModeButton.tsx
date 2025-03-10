"use client";

import { useState, useEffect } from "react";

type Mode = "auto" | "light" | "dark";

const STORAGE_KEY = "theme-preference";

const ToggleDarkModeButton: React.FC = () => {
  const [mode, setMode] = useState<Mode | null>(null);
  const [mounted, setMounted] = useState(false);

  const applyMode = (newMode: Mode) => {
    const root = document.documentElement;

    if (newMode === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (newMode === "light") {
      root.classList.remove("dark");
    } else if (newMode === "dark") {
      root.classList.add("dark");
    }

    localStorage.setItem(STORAGE_KEY, newMode);
  };

  useEffect(() => {
    setMounted(true);

    const storedMode = localStorage.getItem(STORAGE_KEY) as Mode | null;
    if (storedMode) {
      setMode(storedMode);
      applyMode(storedMode);
    } else {
      applyMode("auto");
      setMode("auto");
    }
  }, []);

  const cycleMode = () => {
    if (!mode) return;

    setMode((prevMode) => {
      const newMode =
        prevMode === "auto" ? "light" : prevMode === "light" ? "dark" : "auto";
      applyMode(newMode);
      return newMode;
    });
  };

  if (!mounted) return null;

  return (
    <button
      onClick={cycleMode}
      className="p-1 h-5 flex items-center gap-1 border rounded-full border-gray-400 dark:border-gray-600 shadow-sm dark:shadow-neutral-500"
    >
      <small>{mode} mode</small>
    </button>
  );
};

export default ToggleDarkModeButton;
