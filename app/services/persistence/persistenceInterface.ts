import { Article } from "@/services/articleServiceFactory";

export interface IPersistence {
    getSavedArticles(): Record<string, Article>;
    isArticleSaved(articleId: string): boolean;
    saveArticle(article: Article): void;
    removeArticle(articleId: string): void;
}
