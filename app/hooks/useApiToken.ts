import { useState, useEffect, useCallback } from "react";

const API_KEY_STORAGE_KEY = "newsApiKey";

export function useApiToken(initialValue: string = ""): [string, (value: string) => void, () => string] {
    const [token, setToken] = useState<string>(initialValue);

    useEffect(() => {
        const storedToken = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const saveToken = useCallback((newToken: string) => {
        setToken(newToken);
        localStorage.setItem(API_KEY_STORAGE_KEY, newToken);
        console.log("Token saved to local storage");
    }, []);

    const getToken = useCallback(() => {
        return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
    }, []);

    return [token, saveToken, getToken];
}
