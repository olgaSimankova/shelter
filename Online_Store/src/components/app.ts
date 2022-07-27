import { footerRender, headerRender } from './appView/AppView';
import { BookData } from '../types/types';
import { productsListRender } from './products/products';

import productsData from '../assets/scripts/products_data.json';
import { resetSearch, search } from './search/search';
import { showChart, hideChart, chartRender, chart, addToChart, removeFromChart } from './chart/chart';
import { applyAllFilters, resetAllFilters } from './filters/filters';
import { sortBy } from './sorting/sorting';
import * as noUiSlider from 'nouislider';
import { getLocalStorage, setLocalStorage } from './localStorage/localStorage';

function appStart() {
    const header = document.querySelector('.header') as HTMLElement;
    const main = document.querySelector('.books__container') as HTMLElement;
    const footer = document.querySelector('.footer') as HTMLElement;

    header.innerHTML = headerRender();
    main.appendChild(productsListRender(productsData as BookData[]));
    footer.innerHTML = footerRender();

    const searchField = document.getElementById('searchInput') as HTMLInputElement;
    const searchIcon = document.querySelector('.searchIcon') as HTMLElement;
    const searchReset = document.querySelector('.clear') as HTMLElement;

    searchIcon.onclick = () => {
        const searchResults = search(searchField.value, productsData);
        main.innerHTML = '';
        main.appendChild(productsListRender(searchResults));
    };

    searchField.addEventListener('keyup', function (KeyboardEvent) {
        KeyboardEvent.preventDefault();

        if (KeyboardEvent.key === 'Enter') {
            const searchResults = applyAllFilters(searchField.value, productsData);
            main.innerHTML = '';
            main.appendChild(productsListRender(searchResults));
        }
    });

    searchReset.onclick = () => {
        resetSearch(productsData);
    };

    const chartIcon = document.querySelector('.chart') as HTMLElement;
    chartIcon.onclick = () => showChart();

    const chartContainer = document.querySelector('.chart__container') as HTMLElement;
    chartContainer.append(chartRender(chart));

    const closeChart = document.querySelector('.close') as HTMLElement;
    closeChart.onclick = () => hideChart();

    window.addEventListener('click', (event: MouseEvent) => addToChart(event));

    window.addEventListener('click', (event: MouseEvent) => removeFromChart(event));

    (document.querySelectorAll('.checkbox__filter') as NodeListOf<HTMLInputElement>).forEach((item) => {
        item.addEventListener('change', function () {
            const productsOnPage: BookData[] = [...productsData];
            const filteredProducts = applyAllFilters(searchField.value || '', productsOnPage);
            main.innerHTML = '';
            if (!filteredProducts.length) {
                const noMatches = document.createElement('div');
                noMatches.className = 'no_matches';
                noMatches.innerText = 'Sorry, no matches found';
                main.appendChild(noMatches);
            } else {
                main.appendChild(productsListRender(filteredProducts));
            }
        });
    });

    window.addEventListener('click', function (event: MouseEvent) {
        const productsOnPage: BookData[] = [...productsData];
        if ((event.target as Element).classList.contains('reset_filters')) {
            resetAllFilters();
            const filteredProducts = applyAllFilters(searchField.value || '', productsOnPage);
            main.innerHTML = '';
            main.appendChild(productsListRender(filteredProducts));
        }
    });

    (document.getElementById('sorting__select') as HTMLSelectElement).addEventListener('change', function () {
        const option = this.value;
        const filteredProducts = applyAllFilters(searchField.value || '', productsData);
        sortBy(filteredProducts, option);
        main.innerHTML = '';
        main.appendChild(productsListRender(filteredProducts));
    });

    (document.getElementById('slider__price') as noUiSlider.target).noUiSlider?.on('change', function () {
        const filteredProducts = applyAllFilters(searchField.value || '', productsData);
        main.innerHTML = '';
        main.appendChild(productsListRender(filteredProducts));
    });

    (document.getElementById('slider__pages') as noUiSlider.target).noUiSlider?.on('change', function () {
        const filteredProducts = applyAllFilters(searchField.value || '', productsData);
        main.innerHTML = '';
        main.appendChild(productsListRender(filteredProducts));
    });

    window.onbeforeunload = function () {
        setLocalStorage();
    };

    window.onload = function () {
        getLocalStorage();
        const filteredProducts = applyAllFilters(searchField.value || '', productsData);
        main.innerHTML = '';
        main.appendChild(productsListRender(filteredProducts));
    };

    // reset all settings (clear local storage)
    // window.addEventListener('click', function (event: MouseEvent) {
    //     const productsOnPage: BookData[] = [...productsData];
    //     if ((event.target as Element).classList.contains('reset_storage')) {
    //         if (this.localStorage.getItem('chart')) {
    //             (JSON.parse(this.localStorage.getItem('chart') as string) as BookData[]).forEach((item) => {
    //                 removeFromChart(item.id);
    //             });
    //         }
    //         chart.splice(0, chart.length);
    //         resetAllFilters();
    //         (document.getElementById('sorting__select') as HTMLSelectElement).value = '';
    //         const filteredProducts = applyAllFilters(searchField.value || '', productsOnPage);
    //         main.innerHTML = '';
    //         main.appendChild(productsListRender(filteredProducts));
    //     }
    // });
}

export { appStart };
