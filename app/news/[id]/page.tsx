import { Article } from "@/services/newsService";
import { NewsServiceFactory } from "@/services/newsService";
import { notFound } from "next/navigation";
import Image from "next/image";
import PublishedAt from "@/components/PublishedAt";
import ReadingTime from "@/components/ReadingTime";
import Author from "@/components/Author";
import SaveButton from "@/components/SaveButton";
import Header from "@/components/Header";

export const revalidate = 60;

export async function generateStaticParams() {
  const newsService = NewsServiceFactory.createService();
  const articles: Article[] = await newsService.searchArticles("latest", 1, 10);

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

  const newsService = NewsServiceFactory.createService();
  const article: Article | null = await newsService.getArticleById(id);

  if (!article) {
    return notFound();
  }

  return (
    <main className="p-4 flex flex-col gap-2 lg:w-2xl mx-auto">
      <Header />
      <Image
        src={article.imageUrl}
        alt={article.title}
        width={800}
        height={600}
        className="w-full max-h-96 object-cover mt-4"
      />
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p>{article.description}</p>
      <p>{article.preview}</p>
      <ReadingTime size={article.size} />
      <div>
        <PublishedAt date={article.publishedAt} />
        <Author author={article.author} sourceName={article.sourceName} />
      </div>
      <div className="flex justify-between">
        <a href={article.url} className="text-blue-500" target="_blank">
          Read full article
        </a>
        <SaveButton withLabel article={article} />
      </div>
    </main>
  );
}
