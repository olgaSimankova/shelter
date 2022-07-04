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

export interface SourcesData {
    status: string;
    totalResults?: number;
    sources?: Source[];
    articles?: Article[];
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface LoaderResponce {
    body: {
        locked: boolean;
    };
    bodyUsed: boolean;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
}
