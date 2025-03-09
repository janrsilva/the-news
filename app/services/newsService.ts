export interface INewsAPIService {
    searchNews: (query: string) => Promise<Article[]>;
    getArticleById: (id: string) => Promise<Article | null>;
    listNews: (limit: number) => Promise<Article[]>;
}

export interface Article {
    id: string; // The News API doesn't provide an ID for articles, so we need to generate one
    title: string;
    description: string;
    preview?: string;
    url: string;
    imageUrl: string;
    publishedAt?: Date;
    author?: string;
    sourceName?: string;
    size?: number;
}

import { NewsAPIService } from "./newsAPIService";
import { FakeNewsService } from "./fake-news/fakeNewsService";

export class NewsServiceFactory {
    static createService(): INewsAPIService {
        if (process.env.USE_FAKE_API === "true") {
            return new FakeNewsService();
        }
        return new NewsAPIService(process.env.NEWS_API_KEY || "");
    }
}
