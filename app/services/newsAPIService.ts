import { INewsAPIService, Article } from "./newsService";
import * as zlib from "zlib";

export class NewsAPIService implements INewsAPIService {
    private apiKey: string;
    private baseUrl = "https://newsapi.org/v2";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async searchNews(query: string): Promise<Article[]> {
        try {
            const res = await fetch(`${this.baseUrl}/everything?q=${query}&apiKey=${this.apiKey}`);
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

    async getArticleById(contentBase64Encoded: string): Promise<Article | null> {
        // The News API doesn't provide an ID for articles, so we need to generate one
        contentBase64Encoded = decodeURIComponent(contentBase64Encoded);
        const compressedBuffer = Buffer.from(contentBase64Encoded, "base64");
        const decompressedBuffer = zlib.gunzipSync(compressedBuffer);
        const content = decompressedBuffer.toString("utf-8");
        return JSON.parse(content);
    }

    async listNews(limit: number): Promise<Article[]> {
        try {
            const res = await fetch(`${this.baseUrl}/top-headlines?country=us&apiKey=${this.apiKey}`);
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
                preview: article.content,
                url: article.url,
                imageUrl: article.urlToImage,
                publishedAt: new Date(article.publishedAt),
                title: article.title,
                author: article.author,
                sourceName: article.source?.name,
                size,
            } as Article
        });
    }

    private articleToBase64(article: Article): string {
        // Define o id como vazio para evitar circularidade
        article.id = '';
        const jsonStr = JSON.stringify(article);
        // Comprime a string JSON utilizando gzip
        const compressedBuffer = zlib.gzipSync(jsonStr);
        // Retorna o resultado comprimido codificado em base64
        return compressedBuffer.toString("base64");
    }
}
