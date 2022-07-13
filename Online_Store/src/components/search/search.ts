import { BookData } from '../../types/types';
import { productsListRender } from '../products/products';
import './search.css';

// const searchField = document.querySelector('#input') as HTMLInputElement;

function searchAndRerender(keyword: string, data: BookData[], container: HTMLElement) {
    if (keyword.trim().length === 0) return;
    const relevantProducts: BookData[] = getRelevant(keyword, data);

    container.innerHTML = '';
    container.appendChild(productsListRender(relevantProducts));
}

function getRelevant(keyword: string, data: BookData[]): BookData[] {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        if (
            data[i].name.toLowerCase().includes(keyword.toLowerCase()) ||
            data[i].author.toLowerCase().includes(keyword.toLowerCase())
        ) {
            results.push(data[i]);
        }
    }
    if (results.length === 0) {
        alert('No search results');
    }
    return results;
}

export { searchAndRerender };
