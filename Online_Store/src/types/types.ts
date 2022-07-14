export interface BookData {
    id: string;
    name: string;
    cover: string;
    author: string;
    description: string;
    price: number;
    language: string;
    publisher: string;
    publication_year: string;
    pages: number;
    category: string[];
    inChart: boolean;
    qtyInChart: number;
}
