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
    type: string;
    category: string[];
    favorite: boolean;
    inChart: boolean;
    qtyInChart: number;
}
