import { BookData } from '../../types/types';
import { sortBy } from '../sorting/sorting';
// import productsData from '../../assets/scripts/products_data.json';
import './filters.css';

// Собираем все выбранные чекбоксы в массив
function getChecked(querySelector: string) {
    const checkedItems = <HTMLInputElement[]>(
        Array.from(document.querySelectorAll(`${querySelector}`)).filter((item) => (item as HTMLInputElement).checked)
    );
    return <string[]>checkedItems.map((item) => (item as HTMLInputElement).value);
}

function categoryFilter(products: BookData[]) {
    const categoriesChecked: string[] = getChecked('.categ_checkbox__filter');
    if (categoriesChecked.length === 0) {
        return products;
    }
    const filteredData: BookData[] = [];
    products.forEach((elem) => {
        if (contains(categoriesChecked, elem.category)) {
            filteredData.push(elem);
        }
    });

    return filteredData;
}

// Это нужно для того, чтобы сравнить, содержится ли хоть одна из категорий данного продукта в массиве выбранных чекбоксов
function contains(where: string[], what: string[]): boolean {
    for (let i = 0; i < what.length; i++) {
        if (where.indexOf(what[i]) !== -1) return true;
    }
    return false;
}

function filterPublisher(products: BookData[]) {
    const publishersChecked: string[] = getChecked('.publish_checkbox__filter');
    if (publishersChecked.length === 0) {
        return products;
    }
    const filteredData: BookData[] = [];
    products.forEach((elem) => {
        if (publishersChecked.includes(elem.publisher)) {
            filteredData.push(elem);
        }
    });
    return filteredData;
}

function filterType(products: BookData[]) {
    const typesChecked: string[] = getChecked('.type_checkbox__filter');
    if (typesChecked.length === 0) {
        return products;
    }
    const filteredData: BookData[] = [];
    products.forEach((elem) => {
        if (typesChecked.includes(elem.type)) {
            filteredData.push(elem);
        }
    });
    return filteredData;
}

// Кнопка Reset filters (show all)

function resetAllFilters(): void {
    const uncheck: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');
    for (let i = 0; i < uncheck.length; i++) {
        if (uncheck[i].type === 'checkbox') {
            uncheck[i].checked = false;
        }
    }
}

function applyAllFilters(products: BookData[]) {
    let dataFiltered: BookData[] = filterType(products);
    dataFiltered = categoryFilter(dataFiltered);
    dataFiltered = filterPublisher(dataFiltered);
    const sortingOption = (document.getElementById('sorting__select') as HTMLSelectElement).value;
    sortBy(dataFiltered, sortingOption);
    return dataFiltered;
}

export { applyAllFilters, resetAllFilters };
