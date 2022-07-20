import { footerRender, headerRender } from './appView/AppView';
import { BookData } from '../types/types';
import { productsListRender } from './products/products';

import productsData from '../assets/scripts/products_data.json';
import { search } from './search/search';
import { showChart, hideChart, chartRender, chart, addToChart, updateCardBtn, removeFromChart } from './chart/chart';
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

    //Implement search
    const searchField = document.getElementById('searchInput') as HTMLInputElement;
    const searchIcon = document.querySelector('.searchIcon') as HTMLElement;
    const searchReset = document.querySelector('.clear') as HTMLElement;

    searchIcon.onclick = () => {
        const searchResults = search(searchField.value, productsData);
        main.innerHTML = '';
        main.appendChild(productsListRender(searchResults));
        console.log(searchField.value);
    };

    //This is needed to make the search field work with 'enter' click
    searchField.addEventListener('keyup', function (event: KeyboardEvent) {
        event.preventDefault();

        if (event.keyCode === 13) {
            const searchResults = applyAllFilters(searchField.value, productsData);
            main.innerHTML = '';
            main.appendChild(productsListRender(searchResults));
            // console.log(searchField.value);
        }
    });

    searchReset.onclick = () => {
        main.innerHTML = '';
        main.appendChild(productsListRender(applyAllFilters('', productsData)));
        searchField.value = '';
    };

    // Implement Chart
    const chartIcon = document.querySelector('.chart') as HTMLElement;
    chartIcon.onclick = () => showChart();

    const chartContainer = document.querySelector('.chart__container') as HTMLElement;
    chartContainer.append(chartRender(chart));

    const closeChart = document.querySelector('.close') as HTMLElement;
    closeChart.onclick = () => hideChart();

    // Adding to chart

    window.addEventListener('click', function (event: MouseEvent) {
        if ((event.target as Element).classList.contains('add-to-chart')) {
            const card = (event.target as HTMLElement).closest('.book__item') as HTMLElement;
            const btn = (event.target as HTMLElement).closest('.btn') as HTMLElement;
            const cardInfo = productsData.find((object: BookData) => object.id === card.dataset.id) as BookData;

            addToChart(cardInfo);
            updateCardBtn(btn);
        }
    });

    // Removing from chart
    window.addEventListener('click', function (event: MouseEvent) {
        if ((event.target as Element).classList.contains('fa-trash')) {
            const cardToRemoveId = ((event.target as HTMLElement).closest('.product_in_chart') as HTMLElement).dataset
                .id as string;
            removeFromChart(cardToRemoveId);

            document.querySelectorAll<HTMLButtonElement>('.add-to-chart').forEach((btn: HTMLButtonElement) => {
                if ((btn.parentNode as HTMLDivElement).dataset.id === cardToRemoveId) {
                    btn.classList.remove('btn__in_chart');
                    btn.innerText = 'add to chart';
                }
            });
        }
    });

    // implement category checkbox filter (OMG, it wasn't easy)
    (document.querySelectorAll('.checkbox__filter') as NodeListOf<HTMLInputElement>).forEach((item) => {
        item.addEventListener('change', function () {
            const productsOnPage: BookData[] = [...productsData];
            const filteredProducts = applyAllFilters(searchField.value || '', productsOnPage);
            main.innerHTML = '';
            if (filteredProducts.length === 0) {
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
    window.addEventListener('click', function (event: MouseEvent) {
        const productsOnPage: BookData[] = [...productsData];
        if ((event.target as Element).classList.contains('reset_storage')) {
            if (this.localStorage.getItem('chart')) {
                (JSON.parse(this.localStorage.getItem('chart') as string) as BookData[]).forEach((item) => {
                    removeFromChart(item.id);
                });
            }
            chart as BookData[];
            resetAllFilters();
            (document.getElementById('sorting__select') as HTMLSelectElement).value = '';
            const filteredProducts = applyAllFilters(searchField.value || '', productsOnPage);
            main.innerHTML = '';
            main.appendChild(productsListRender(filteredProducts));
        }
    });
}

export { appStart };
