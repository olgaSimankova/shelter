// export interface AppTypes {
//   urlToImage: string;
//   author: string;
//   source: { name: string };
//   url: string;
//   title: string;
//   publishedAt: string;
//   description: string;
//   id: string;
//   name: string;
// }

export interface Sources {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
