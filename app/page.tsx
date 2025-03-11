"use client";

import ArticlesContainer from "@/components/ArticlesContainer";
import React, { Suspense } from "react";
import Main from "./components/Main";
import { useApiToken } from "./hooks/useApiToken";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  const [apiKey] = useApiToken("");
  const router = useRouter();

  return (
    <Main>
      <Suspense fallback={<p className="text-center">Loading articles...</p>}>
        <ArticlesContainer />
        {!apiKey && (
          <div className="rounded p-4 text-center text-gray-100 bg-gray-500 dark:text-gray-800 dark:bg-gray-200 flex flex-col gap-4">
            <p>
              <FontAwesomeIcon icon={faFaceSmile} size="3x" />
            </p>
            <p>
              Welcome! You should be able to see articles after setting your
              News API key{" "}
              <a
                onClick={() => router.push("/collection")}
                className="text-blue-300 dark:text-blue-500 cursor-pointer"
              >
                here
              </a>
              .
            </p>

            <p>
              You don&apos;t have an API key yet?{" "}
              <a
                href="https://newsapi.org/"
                className="text-blue-300 dark:text-blue-500 cursor-pointer"
                target="_blank"
              >
                Get one here
              </a>
            </p>
          </div>
        )}
      </Suspense>
    </Main>
  );
}
