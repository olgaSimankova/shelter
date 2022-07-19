export interface Article {
    source: Pick <Source, 'id' | 'name'>;
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

interface LoaderResponceBody {
    locked: boolean;
}


export interface LoaderResponce {
    body: LoaderResponceBody;
    bodyUsed: boolean;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
}

export interface options {
    apiKey?: string;
    sources?: string;
}

export interface urlOptions {
    [index: string]: string;
}
