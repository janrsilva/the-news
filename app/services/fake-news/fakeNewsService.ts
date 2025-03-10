
import { Article, IArticleProvider } from "@/services/articleServiceFactory";
import { fakeNewsData } from "./fakeNews";

export class FakeNewsService implements IArticleProvider {
    async searchArticles(query: string): Promise<Article[]> {
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

    async listArticles(page: number, limit: number): Promise<Article[]> {
        return fakeNewsData.slice(0, limit);
    }
}
