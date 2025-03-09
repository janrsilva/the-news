import { NextResponse } from "next/server";
import { NewsServiceFactory } from "@/services/newsService";

const newsService = NewsServiceFactory.createService();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "latest";

    const articles = await newsService.searchNews(query);
    return NextResponse.json(articles);
}
