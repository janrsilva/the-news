import { Article } from "@/services/newsService";
import { IPersistence } from "./persistence.interface";

const STORAGE_KEY = "savedArticles";

export class LocalPersistenceService implements IPersistence {
    getSavedArticles(): Record<string, Article> {
        if (typeof window === "undefined") return {};
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    }

    isArticleSaved(articleId: string): boolean {
        const savedArticles = this.getSavedArticles();
        return !!savedArticles[articleId];
    }

    saveArticle(article: Article): void {
        const savedArticles = this.getSavedArticles();
        savedArticles[article.id] = article;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticles));
    }

    removeArticle(articleId: string): void {
        const savedArticles = this.getSavedArticles();
        delete savedArticles[articleId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticles));
    }
}
