import { BookData } from '../../types/types';
import { applyAllFilters } from '../filters/filters';
import { productsListRender } from '../products/products';
import productsData from '../../assets/scripts/products_data.json';
import './search.css';

const main = document.querySelector('.books__container') as HTMLElement;

function searchResultsRender(mouseEvent?: MouseEvent, KeyboardEvent?: KeyboardEvent) {
    const searchField = document.getElementById('searchInput') as HTMLInputElement;
    if (KeyboardEvent) KeyboardEvent.preventDefault();
    if (mouseEvent || KeyboardEvent?.key === 'Enter') {
        const searchResults = search(searchField.value, productsData);
        main.innerHTML = '';
        main.appendChild(productsListRender(searchResults));
    }
}

function search(keyword: string, data: BookData[]): BookData[] {
    const results = [];
    if (!keyword.trim().length) {
        return data;
    } else {
        for (let i = 0; i < data.length; i++) {
            if (
                data[i].name.toLowerCase().includes(keyword.toLowerCase()) ||
                data[i].author.toLowerCase().includes(keyword.toLowerCase())
            ) {
                results.push(data[i]);
            }
        }
        if (!results.length) {
            alert('No search results');
        }
        return results;
    }
}

function resetSearch(data: BookData[]): void {
    const searchField = document.getElementById('searchInput') as HTMLInputElement;

    main.innerHTML = '';
    main.appendChild(productsListRender(applyAllFilters('', data)));
    searchField.value = '';
}

export { search, resetSearch, searchResultsRender };
