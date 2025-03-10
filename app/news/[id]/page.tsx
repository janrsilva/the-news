import { Article } from "@/services/articleServiceFactory";
import { ArticleServiceFactory } from "@/services/articleServiceFactory";
import { notFound } from "next/navigation";
import Image from "next/image";
import PublishedAt from "@/components/PublishedAt";
import ReadingTime from "@/components/ReadingTime";
import Author from "@/components/Author";
import SaveButton from "@/components/SaveButton";
import Header from "@/components/Header";
import Main from "@/components/Main";

export const revalidate = 60;

export async function generateStaticParams() {
  const articleService = ArticleServiceFactory.createService();
  const articles: Article[] = await articleService.searchArticles(
    "latest",
    1,
    10
  );

  return articles.slice(0, 10).map((article) => ({
    id: encodeURIComponent(article.id),
  }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: { id?: string };
}) {
  const { id } = await params;

  const articleService = ArticleServiceFactory.createService();
  const article: Article | null = await articleService.getArticleById(id);

  if (!article) {
    return notFound();
  }

  return (
    <Main>
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={800}
        height={600}
        className="w-full max-h-80 object-contain mt-4"
      />
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <hr className="my-4 bg-gray-200 opacity-65" />
      <p className="text-justify">
        <small>Description</small> {article.description}
      </p>
      <p className="text-justify">
        <small>Preview</small> {article.preview}
      </p>
      <div className="flex justify-between items-center my-4">
        <div>
          <PublishedAt date={article.publishedAt} />
          <Author author={article.author} sourceName={article.sourceName} />
        </div>
        <ReadingTime size={article.size} />
      </div>
      <div className="flex justify-between">
        <a href={article.url} className="text-blue-500" target="_blank">
          Read full article
        </a>
        <SaveButton withLabel article={article} />
      </div>
    </Main>
  );
}
