import { NewsAPIService } from "./newsAPIService";
import { FakeNewsService } from "./fake-news/fakeNewsService";

export interface IArticleProvider {
    searchArticles: (query: string, page: number, limit: number) => Promise<Article[]>;
    getArticleById: (id: string) => Promise<Article | null>;
    listArticles: (page: number, limit: number) => Promise<Article[]>;
}

export interface Article {
    id: string; // The News API doesn't provide an ID for articles, so we need to generate one
    title: string;
    description: string;
    preview: string;
    url: string;
    imageUrl: string;
    publishedAt: Date;
    author: string;
    sourceName: string;
    size: number;
}

export type HttpClient = typeof fetch;

export class ArticleServiceFactory {
    static createService(config: unknown, http: HttpClient): IArticleProvider {
        if (process.env.USE_FAKE_API === "true") {
            return new FakeNewsService();
        }
        return new NewsAPIService(config as string || process.env.NEWS_API_KEY || "", http);
    }
}
