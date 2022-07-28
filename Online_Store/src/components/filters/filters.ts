import { BookData } from '../../types/types';
import { sortBy } from '../sorting/sorting';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './filters.css';
import { search } from '../search/search';
import productsData from '../../assets/scripts/products_data.json';
import {
    CHECKBOXCATEGORY,
    CHECKBOXCONTAINERSELECTORS,
    CHECKBOXPUBLISHER,
    CHECKBOXTYPE,
    MAINPRODUCTSCONTAINER,
    SLIDERPAGEMAX,
    SLIDERPAGEMIN,
    SLIDERPRICEMAX,
    SLIDERPRICEMIN,
} from '../constants/constants';
import { productsListRender } from '../products/products';

function getCheckedByContainer(selector: string): string[] {
    const checkboxContainer = document.querySelector(`${selector}`) as HTMLElement;
    let checkedItems = <HTMLInputElement[]>(
        Array.from(checkboxContainer.querySelectorAll('input[type=checkbox]:checked'))
    );
    if (!checkedItems.length)
        checkedItems = <HTMLInputElement[]>Array.from(checkboxContainer.querySelectorAll('input[type=checkbox]'));
    return checkedItems.map((item) => (item as HTMLInputElement).value) as string[];
}

function getAllChecked(): string[] {
    const checkedItems = <HTMLInputElement[]>Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    return checkedItems.map((item) => (item as HTMLInputElement).value) as string[];
}

function setChecked(filtersChecked: string[]): void {
    console.log('setChecked');
    (document.querySelectorAll('input[type=checkbox]') as NodeListOf<HTMLInputElement>).forEach((item) => {
        item.checked = filtersChecked?.includes(item.value);
    });
}

function filterByCheckbox(products: BookData[]) {
    const checkboxes: string[][] = [];
    CHECKBOXCONTAINERSELECTORS.forEach((cur) => checkboxes.push(getCheckedByContainer(cur as string)));

    return products
        .filter((elem) => contains(checkboxes[CHECKBOXCATEGORY], elem.category))
        .filter((elem) => checkboxes[CHECKBOXPUBLISHER].includes(elem.publisher))
        .filter((elem) => checkboxes[CHECKBOXTYPE].includes(elem.type));
}

function contains(where: string[], what: string[]): boolean {
    for (let i = 0; i < what.length; i++) {
        if (where.indexOf(what[i]) !== -1) return true;
    }
    return false;
}

const sliderPrice = document.getElementById('slider__price') as HTMLElement;
if (sliderPrice && noUiSlider) {
    noUiSlider.create(sliderPrice, {
        start: [1, 39],
        connect: true,
        tooltips: true,
        range: {
            min: 1,
            max: 39,
        },
    });
}

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
if (sliderPage && noUiSlider) {
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
}

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

function resetAllFilters(e: MouseEvent): void {
    if ((e.target as Element).classList.contains('reset_filters')) {
        localStorage.clear();
        const uncheck: HTMLInputElement[] = Array.from(document.getElementsByTagName('input'));
        uncheck.forEach((element) => {
            if (element.type === 'checkbox') {
                element.checked = false;
            }
        });
    }
    const sliderPrice = document.querySelector('#slider__price') as noUiSlider.target;
    sliderPrice.noUiSlider?.set([SLIDERPRICEMIN, SLIDERPRICEMAX]);

    const sliderPage = document.querySelector('#slider__pages') as noUiSlider.target;
    sliderPage.noUiSlider?.set([SLIDERPAGEMIN, SLIDERPAGEMAX]);

    const filteredProducts = applyAllFilters(productsData);
    MAINPRODUCTSCONTAINER.innerHTML = '';
    MAINPRODUCTSCONTAINER.appendChild(productsListRender(filteredProducts));
}

function applyAllFilters(products: BookData[]) {
    let dataFiltered: BookData[] = filterByCheckbox(products);
    dataFiltered = sliderPriceFilter(dataFiltered);
    dataFiltered = sliderPageFilter(dataFiltered);
    dataFiltered = search(dataFiltered);
    const sortingOption = (document.getElementById('sorting__select') as HTMLSelectElement).value;
    sortBy(dataFiltered, sortingOption);
    return Array.from(new Set(dataFiltered));
}

function applyFilterOnChange() {
    const productsOnPage: BookData[] = [...productsData];
    const filteredProducts = applyAllFilters(productsOnPage);
    MAINPRODUCTSCONTAINER.innerHTML = '';
    if (!filteredProducts.length) {
        const noMatches = document.createElement('div');
        noMatches.className = 'no_matches';
        noMatches.innerText = 'Sorry, no matches found';
        MAINPRODUCTSCONTAINER.appendChild(noMatches);
    } else {
        MAINPRODUCTSCONTAINER.appendChild(productsListRender(filteredProducts));
    }
}

export {
    applyAllFilters,
    resetAllFilters,
    getCheckedByContainer,
    setChecked,
    contains,
    applyFilterOnChange,
    getAllChecked,
};
