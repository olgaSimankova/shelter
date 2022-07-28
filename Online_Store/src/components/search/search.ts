import { BookData } from '../../types/types';
import { applyAllFilters } from '../filters/filters';
import { productsListRender } from '../products/products';
import productsData from '../../assets/scripts/products_data.json';
import './search.css';
import { MAINPRODUCTSCONTAINER } from '../constants/constants';

function searchResultsRender(mouseEvent?: MouseEvent, KeyboardEvent?: KeyboardEvent) {
    if (KeyboardEvent) KeyboardEvent.preventDefault();
    if (mouseEvent || KeyboardEvent?.key === 'Enter') {
        const searchResults = applyAllFilters(productsData);
        MAINPRODUCTSCONTAINER.innerHTML = '';
        MAINPRODUCTSCONTAINER.appendChild(productsListRender(searchResults));
    }
}

function search(data: BookData[], keyword?: string): BookData[] {
    if (!keyword) keyword = (document.getElementById('searchInput') as HTMLInputElement).value;

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
        console.log(results);
        return results;
    }
}

function resetSearch(data: BookData[]): void {
    const searchField = document.getElementById('searchInput') as HTMLInputElement;
    searchField.value = '';
    MAINPRODUCTSCONTAINER.innerHTML = '';
    MAINPRODUCTSCONTAINER.appendChild(productsListRender(applyAllFilters(data)));
}

export { search, resetSearch, searchResultsRender };
