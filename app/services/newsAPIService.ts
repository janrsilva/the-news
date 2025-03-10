import UnauthorizedException from "@/exceptions/UnauthorizedException";
import { IArticleProvider, Article, HttpClient } from "./articleServiceFactory";
import * as zlib from "zlib";

export class NewsAPIService implements IArticleProvider {
    private apiKey: string;
    private baseUrl = "https://newsapi.org/v2";
    public http: HttpClient;

    constructor(apiKey: string, http: HttpClient) {
        this.apiKey = apiKey;
        this.http = http;
    }

    async searchArticles(query: string, page: number, limit: number): Promise<Article[]> {
        try {
            const res = await this.http(`${this.baseUrl}/everything?q=${query}&apiKey=${this.apiKey}&page=${page}&pageSize=${limit}`);
            if (!res.ok) {
                throw new Error(`News API Error: ${res.statusText}`);
            }

            const data = await res.json();
            const articles = this.rawToArticles(data.articles);
            return this.putIdToRawArticles(articles);
        } catch (error) {
            if (error.toString().indexOf("Unauthorized") !== -1) {
                throw new UnauthorizedException();
            }
            console.error("Error fetching news:", error);
            return [];
        }
    }

    async getArticleById(contentBase64Encoded: string): Promise<Article | null> {
        // The News API doesn't provide an ID for articles, so we need to generate one
        contentBase64Encoded = decodeURIComponent(contentBase64Encoded);
        const compressedBuffer = Buffer.from(contentBase64Encoded, "base64");
        const decompressedBuffer = zlib.gunzipSync(compressedBuffer);
        const content = decompressedBuffer.toString("utf-8");
        const article = JSON.parse(content);
        article.id = contentBase64Encoded;
        return article;
    }

    async listArticles(page: number, limit: number): Promise<Article[]> {
        try {
            const res = await this.http(`${this.baseUrl}/top-headlines?country=us&apiKey=${this.apiKey}&pageSize=${limit}&page=${page}`);
            if (!res.ok) {
                throw new Error(`News API Error: ${res.statusText}`);
            }

            const data = await res.json();
            const articles = this.rawToArticles(data.articles);
            return this.putIdToRawArticles(articles);
        } catch (error) {
            console.error("Error fetching news:", error);
            return [];
        }
    }

    private putIdToRawArticles(articles: Article[]): Article[] {
        return articles.map((article) => {
            article.id = this.articleToBase64(article);
            return article;
        });
    }

    private rawToArticles(rawArticles: any): Article[] {
        return rawArticles.map((article: any) => {
            const match = article.content?.match(/( \[\+([0-9]+) chars\])$/);
            let size = 0;
            if (match) {
                size = parseInt(match[2]);
                article.content = article.content.replace(match[1], "");
            }

            return {
                id: '',
                description: article.description,
                url: article.url,
                imageUrl: article.urlToImage,
                publishedAt: new Date(article.publishedAt),
                size,
                preview: article.content || "",
                title: article.title || "",
                author: article.author || "",
                sourceName: article.source?.name || "",
            } as Article
        });
    }

    private articleToBase64(article: Article): string {
        article.id = '';
        const jsonStr = JSON.stringify(article);
        const compressedBuffer = zlib.gzipSync(jsonStr);
        return compressedBuffer.toString("base64");
    }
}
