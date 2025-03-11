
import { ArticleServiceFactory, HttpClient } from "@/services/articleServiceFactory";
import { Response } from "node-fetch"; // Importing Response from node-fetch

const fakeFetch: HttpClient = async (input: string, init?: RequestInit): Promise<Response> => {
    return {
        ok: true,
        json: async () => {
            return { articles: [] };
        }
    } as Response;
};

beforeAll(() => {
    process.env.USE_FAKE_API = "false";
    process.env.NEWS_API_KEY = "abc123";
});

describe("ArticleServiceFactory", () => {
    it("should use the provided user token when creating the service", async () => {
        const fetch: HttpClient = jest.fn(fakeFetch);

        const userToken = "user-token-abc";
        const service = ArticleServiceFactory.createService(
            userToken,
            fetch
        );

        await service.searchArticles("test", 1, 10);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining(`apiKey=${userToken}`)
        );

        fetch.mockRestore();
    });

    it("should use the environment token when no user token is provided", async () => {
        const fetch: HttpClient = jest.fn(fakeFetch);

        const service = ArticleServiceFactory.createService(
            "",
            fetch
        );

        await service.searchArticles("test", 1, 10);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining(`apiKey=${process.env.NEWS_API_KEY}`)
        );

        fetch.mockRestore();
    });
});
