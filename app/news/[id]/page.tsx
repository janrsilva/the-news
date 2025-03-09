import { Article } from "@/services/newsService";
import { NewsServiceFactory } from "@/services/newsService";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60;

export async function generateStaticParams() {
  const newsService = NewsServiceFactory.createService();
  const articles: Article[] = await newsService.searchNews("latest");

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

  function estimatedReadingTime(size: number) {
    const readingSpeedAvg = 200;

    const minutes = Math.ceil(size / readingSpeedAvg);

    return `${minutes}min`;
  }

  console.log(article);

  return (
    <main className="p-4 flex flex-col gap-2">
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
      <p>{estimatedReadingTime(article.size)} de leitura</p>
      <small>
        Publicado em {article.publishedAt?.toString()}
        {article.author && " por " + article.author}
        {article.sourceName && " em " + article.sourceName}
      </small>
      <a href={article.url} className="text-blue-500" target="_blank">
        Read full article
      </a>
    </main>
  );
}
