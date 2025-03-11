// app/news/[id]/page.tsx
import { Article } from "@/services/articleServiceFactory";
import { ArticleServiceFactory } from "@/services/articleServiceFactory";
import { notFound } from "next/navigation";
import Image from "next/image";
import PublishedAt from "@/components/PublishedAt";
import ReadingTime from "@/components/ReadingTime";
import Author from "@/components/Author";
import SaveButton from "@/components/SaveButton";
import Main from "@/components/Main";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const userToken = (await searchParams)["user-token"] as string;

  // Create the article service using the token from the URL query.
  const articleService = ArticleServiceFactory.createService(userToken, fetch);
  if (!id) {
    return notFound();
  }
  const article: Article | null = await articleService.getArticleById(id);

  if (!article) {
    return notFound();
  }

  return (
    <Main>
      <div className="flex flex-col gap-2">
        {article.imageUrl && (
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={800}
            height={600}
            className="w-full max-h-80 object-contain mt-4"
          />
        )}
        <h1 className="text-2xl font-bold">{article.title}</h1>
        <hr className="my-2 bg-gray-200 opacity-65" />
        <p className="text-justify">
          <small>Description</small> {article.description}
        </p>
        <p className="text-justify">
          <small>Preview</small> {article.preview}
        </p>
        <div className="flex justify-between items-center my-2">
          <ReadingTime size={article.size} />
          <div className="flex flex-col items-end md:flex-row md:items-center gap-2">
            <PublishedAt date={article.publishedAt} />
            <Author author={article.author} sourceName={article.sourceName} />
          </div>
        </div>
        <div className="flex justify-between">
          <a href={article.url} className="text-blue-500" target="_blank">
            Read full article
          </a>
          <SaveButton withLabel article={article} />
        </div>
      </div>
    </Main>
  );
}
