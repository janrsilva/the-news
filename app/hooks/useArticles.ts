import { useState, useCallback } from "react";
import { Article } from "@/services/articleServiceFactory";
import { useApiToken } from "@/hooks/useApiToken";

const useArticles = (initialQuery: string = "", initialPage: number = 1) => {
    const [token, _, getToken] = useApiToken("");
    const [query, setQuery] = useState(initialQuery);
    const [page, setPage] = useState(initialPage);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = useCallback(
        async (q: string, pageNumber: number, reset = false) => {
            setLoading(true);
            try {
                const currentToken = getToken();
                const res = await fetch(
                    `/api/news?query=${encodeURIComponent(q)}&page=${pageNumber}&user-token=${encodeURIComponent(currentToken)}`
                );
                if (!res.ok) {
                    if (res.status === 401) {
                        alert("Unauthorized: Your API token is invalid or expired");
                    }
                    throw new Error("Error fetching articles");
                }
                const data = await res.json();
                setArticles((prev) => (reset ? data : [...prev, ...data]));
                setError(null);
                return { data };
            } catch (err: any) {
                setError(err.message || "Unknown error");
                return { error: err.message || "Unknown error" };
            } finally {
                setLoading(false);
            }
        },
        [getToken]
    );

    const searchArticles = useCallback(
        async (q: string) => {
            setQuery(q);
            setPage(1);
            return await fetchArticles(q, 1, true);
        },
        [fetchArticles]
    );

    const loadMore = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchArticles(query, nextPage);
    }, [page, query, fetchArticles]);

    return { articles, loading, error, query, setQuery, searchArticles, loadMore, page };
};

export default useArticles;
