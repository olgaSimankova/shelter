import { footerRender, headerRender } from './appView/AppView';
import { BookData } from '../types/types';
import { productsListRender } from './products/products';

import productsData from '../assets/scripts/products_data.json';
import { showChart, hideChart, chartRender, chart, addToChart, removeFromChart } from './chart/chart';
import { applyAllFilters, applyFilterOnChange, resetAllFilters } from './filters/filters';
import { sortBy } from './sorting/sorting';
import * as noUiSlider from 'nouislider';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from './localStorage/localStorage';
import { resetSearch, searchResultsRender } from './search/search';
import { MAINPRODUCTSCONTAINER } from './constants/constants';

function appStart() {
    (document.querySelector('.header') as HTMLElement).innerHTML = headerRender();
    (document.querySelector('.footer') as HTMLElement).innerHTML = footerRender();

    MAINPRODUCTSCONTAINER.appendChild(productsListRender(productsData as BookData[]));

    const searchReset = document.querySelector('.clear') as HTMLElement;
    const searchIcon = document.querySelector('.searchIcon') as HTMLElement;
    const searchField = document.getElementById('searchInput') as HTMLInputElement;

    searchField.addEventListener('keyup', (e: KeyboardEvent) => searchResultsRender(undefined, e));
    searchIcon.onclick = (e: MouseEvent) => searchResultsRender(e);
    searchReset.onclick = () => resetSearch(productsData);

    const chartIcon = document.querySelector('.chart') as HTMLElement;
    chartIcon.onclick = () => showChart();

    const chartContainer = document.querySelector('.chart__container') as HTMLElement;
    chartContainer.append(chartRender(chart));

    const closeChart = document.querySelector('.close') as HTMLElement;
    closeChart.onclick = () => hideChart();

    window.addEventListener('click', (event: MouseEvent) => addToChart(event));

    window.addEventListener('click', (event: MouseEvent) => removeFromChart(event));

    (document.querySelectorAll('.checkbox__filter') as NodeListOf<HTMLInputElement>).forEach((item) => {
        item.addEventListener('change', () => applyFilterOnChange());
    });

    window.addEventListener('click', (event: MouseEvent) => resetAllFilters(event));

    (document.getElementById('sorting__select') as HTMLSelectElement).addEventListener('change', function () {
        const option = this.value;
        const filteredProducts = applyAllFilters(productsData);
        sortBy(filteredProducts, option);
        MAINPRODUCTSCONTAINER.innerHTML = '';
        MAINPRODUCTSCONTAINER.appendChild(productsListRender(filteredProducts));
    });

    (document.getElementById('slider__price') as noUiSlider.target).noUiSlider?.on('change', function () {
        const filteredProducts = applyAllFilters(productsData);
        MAINPRODUCTSCONTAINER.innerHTML = '';
        MAINPRODUCTSCONTAINER.appendChild(productsListRender(filteredProducts));
    });

    (document.getElementById('slider__pages') as noUiSlider.target).noUiSlider?.on('change', function () {
        const filteredProducts = applyAllFilters(productsData);
        MAINPRODUCTSCONTAINER.innerHTML = '';
        MAINPRODUCTSCONTAINER.appendChild(productsListRender(filteredProducts));
    });

    window.onbeforeunload = () => setLocalStorage();

    window.onload = function () {
        getLocalStorage();
        applyFilterOnChange();
    };

    window.addEventListener('click', (event: MouseEvent) => clearLocalStorage(event));
}

export { appStart };
