import { useState, useCallback } from "react";
import { Article } from "@/services/newsService";

const useArticles = (initialQuery: string = "", initialPage: number = 1) => {
    const [query, setQuery] = useState(initialQuery);
    const [page, setPage] = useState(initialPage);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchArticles = useCallback(
        async (q: string, pageNumber: number, reset = false) => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/news?query=${encodeURIComponent(q)}&page=${pageNumber}`
                );
                if (!res.ok) {
                    throw new Error("Error fetching articles");
                }
                const data = await res.json();
                setArticles((prev) => (reset ? data : [...prev, ...data]));
                setError(null);
            } catch (err: any) {
                setError(err.message || "Unknown error");
            }
            setLoading(false);
        },
        []
    );

    const searchArticles = useCallback(
        (q: string) => {
            setQuery(q);
            setPage(1);
            fetchArticles(q, 1, true);
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
