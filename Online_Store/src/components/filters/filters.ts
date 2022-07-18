import { BookData } from '../../types/types';
import { sortBy } from '../sorting/sorting';
// import productsData from '../../assets/scripts/products_data.json';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './filters.css';

// Собираем все выбранные чекбоксы в массив
function getChecked(querySelector: string) {
    const checkedItems = <HTMLInputElement[]>(
        Array.from(document.querySelectorAll(`${querySelector}`)).filter((item) => (item as HTMLInputElement).checked)
    );
    return <string[]>checkedItems.map((item) => (item as HTMLInputElement).value);
}

function setChecked(querySelector: string, filtersChecked: string[]) {
    (document.querySelectorAll(`${querySelector}`) as NodeListOf<HTMLInputElement>).forEach((item) => {
        if (filtersChecked.includes(item.value)) {
            item.checked = true;
        }
    });
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

// noUiSlider

const sliderPrice = document.getElementById('slider__price') as HTMLElement;

noUiSlider.create(sliderPrice, {
    start: [1, 39],
    connect: true,
    tooltips: true,
    range: {
        min: 1,
        max: 39,
    },
});

function sliderPriceFilter(data: BookData[]) {
    const values = (sliderPrice as noUiSlider.target).noUiSlider?.get() as string[];
    const filteredData: BookData[] = [];
    data.forEach((elem: BookData) => {
        if (elem.price >= parseInt(values[0]) && elem.price <= parseInt(values[1])) {
            filteredData.push(elem);
        }
    });
    return filteredData;
}

const sliderPage = document.getElementById('slider__pages') as HTMLElement;

noUiSlider.create(sliderPage, {
    start: [160, 1395],
    connect: true,
    tooltips: true,
    step: 1,
    range: {
        min: 160,
        max: 1395,
    },
    format: {
        from: function (value) {
            return parseInt(value);
        },
        to: function (value: number) {
            return value.toFixed(0);
        },
    },
});

function sliderPageFilter(data: BookData[]) {
    const values = (sliderPage as noUiSlider.target).noUiSlider?.get() as string[];
    const filteredData: BookData[] = [];
    data.forEach((elem: BookData) => {
        if (elem.pages >= parseInt(values[0]) && elem.pages <= parseInt(values[1])) {
            filteredData.push(elem);
        }
    });
    return filteredData;
}

// Кнопка Reset filters (show all)

function resetAllFilters(): void {
    localStorage.clear();
    const uncheck: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input');
    for (let i = 0; i < uncheck.length; i++) {
        if (uncheck[i].type === 'checkbox') {
            uncheck[i].checked = false;
        }
    }
    const sliderPrice = document.querySelector('#slider__price') as noUiSlider.target;
    sliderPrice.noUiSlider?.set([1, 39]);

    const sliderPage = document.querySelector('#slider__pages') as noUiSlider.target;
    sliderPage.noUiSlider?.set([160, 1395]);
}

function applyAllFilters(products: BookData[]) {
    let dataFiltered: BookData[] = filterType(products);
    dataFiltered = categoryFilter(dataFiltered);
    dataFiltered = filterPublisher(dataFiltered);
    dataFiltered = sliderPriceFilter(dataFiltered);
    dataFiltered = sliderPageFilter(dataFiltered);
    const sortingOption = (document.getElementById('sorting__select') as HTMLSelectElement).value;
    sortBy(dataFiltered, sortingOption);
    return dataFiltered;
}

export { applyAllFilters, resetAllFilters, getChecked, setChecked };
