
import { Article, INewsAPIService } from "@/services/newsService";
import { fakeNewsData } from "./news";

export class FakeNewsService implements INewsAPIService {
    async searchNews(query: string): Promise<Article[]> {
        if (!query) return fakeNewsData;

        const lowerQuery = query.toLowerCase();

        return fakeNewsData.filter(
            (article) =>
                article.title.toLowerCase().indexOf(lowerQuery) !== -1 ||
                article.description.toLowerCase().indexOf(lowerQuery) !== -1
        );
    }

    async getArticleById(id: string): Promise<Article | null> {
        return fakeNewsData.find(article => article.id === id) || null;
    }

    async listNews(limit: number): Promise<Article[]> {
        return fakeNewsData.slice(0, limit);
    }
}
