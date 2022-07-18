import { BookData } from '../../types/types';
import './sorting.css';

export function sortBy(products: BookData[], option = '') {
    // const productsCopy = [...products];
    switch (option) {
        case 'name_a':
            products.sort((a: BookData, b: BookData) => a.name.localeCompare(b.name));
            break;
        case 'name_z':
            products.sort((a: BookData, b: BookData) => b.name.localeCompare(a.name));
            break;
        case 'price_min':
            products.sort((a: BookData, b: BookData) => a.price - b.price);
            break;
        case 'price_max':
            products.sort((a: BookData, b: BookData) => b.price - a.price);
            break;
    }
}
