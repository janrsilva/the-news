import { NextResponse } from "next/server";
import { ArticleServiceFactory } from "@/services/articleServiceFactory";
import UnauthorizedException from "@/exceptions/UnauthorizedException";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("user-token") || "";
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page")) || 1;

    const articleService = ArticleServiceFactory.createService(token, fetch);

    try {
        const articles = await articleService.searchArticles(query, page, 10);
        return NextResponse.json(articles);
    } catch (err) {
        console.error(err);
        if (err instanceof UnauthorizedException) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
