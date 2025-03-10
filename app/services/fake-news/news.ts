import { Article } from "@/services/newsService";

export const fakeNewsData: Article[] = [
    {
        id: "1",
        title: "Fake News: Tecnologia Revolucionária",
        description: "Uma tecnologia falsa que mudará o mundo.",
        url: "https://fake-news.com/article/1",
        imageUrl: "https://fake-news.com/images/1.jpg",
        preview: "Uma breve descrição da tecnologia falsa.",
        publishedAt: new Date("2023-01-01"),
        author: "Autor Desconhecido",
        sourceName: "Fake News Source",
        size: 1234
    },
    {
        id: "2",
        title: "Fake News: IA dominará o planeta",
        imageUrl: "https://fake-news.com/images/2.jpg",
        description: "A inteligência artificial pode tomar o controle de tudo!",
        url: "https://fake-news.com/article/2",
        preview: "Uma breve descrição sobre IA.",
        publishedAt: new Date("2023-02-01"),
        author: "Autor Desconhecido",
        sourceName: "Fake News Source",
        size: 5678,
    }
];
